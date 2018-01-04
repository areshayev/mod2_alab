/**
 * lab requirement:
 * Implement all /posts routes in routes/posts.js
 * GET and POST /posts
 * PUT and DELETE /posts/:postId/
 * The removal of a blog post must remove all its comments.
 * Use an in-memory store to keep posts and comments:
 * Use an in-memory store with the structure similar to this:

    let store = {
        posts: [
        {name: 'Top 10 ES6 Features every Web Developer must know',
        url: 'https://webapplog.com/es6',
        text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
        comments: [
            text: 'Cruel…..var { house, mouse} = No type optimization at all',
            text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.',
            text: '(p1,p2)=>{ … } ,i understand this ,thank you !'      
        ]
        }
        ]
    }
*/

module.exports = {

    /**
     * return list of all posts
     */
    getPosts(req, res) {
        let _posts = global.store.posts;
        res.status(200).send(_posts);
    },

    /**
     * create new post
     */    
    addPost(req, res) {

        //input validation
        if (!req.body.name || !req.body.url || !req.body.text)
            return res.status(400).send("ERROR: all attributes must be populated");

        //whitelisting validation                        
        let _posts = global.store.posts;        
        let _post = {
            name: req.body.name,
            url: req.body.url,
            text: req.body.text
        };
        
        _post.comments = [];  //create empty comments array        
        _posts.push(_post);

        //return count of posts as result
        res.status(201).send({id: _posts.length});      
    },

    /**
     * update post 
     */
    updatePost(req, res) {
        //validation - we update post header only. ignore comments        
        if (!req.body.name || !req.body.url || !req.body.text)
          return res.status(400).send("ERROR: all attributes must be populated");

        //whitelisting validation
        let _posts = global.store.posts;
        let _postId = req.params.postId;
        let _oldPost = _posts[_postId];

        if (!_oldPost)
          return res.status(400).send("WARNING: cannot find post with id:" + _postId);
        
        let _post = {
            name: req.body.name,
            url: req.body.url,
            text: req.body.text
        };
        _post.comments = _posts[_postId].comments;

        _posts[_postId] = _post;        
        res.status(200).send(_posts[_postId]);      
    },


    /**
     * delete post
     */
    removePost(req, res) {
        let _posts = global.store.posts;
        let _postId = req.params.postId;
        let _post = _posts[_postId];

        if (!_post)
          return res.status(400).send("WARNING: cannot find post with id:" + _postId);
                
        _posts.splice(_postId, 1);
        res.status(204).send();
    }
  };