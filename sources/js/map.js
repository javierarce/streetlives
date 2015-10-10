'use strict';

var MapView = SL.View.extend({

  defaults: {
    viz: {
      templateURL: '//<%- username %>.cartodb.com/api/v2/viz/<%-id %>/viz.json'
    },
    mapOptions: {
      center: [40.74442, -73.970],
      zoom: 13,
      https: true,
      zoomControl: true,
      scrollwheel: true,
      loaderControl: true,
      search: false,
      shareable: false
    },
    style: {
      marker: {
        radius: 7,
        fillColor: '#F05658',
        color: '#FFFFFF',
        weight: 1.5,
        opacity: 0.9,
        fillOpacity: 1
      }
    },
  },

  events: {
    'click .js-add-location': '_onClickAddLocation',
    'keyup': '_onKeyUp'
  },

  initialize: function() {
    _.bindAll(this, '_onClickMap', '_onFeatureClick', '_onVisLoaded', '_onFetchOfferings');

    this.model = new Backbone.Model({
      marker: null
    });

    this.template = this._getTemplate('map');
    this.geocoder = new google.maps.Geocoder();

    this.offerings = new Offerings();
    this.offerings.fetch({ success: this._onFetchOfferings });

    this.search = new Search();
    this.search.bind('goto_place', this._gotoPlace, this);

    this.addLocation = new Button({ title: 'Add Location' });
    this.addLocation.bind('click', this._onClickAddLocation, this);

    this.locationInformation = new LocationInformation();
  },

  render: function() {
    var url = this._getVizJSONURL();
    var options = this.defaults.mapOptions;

    cartodb.createVis('map', url, options).done(this._onVisLoaded);
  },

  _onVisLoaded: function(vis, layers) {

    this.vis = vis;
    this.layers = layers;

    var layer = layers[1];
    layer.setInteraction(true);

    var sublayer = layer.getSubLayer(0);

    var query = "SELECT l.*, string_agg(o.name, ', ') as offerings, COALESCE(sum(CASE WHEN liked THEN 0 ELSE 1 END), 0) as x, COALESCE(sum(CASE WHEN liked THEN 1 ELSE 0 END),0) as p, COUNT(NULLIF(liked, false)) as likes, COUNT(NULLIF(liked, true)) as dislikes FROM locations AS l LEFT OUTER JOIN locations_offerings AS lo ON lo.location_id = l.cartodb_id ";
    query += "LEFT OUTER JOIN offerings as o ON o.cartodb_id = lo.offering_id LEFT OUTER JOIN comments as c ON c.location_id = l.cartodb_id GROUP BY l.cartodb_id ";

    layer.setQuery(query);
    sublayer.setInteraction(true);
    sublayer.setInteractivity('cartodb_id, name, offerings, address, likes, dislikes, p, x');

    layer.on('mouseover',    this._onMouseOver);
    layer.on('mouseout',     this._onMouseOut);
    layer.on('featureClick', this._onFeatureClick);

    sublayer.on('featureClick', function(e, latlng, pos, data) {
      e.preventDefault();
      e.stopPropagation();
    });

    this.map = vis.getNativeMap();
    this.map.on('click', this._onClickMap);
    this.$el.append(this.search.render().$el);

    this.$el.append(this.locationInformation.render().$el);
  },

  _onMouseOut: function() {
    $('.leaflet-container').css('cursor', 'auto');
  },

  _onMouseOver: function() {
    $('.leaflet-container').css('cursor', 'pointer');
  },

  _onFeatureClick: function(e, latlng, pos, data) {
    e.preventDefault();
    e.stopPropagation();

    if (this.t) {
      clearTimeout(this.t);
    }

    this.map.closePopup();
    console.log(data);
    this.locationInformation.open(data);
  },

  _onFetchOfferings: function() {
    this.locationForm = new LocationForm({
      offerings: this.offerings
    });

    this.locationForm.bind('add_location', this._onAddLocation, this);
    this.$el.append(this.locationForm.render().$el);
  },

  _onClickMap: function(e) {
    var self = this;

    if (this.locationForm && this.locationForm.isOpen() || this.locationInformation && this.locationInformation.isOpen()) {
      return;
    }

    this.t = setTimeout(function()  {
      var coordinates = [e.latlng.lat, e.latlng.lng];
      var latLng = new google.maps.LatLng(coordinates[0], coordinates[1]);

      self.geocoder.geocode({ 'latLng': latLng }, function(results, status) {
        self._onFinishedGeocoding(coordinates, null, results, status);
      });
    }, 250);
  },

  _onKeyUp: function(e) {
    if (e.keyCode === 27) {
      this.map.closePopup();
    }
  },

  _onClickAddLocation: function(e) {
    this._killEvent(e);
    this.addLocation.hide();
    this.map.removeLayer(this.popup);
    this.locationForm.open({
      name: this.model.get('name'),
      coordinates: this.model.get('coordinates'),
      address: this.model.get('address')
    });
  },

  _onFinishedGeocoding: function(coordinates, place, results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results && results.length > 0) {
        var address = results[0].formatted_address;
        var name = place ? place.name : null;
        this.model.set({ name: name, coordinates: coordinates, address: address });
        this._addMarker(coordinates);
      }
    }
  },

  _onAddLocation: function() {
    var marker = L.circleMarker(this.model.get('coordinates'), this.defaults.style.marker);

    marker.on('click', function() {
      console.log('click');
    });

    marker.addTo(this.map);

    var success = new SL.Dialog({ title: 'Thank your for helping the community with your knowledge', text: 'We want to make sure that every voice is heard. Your post will be uploaded in the next 24-36h. Thank you for your patience', ok_button: 'Ok, thanks' });
    success.open();

    this._removeCurrentSelection();
  },

  _gotoPlace: function(place) {
    var coordinates = [place.geometry.location.lat(), place.geometry.location.lng()];
    var latLng = new google.maps.LatLng(coordinates[0], coordinates[1]);

    var self = this;

    this.geocoder.geocode({ 'latLng': latLng }, function(results, status) {
      self._onFinishedGeocoding(coordinates, place, results, status);
    });

    this.map.panTo(coordinates);

    setTimeout(function() {
      self.map.setZoom(17);
      self._addMarker(coordinates);
    }, 500);
  },

  _removeCurrentSelection: function() {
    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
      this.model.set({ address: null });
      this.locationForm.close();
      this.addLocation.hide();
    }
  },

  _addMarker: function(coordinates) {
    var style = this.defaults.style.marker;

    var template = this._getTemplate('popup');

    var content = template({ name: this.model.get('name'), address: this.model.get('address' )});

    this.popup = SL.Popup({ autoPanPaddingTopLeft: [10, 75], offset: [0, -5] })
    .setLatLng(coordinates)
    .setContent(content)
    .openOn(this.map);

    var self = this;

    this.popup.on('close', function() {
      self.map.removeLayer(self.currentMarker);
    });

    this.currentMarker = L.circleMarker(coordinates, style);
    this.currentMarker.addTo(this.map);
    this.addLocation.show();
  },

  _getVizJSONURL: function() {
    var tpl = _.template(this.defaults.viz.templateURL);

    return tpl({
      id: window.Config.map_id,
      username: window.Config.username
    });
  }
});
