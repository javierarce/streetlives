'use strict';

var Router = Backbone.Router.extend({

  routes: {
    "": "map",
    "/": "map",
    "about": "about",
    "privacy": "privacy"
  },

  map: function() {
    console.log('map');
  },

  about: function() {
    this.trigger('show_about', this);
  },

  privacy: function() {
    this.trigger('show_privacy', this);
  }

});

