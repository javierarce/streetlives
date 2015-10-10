'use strict';

SL.Dialog = SL.View.extend({
  className: 'Dialog is-hidden',

  events: {
    'click .js-ok': 'close',
    'click .js-cancel': 'close'
  },

  templateName: 'dialog',

  initialize: function(options) {

    _.bindAll(this, '_onKeyUp');

    $(document).on("keyup", this._onKeyUp);

    this.options = options;
    this.template = this._getTemplate(this.templateName);

    this._setupModel();
  },

  render: function() {
    var attributes = this.model.attributes;
    this.$el.append(this.template(attributes));
    this._initScroll();
    return this;
  },

  _onChangeHidden: function() {
    this.$el.toggleClass('is-hidden', this.model.get('hidden'));
  },

  _setupModel: function() {
    this.model = new SL.Model(_.extend({
      hidden: true
    }, this.options));

    this.model.bind('change:hidden', this._onChangeHidden, this);
  },

  toggle: function() {
    this.model.set('hidden', !this.model.get('hidden'));
  },

  _initScroll: function() {
    if (this.api) {
      this.api.reinitialise();
      return;
    }

    this.api = this.$('.js-scroll').jScrollPane().data('jsp');

    if (this.api) {
      this.api.reinitialise();
    }
  },

  open: function() {
    $('body').append(this.render().$el);
    this.show();
  },

  show: function() {
    this.model.set('hidden', false);

    this._initScroll();
  },

  hide: function() {
    this.model.set('hidden', true);
  },

  close: function() {
    this.hide();
    this.trigger('close', this);
  },

  _onKeyUp: function(e) {
    if (e.keyCode === 27) {
      this.close();
    }
  }

});

