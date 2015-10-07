'use strict';

var LocationForm = SL.View.extend({

  _TEXT: {
    title: 'Add location'
  },

  events: {
    'click .js-ok': '_onClickOk',
    'click .js-cancel': 'close',
    'keyup .js-name': '_onKeyUpName'
  },

  className: 'LocationForm is-hidden',

  initialize: function(options) {
    this.options = options;

    _.bindAll(this, '_onKeyUp');

    this.location = new Location(this.options);
    this.location.bind('change:address', this._onChangeAddress, this);
    this.location.bind('change:name', this._onChangeName, this);

    this.model = new SL.Model({
      commentable: false,
      hidden: true
    });

    this.model.bind('change:enabled', this._onChangeEnabled, this);
    this.model.bind('change:hidden', this._onChangeHidden, this);

    this.location.on("invalid", function(model, error) {
      if (error === 'name') {
        this.$(".js-field").addClass('has-error');
      }
    }, this);

    this.template = this._getTemplate('location_form');
  },

  render: function() {
    var options = _.extend({ title: this._TEXT.title }, this.location.attributes);
    this.$el.append(this.template(options));
    return this;
  },

  _onChangeHidden: function() {
    this.$el.toggleClass('is-hidden', this.model.get('hidden'));
  },

  _onChangeName: function() {
    this.$('.js-name').val(this.location.get('name'));
  },

  _onChangeEnabled: function() {
    this.$('.js-ok').toggleClass('is-disabled', !this.model.get('enabled'));
  },

  _onChangeAddress: function() {
    this.$('.js-address').text(this.location.get('address'));
  },

  _onKeyUpName: function(e) {
    if (this.$('.js-name').val().length > 0) {
      this.model.set('enabled', true);
    } else {
      this.model.set('enabled', false);
    }
  },

  _onKeyUp: function(e) {
    if (e.keyCode === 27) {
      this.close();
    }
  },

  _isEnabled: function() {
    return this.model.get('enabled');
  },

  _onClickOk: function() {
    if (!this._isEnabled()) {
      return;
    }

    var ids = _.map(this.$('input:checked'), function(el) {
      return +$(el).val();
    });

    var name = this.$('.js-name').val();
    var comment = this.$('.js-comment').val();

    var self = this;

    this.location.save({ name: name, comment: comment, offerings: ids }, {
      success: function() {
      self.trigger('add_location', this.location, this);
      self.close();
    }});
  },

  _clear: function() {
    this.$('.js-checkbox').attr('checked', false);
    this.$(".js-field").removeClass('has-error');
    this.$('.js-name').val('');
    this.$('.js-ok').addClass('is-disabled');
    this.$('.js-comment').val('');
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

  isOpen: function() {
    return !this.model.get('hidden');
  },

  _focus: function() {
    var self = this;

    setTimeout(function() {
      self.$('.js-name').focus();
    }, 200);
  },

  open: function(options) {
    $(document).on("keyup", this._onKeyUp);
    this.location.set(options);
    this._show();
    this._focus();
  },

  close: function() {
    $(document).off("keyup", this._onKeyUp);
    this._hide();
    this._clear();
  }
});

