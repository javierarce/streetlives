'use strict';

var LocationInformation = SL.View.extend({

  _TEXT: {
    title: 'Add location'
  },

  events: {
    'click .js-cancel': 'close'
  },

  className: 'LocationInformation is-hidden',

  initialize: function(options) {
    this.options = options;

    _.bindAll(this, '_onKeyUp');

    this._setupModel();
    this._setupLocation();

    this.template = this._getTemplate('location_information');
  },

  render: function() {
    this.$el.empty();
    var options = _.extend({ title: this._TEXT.title }, this.location.attributes);

    this.$el.append(this.template(options));

    if (this.comments) {
      this.$('.js-fields').append(this.comments.$el);
    }
    return this;
  },

  _setupLocation: function() {
    this.location = new Location(this.options);
    this.location.bind('change:address', this._onChangeAddress, this);
    this.location.bind('change:name', this._onChangeName, this);

    this.location.on("invalid", function(model, error) {
      if (error === 'name') {
        this.$(".js-field").addClass('has-error');
      }
    }, this);
  },

  _setupModel: function() {
    this.model = new SL.Model({
      hidden: true
    });

    this.model.bind('change:hidden', this._onChangeHidden, this);
  },

  _onChangeEnabled: function() {
    this.$('.js-ok').toggleClass('is-disabled', !this.model.get('enabled'));
  },

  _onChangeHidden: function() {
    this.$el.toggleClass('is-hidden', this.model.get('hidden'));
  },

  _onChangeName: function() {
    this.$('.js-name').val(this.location.get('name'));
  },

  _onChangeAddress: function() {
    this.$('.js-address').text(this.location.get('address'));
  },

  _onKeyUp: function(e) {
    if (e.keyCode === 27) {
      this.close();
    }
  },

  _clear: function() {
    this.$('.js-checkbox').attr('checked', false);
    this.$(".js-field").removeClass('has-error');
    this.$('.js-name').val('');
  },

  _show: function() {
    var self = this;
    this.$el.fadeIn(150, function() {
      self.model.set('hidden', false);
    })
  },

  _hide: function() {
    var self = this;
    this.$el.fadeOut(150, function() {
      self.model.set('hidden', true);
    });
  },

  _onComment: function() {
    this.close();
    var success = new SL.Dialog({ title: 'Thank your for helping the community with your knowledge', text: 'We want to make sure that every voice is heard. Your post will be uploaded in the next 24-36h. Thank you for your patience', ok_button: 'Ok, thanks' });
    success.open();
  },

  isOpen: function() {
    return !this.model.get('hidden');
  },

  open: function(options) {
    $(document).on("keyup", this._onKeyUp);

    this.comments = new CommentsView({ location_id: options.cartodb_id });
    this.comments.render();
    this.comments.bind('comment', this._onComment, this);
    this.location.clear().set(_.extend({ offerings: '' }, options));
    this.render();
    this._show();
  },

  close: function() {
    $(document).off("keyup", this._onKeyUp);
    this._hide();
    this._clear();
  }
});

