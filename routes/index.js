/**
 * lab requirement:
 * Create routes/index.js which imports and exports posts.js and comments.js so they can be used with require('routes') in server.js
 */


module.exports = {
    posts: require('./posts.js'),
    comments: require('./comments.js')
};
