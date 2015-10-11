this["JST"] = this["JST"] || {};

this["JST"]["sources/templates/button.jst.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
__e( title ) +
'\n';

}
return __p
};

this["JST"]["sources/templates/comment.jst.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<p>\n  <span class=\'CommentList-itemDate\'>' +
__e( moment(created_at).format('MMMM Do YYYY') ) +
'</span>\n  ' +
__e( comment ) +
'\n  ';
 if (username) { ;
__p += ' <div class="CommentList-username">' +
__e( username ) +
'</div> ';
 } ;
__p += '\n</p>\n';

}
return __p
};

this["JST"]["sources/templates/comments.jst.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="Comments-inner">\n  <div class="Comments-content js-comments">\n    <label class="LocationInformation-label">Comments</label>\n    <ul class="CommentList js-comment-list scroll-pane"></ul>\n  </div>\n  <div class="Comments-form">\n    <label class="LocationInformation-label">Do you have something to add?</label>\n    <div class="InputField InputField-area js-field">\n      <textarea placeholder="Feel free to comment" class="Input InputArea js-comment"></textarea>\n    </div>\n\n    <li class="LocationForm-field">\n      <label class="LocationForm-label">Your name or initials (optional)</label>\n      <div class="InputField js-field">\n        <input type="text" class="Input js-username" value="" />\n      </div>\n    </li>\n\n    <div class="LikeButtons">\n      <p class="LikeButtons-title">Recommend?</p>\n      <ul class="LikeButtons-list">\n        <li class="LikeButtons-listItem"><button class="LikeButton js-like" data-value="1"></button></li>\n        <li class="LikeButtons-listItem"><button class="LikeButton LikeButton--dislike js-like" data-value="0"></button></li>\n      </ul>\n    </div>\n    \n    <button class="Button is-disabled js-ok">Add comment</button>\n  </div>\n</div>\n';

}
return __p
};

this["JST"]["sources/templates/dialog.jst.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="Dialog-inner js-content"></div>\n';

}
return __p
};

this["JST"]["sources/templates/dialog_content.jst.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="Dialog-content">\n  <div class="Dialog-logo"></div>\n  <h2>' +
__e( title ) +
'</h2>\n  <p>' +
__e( text ) +
'</p>\n</div>\n<footer class="Footer">\n  <button class="Button js-ok">' +
__e( ok_button ) +
'</button>\n</footer>\n<button class="Button Button--close js-cancel">✕</button>\n';

}
return __p
};

this["JST"]["sources/templates/header.jst.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a href="' +
__e( url ) +
'" class="HeaderTitle">\n  ' +
__e( title ) +
'\n</a>\n\n<ul class="HeaderItems">\n  <li class="HeaderItem"><button class="HeaderItem-link is-selected js-map">Map</button></li>\n  <li class="HeaderItem"><button class="HeaderItem-link js-about">About</button></li>\n  <li class="HeaderItem"><button class="HeaderItem-link js-privacy">Privacy</button></li>\n</ul>\n';

}
return __p
};

this["JST"]["sources/templates/location_form.jst.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="LocationForm-inner js-content"></div>\n';

}
return __p
};

this["JST"]["sources/templates/location_form_content.jst.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="LocationForm-content js-content">\n  <ul class="LocationForm-fields">\n    <li class="LocationForm-field">\n      <label class="LocationForm-label">Address</label>\n      <span class="js-address">' +
__e( address ) +
'</span>\n    </li>\n\n    <li class="LocationForm-field">\n      <label class="LocationForm-label">Name</label>\n      <div class="InputField js-field">\n        <input type="text" placeholder="Name of this location" class="Input js-name" value="' +
__e( name ) +
'" />\n      </div>\n    </li>\n\n    <li class="LocationForm-field">\n      <label class="LocationForm-label">What does it offer?</label>\n      <ul class="OfferingList">\n        ';
 offerings.each(function(offering) { ;
__p += '\n        <li class="OfferingList-item">\n          <label for="offering_' +
__e(offering.get('cartodb_id') ) +
'" class="InputCheck-label">\n            <input type=\'checkbox\' value="' +
__e(offering.get('cartodb_id') ) +
'" id="offering_' +
__e(offering.get('cartodb_id') ) +
'" class="InputCheck js-checkbox" /> ' +
__e( offering.get('name') ) +
'\n          </label>\n        </li>\n        ';
 }); ;
__p += '\n      </ul>\n    </li>\n\n    <li class="LocationForm-field">\n      <label class="LocationForm-label">Your comment</label>\n      <div class="InputField js-field">\n        <textarea placeholder="Your comment" class="Input InputArea js-comment"></textarea>\n      </div>\n    </li>\n\n    <li class="LocationForm-field">\n      <label class="LocationForm-label">Your name or initials (optional)</label>\n      <div class="InputField js-field">\n        <input type="text" class="Input js-username" value="" />\n      </div>\n    </li>\n\n  </ul>\n\n  <footer class="Footer">\n    <button class="Button js-ok is-disabled">' +
__e( title ) +
'</button>\n  </footer>\n\n  <button class="Button Button--close js-cancel">✕</button>\n\n</div>\n';

}
return __p
};

this["JST"]["sources/templates/location_information.jst.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="LocationInformation-inner js-content"></div>\n';

}
return __p
};

