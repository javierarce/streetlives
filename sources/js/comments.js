'use strict';

var CommentView = SL.View.extend({

  tagName: 'li',

  className: 'CommentList-item',

  events: {
  },

  initialize: function(options) {
    this.options = options;
    this.model = this.options.model;

    console.log(this.model.attributes);
    this.template = this._getTemplate('comment');
  },

  render: function() {
    this.$el.append(this.template(this.model.attributes));
    return this;
  }
});

var CommentsView = SL.View.extend({

  className: 'Comments',

  events: {
    'click .js-ok': '_onSubmit',
    'keyup .js-comment': '_onKeyUp',
    'click .js-like': '_onClickLike'
  },

  initialize: function(options) {
    _.bindAll(this, '_onFetchComments');

    this.options = options;
    this.template = this._getTemplate('comments');

    this.comment = new Comment({ location_id: this.options.location_id });
    this.comment.bind('change:liked', this._onChangeLiked, this);
    this.comment.bind('change', this._checkEnabled, this);

    this.commentsTemplate = this._getTemplate('comments_list');

    this._setupModel();

    this.comments = new Comments();

    this.comments.fetch({
      data: { location_id: this.options.location_id },
      success: this._onFetchComments
    });
  },

  render: function() {
    this.$el.append(this.template({ comments: this.comments }));
    return this;
  },

  _renderComments: function() {
    this.comments.each(function(model) {
      var comment = new CommentView({ model: model });
      this.$(".js-comment-list").append(comment.render().$el);
    }, this);

    var api = this.$('.js-comment-list').jScrollPane().data('jsp');

    if (api) {
      api.reinitialise();
    }

    this.$('.js-comment-list').animate({ opacity: 1 }, 150);
  },

  _setupModel: function() {
    this.model = new SL.Model({
      enabled: false
    });

    this.model.bind('change:enabled', this._onChangeEnabled, this);
  },

  _onChangeLiked: function() {
    this.$('.js-like').removeClass('is-selected');
    var liked = this.comment.get('liked');
    if (liked !== null) {
      this.$('[data-value="' + (liked ? 1 : 0) + '"]').addClass('is-selected');
    }
  },

  _onChangeEnabled: function() {
    this.$('.js-ok').toggleClass('is-disabled', !this.model.get('enabled'));
  },

  _onFetchComments: function() {
    this._renderComments();
  },

  _isEnabled: function() {
    return this.model.get('enabled');
  },

  _onClickLike: function(e) {
    this._killEvent(e);
    var like = $(e.target).data('value');
    var liked = this.comment.get('liked');
    this.comment.set({ liked: (like == liked) ? null : like });
  },

  _checkEnabled: function() {
    var enabled = this.$('.js-comment').val().length > 0 || this.comment.get('liked') !== null;
    this.model.set('enabled', enabled);
  },

  _onKeyUp: function() {
    this.comment.set({ comment: this.$('.js-comment').val() });
  },

  _onSubmit: function(e) {
    if (!this._isEnabled()) {
      return;
    }

    this._killEvent(e);

    this.comment.on("invalid", function(model, error) {
      if (error === 'comment') {
        this.$(".js-comment").parent().addClass('has-error');
      }
    }, this);


    this.comment.set({ comment: this.$('.js-comment').val(), username: this.$('.js-username').val() });
    this.comments.add(this.comment);

    var self = this;

    this.comment.save({}, {
      success: function() {
        self.$(".js-ok").addClass(".is-disabled");
        self.trigger('comment', this);
      }});
  }
});
