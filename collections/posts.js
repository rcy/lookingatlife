Posts = new Mongo.Collection('posts');

Meteor.methods({
  addPost: function (options) {
    check(options, Match.ObjectIncluding({text: String}));
    if (options._id) {
      return Posts.update({ _id: options._id },
                          { $set: {text: options.text, updatedAt: new Date() }});
    } else {
      return Posts.insert({ text: options.text, createdAt: new Date() });
    }
  }
});