this["JST"]["sources/templates/location_information_content.jst.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="LocationInformation-content">\n\n  <div class="LocationInformation-title">\n    <h2 class="LocationInformation-name">' +
__e( name ) +
'</h2>\n    <h4 class="LocationInformation-address">' +
__e( address ) +
'</h4>\n  </div>\n\n  <ul class="LocationInformation-fields js-fields">\n    ';
 if (offerings) { ;
__p += '\n    <li class="LocationInformation-field">\n      <label class="LocationInformation-label">Can offer help with</label>\n      <p>' +
__e( offerings ) +
'</p>\n    </li>\n    ';
 } ;
__p += '\n  </ul>\n\n  <button class="Button Button--close js-cancel">✕</button>\n</div>\n';

}
return __p
};

this["JST"]["sources/templates/page.jst.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="Page-content js-content"></div>\n';

}
return __p
};

this["JST"]["sources/templates/page_content.jst.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="Page-inner">\n  <div class="scroll-pane js-scroll">\n    <p>' +
__e( text ) +
'</p>\n    <p>Elit veniam nam dicta maiores enim laboriosam minima sed! Repellendus autem sunt esse eos at nulla officia! Id dolores rerum nulla nostrum totam ducimus tempora nihil voluptatum aspernatur perspiciatis temporibus!</p>\n    <p>Elit veniam nam dicta maiores enim laboriosam minima sed! Repellendus autem sunt esse eos at nulla officia! Id dolores rerum nulla nostrum totam ducimus tempora nihil voluptatum aspernatur perspiciatis temporibus!</p>\n    <p>Elit veniam nam dicta maiores enim laboriosam minima sed! Repellendus autem sunt esse eos at nulla officia! Id dolores rerum nulla nostrum totam ducimus tempora nihil voluptatum aspernatur perspiciatis temporibus!</p>\n    <p>Elit veniam nam dicta maiores enim laboriosam minima sed! Repellendus autem sunt esse eos at nulla officia! Id dolores rerum nulla nostrum totam ducimus tempora nihil voluptatum aspernatur perspiciatis temporibus!</p>\n    <p>Elit veniam nam dicta maiores enim laboriosam minima sed! Repellendus autem sunt esse eos at nulla officia! Id dolores rerum nulla nostrum totam ducimus tempora nihil voluptatum aspernatur perspiciatis temporibus!</p>\n    <p>Elit veniam nam dicta maiores enim laboriosam minima sed! Repellendus autem sunt esse eos at nulla officia! Id dolores rerum nulla nostrum totam ducimus tempora nihil voluptatum aspernatur perspiciatis temporibus!</p>\n    <p>Elit veniam nam dicta maiores enim laboriosam minima sed! Repellendus autem sunt esse eos at nulla officia! Id dolores rerum nulla nostrum totam ducimus tempora nihil voluptatum aspernatur perspiciatis temporibus!</p>\n    <p>Elit veniam nam dicta maiores enim laboriosam minima sed! Repellendus autem sunt esse eos at nulla officia! Id dolores rerum nulla nostrum totam ducimus tempora nihil voluptatum aspernatur perspiciatis temporibus!</p>\n    <p>Elit veniam nam dicta maiores enim laboriosam minima sed! Repellendus autem sunt esse eos at nulla officia! Id dolores rerum nulla nostrum totam ducimus tempora nihil voluptatum aspernatur perspiciatis temporibus!</p>\n    <p>Elit veniam nam dicta maiores enim laboriosam minima sed! Repellendus autem sunt esse eos at nulla officia! Id dolores rerum nulla nostrum totam ducimus tempora nihil voluptatum aspernatur perspiciatis temporibus!</p>\n    <p>Elit veniam nam dicta maiores enim laboriosam minima sed! Repellendus autem sunt esse eos at nulla officia! Id dolores rerum nulla nostrum totam ducimus tempora nihil voluptatum aspernatur perspiciatis temporibus!</p>\n    <p>Elit veniam nam dicta maiores enim laboriosam minima sed! Repellendus autem sunt esse eos at nulla officia! Id dolores rerum nulla nostrum totam ducimus tempora nihil voluptatum aspernatur perspiciatis temporibus!</p>\n    <p>Elit veniam nam dicta maiores enim laboriosam minima sed! Repellendus autem sunt esse eos at nulla officia! Id dolores rerum nulla nostrum totam ducimus tempora nihil voluptatum aspernatur perspiciatis temporibus!</p>\n    <p>Elit veniam nam dicta maiores enim laboriosam minima sed! Repellendus autem sunt esse eos at nulla officia! Id dolores rerum nulla nostrum totam ducimus tempora nihil voluptatum aspernatur perspiciatis temporibus!</p>\n    <p>Elit veniam nam dicta maiores enim laboriosam minima sed! Repellendus autem sunt esse eos at nulla officia! Id dolores rerum nulla nostrum totam ducimus tempora nihil voluptatum aspernatur perspiciatis temporibus!</p>\n    <p>Elit veniam nam dicta maiores enim laboriosam minima sed! Repellendus autem sunt esse eos at nulla officia! Id dolores rerum nulla nostrum totam ducimus tempora nihil voluptatum aspernatur perspiciatis temporibus!</p>\n  </div>\n  <button class="Button Button--close js-cancel">✕</button>\n</div>\n';

}
return __p
};

this["JST"]["sources/templates/popup.jst.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<p>\n  <strong class="Popup-addressName">';
 if (name) { ;
__p +=
__e(name ) +
', ';
 } ;
__p +=
__e( address ) +
'</strong> <br/> is not part of Streetlives yet. Do you want to add this location to the map?\n</p>\n\n<button class="Button Button--addLocationSmall js-add-location">Add location</button>\n';

}
return __p
};

this["JST"]["sources/templates/search.jst.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<input type=\'text\' placeholder=\'Search\' class="Input SearchInput js-field" />\n';

}
return __p
};