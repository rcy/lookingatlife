Posts = new Mongo.Collection('posts');

Meteor.methods({
  addPost: function (options) {
    check(options, {text: String});
    return Posts.insert(_.extend(options, {createdAt: new Date()}));
  }
});
