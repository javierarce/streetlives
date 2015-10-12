'use strict';

var fs = require('fs');
var CartoDB = require('cartodb');

module.exports = function(Config) {
  var module = {};

  module.cartoDB = new CartoDB({
    user: Config.DB.USER,
    api_key: Config.DB.API_KEY
  });

  module.initialize = function() {
    this.cartoDB.on('connect', function() {
      return console.log('Connected to CartoDB');
    });
    this._initLog();
    this.cartoDB.connect();
  };

  module.getLikes = function(location_id, callback) {
    var query = 'SELECT (SELECT COUNT(cartodb_id) FROM comments WHERE (comment = \'\') IS FALSE) AS total, SUM(CASE WHEN liked = true THEN 1 END) AS likes, SUM(CASE WHEN liked = false THEN 1 END) AS dislikes FROM {table} WHERE location_id = {id} GROUP BY location_id';
    var options = { table: 'comments', id: location_id };
    this._query(query, options, callback);
  };

  module.getComments = function(location_id, callback) {
    var query = 'SELECT * FROM {table} WHERE (comment = \'\') IS FALSE AND location_id = {id} ORDER BY created_at DESC';
    var options = { table: 'comments', id: location_id };
    this._query(query, options, callback);
  };

  module.getOfferings = function(callback) {
    var query = 'SELECT * FROM {table}';
    var options = { table: 'offerings'};
    this._query(query, options, callback);
  };

  module.insertLocation = function(location, callback) {

    var name = location.name;
    var lat = location.coordinates[0];
    var lng = location.coordinates[1];
    var offerings = location.offerings;
    var comment = location.comment;
    var address = location.address;
    var username = location.username;

    var query, options, insert;

    name = name ? name.replace(/'/g, "''") : '';

    if (!comment) {
      if (offerings && offerings.length > 0) {
        insert = "INSERT INTO {table} (the_geom, name, username, address) VALUES(ST_GeomFromText('POINT({lng} {lat})', 4326), '{name}', '{username}', '{address}') RETURNING cartodb_id";
        query = "WITH rows AS (" + insert + ")";
        query += "INSERT INTO locations_offerings (location_id, offering_id) SELECT cartodb_id, unnest(ARRAY [{offerings}]) FROM rows";
        options = { table: 'locations', lat: lat, lng: lng, name: name, username: username, address: address, offerings: offerings.join(',') };
      } else {
        query = "INSERT INTO {table} (the_geom, name, username, address) VALUES(ST_GeomFromText('POINT({lng} {lat})', 4326), '{name}', '{username}', '{address}')";
        options = { table: 'locations', lat: lat, lng: lng, name: name, username: username, address: address };
      }
    } else {

      if (offerings && offerings.length > 0) {
        insert = "INSERT INTO {table} (the_geom, name, username, address) VALUES(ST_GeomFromText('POINT({lng} {lat})', 4326), '{name}', '{username}', '{address}') RETURNING cartodb_id";
        query = "WITH rows AS (" + insert + "), ";
        query += "os AS (INSERT INTO locations_offerings (location_id, offering_id) SELECT cartodb_id, unnest(ARRAY [{offerings}]) FROM rows)";
        query += "INSERT INTO comments (location_id, comment) SELECT cartodb_id, '{comment}' FROM rows";
        options = { table: 'locations', lat: lat, lng: lng, name: name, username: username, address: address, offerings: offerings.join(','), comment: comment };
      } else {
        query = "WITH rows AS (INSERT INTO {table} (the_geom, name, username, address) VALUES(ST_GeomFromText('POINT({lng} {lat})', 4326), '{name}', '{username}', '{address}') RETURNING cartodb_id)";
        query += "INSERT INTO comments (location_id, comment) SELECT cartodb_id, '{comment}' FROM rows";
        options = { table: 'locations', lat: lat, lng: lng, name: name, username: username, address: address, comment: comment };
      }
    }


    this._query(query, options, callback);
  };

  module.insertComment = function(comment, callback) {
    var query, options;

    if (comment.liked !== null) {
      query = "INSERT INTO {table} (location_id, comment, username, liked) VALUES('{id}', '{comment}', '{username}', '{liked}');";
      options = { table: 'comments', id: comment.location_id, comment: comment.comment, username: comment.username, liked: comment.liked};
    } else {
      query = "INSERT INTO {table} (location_id, comment, username) VALUES('{id}', '{comment}', '{username}');";
      options = { table: 'comments', id: comment.location_id, comment: comment.comment, username: comment.username };
    }

    this._query(query, options, callback);
  };

  module.insert = function(name, address, lat, lng, offerings, callback) {

    var query = "INSERT INTO {table} (the_geom, name, address) VALUES(ST_GeomFromText('POINT({lng} {lat})', 4326), '{name}', '{address}');";

    name = name ? name.replace(/'/g, "''") : '';
    //name = sanitizeHtml(name);

    var options = { table: 'locations', lat: lat, lng: lng, name: name, address: address };

    this._query(query, options, callback);
  };

  // Private methods
  module._getDB = function() {
    return this.cartoDB;
  };

  module._query = function(query, options, callback, extra) {
    return this.cartoDB.query(query, options, function(e, data) {
      return callback(e, data, extra);
    });
  };

  module._initLog = function() {
    var cartoDBLog = fs.createWriteStream('./log/' + Config.log);
    this.cartoDB.pipe(cartoDBLog);
  };

  module.initialize();

  return module;
};
