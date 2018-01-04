/**
 * lab requirement:
 * Implement all /posts/:postId/comments routes in routes/comments.js.
 * GET and POST /posts/:postId/comments
 * PUT and DELETE /posts/:postId/comments/:commentId
 * Use an in-memory store to keep posts and comments:
 * 
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
 * 
 */

module.exports = {

    /**
     * get all comments for a post
     * @param {*} req 
     * @param {*} res 
     */
    getComments(req, res) {
        let _posts = global.store.posts;        
        let _postId = req.params.postId;        
        let _post = _posts[_postId];

        if (!_post)
          return res.status(400).send("WARNING: cannot find post with id:" + _postId);

        let _comments = _posts[_postId].comments;

        res.status(200).send(_comments);              
    }, 

    /**
     * create new comment
     * @param {*} req 
     * @param {*} res 
     */
    addComment(req, res) {
        //input validation
        if (!req.body.text)
          return res.status(400).send("ERROR: all attributes must be populated");

        //whitelisting validation
        let _posts = global.store.posts;        
        let _postId = req.params.postId;        

        let _post = _posts[_postId];

        if (!_post)
          return res.status(400).send("WARNING: cannot find post with id:" + _postId);
        
        let _comments = _post.comments;
        
        let _сomment = {
            text: req.body.text
        };

        _comments.push(_сomment);

        //return count of posts as result
        res.status(201).send({id: _comments.length});              
      
    },

    /**
     * update a comment
     * @param {*} req 
     * @param {*} res 
     */
    updateComment(req, res) {
        //input validation
        if (!req.body.text)
          return res.status(400).send("ERROR: all attributes must be populated");
        
        //whitelisting validation
        let _posts = global.store.posts;        
        let _postId = req.params.postId;        
        let _post = _posts[_postId];

        if (!_post)
          return res.status(400).send("WARNING: cannot find post with id:" + _postId);


        let _comments = _posts[_postId].comments;
        let _commentId = req.params.commentId;
        let _oldComment = _comments[_commentId];

        if (!_oldComment)
          return res.status(400).send("WARNING: cannot find comment with id:" + _commentId);
                
        let _сomment = {
            text: req.body.text
        };
        
        _comments[_commentId] = _сomment;
        res.status(200).send(_posts[_postId]);      
    },

    /**
     * remove comment from a post
     * @param {*} req 
     * @param {*} res 
     */
    removeComment(req, res) {
        let _posts = global.store.posts;     
        let _postId = req.params.postId;
        let _post = _posts[_postId];

        if (!_post)
          return res.status(400).send("WARNING: cannot find post with id:" + _postId);
        
        
        let _comments = _posts[_postId].comments;
        let _commentId = req.params.commentId;
        let _comment = _comments[_commentId];

        if (!_comment) 
          return res.status(400).send("WARNING: cannot find comment with id:" + _commentId);
                    
        _comments.splice(_commentId, 1);
        res.status(204).send();
        
    }  
  };
