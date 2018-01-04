#1.test valid values
curl -X POST   http://localhost:3000/posts   -H 'Content-Type: application/json' -d '{\"name\": \"Top 10 ES6 Features\", \"url\":\"http://webapplog.com/es6\", \"text\": \"test post\", \"unnecessary_field\": \"the value should be ignored\"}'
curl -X PUT    http://localhost:3000/posts/0 -H 'Content-Type: application/json' -d '{\"name\": \"Top 10 ES6 Features\", \"url\":\"http://webapplog.com/es6\", \"text\": \"post was updated\", \"unnecessary_field\": \"the value should be ignored\"}'
curl -X GET    http://localhost:3000/posts

curl -X POST    http://localhost:3000/posts/0/comments   -H 'Content-Type: application/json' -d '{\"text\": \"test comment\", \"unnecessary_field\": \"the value should be ignored\"}'
curl -X PUT     http://localhost:3000/posts/0/comments/0 -H 'Content-Type: application/json' -d '{\"text\": \"test comment was updated\", \"unnecessary_field\": \"the value should be ignored\"}'
curl -X GET     http://localhost:3000/posts/0/comments 

curl -X GET    http://localhost:3000/posts

curl -X DELETE  http://localhost:3000/posts/0/comments/0 
curl -X DELETE http://localhost:3000/posts/0 

curl -X GET    http://localhost:3000/posts

#2.test invalid data
#2.1 test invalid data:posts
#2.1.1 post.create : missing post.name
curl -X POST   http://localhost:3000/posts   -H 'Content-Type: application/json' -d '{\"url\":\"http://webapplog.com/es6\", \"text\": \"test post\", \"unnecessary_field\": \"the value should be ignored\"}'
#2.1.2 post.update : empty post.name
curl -X PUT    http://localhost:3000/posts/0 -H 'Content-Type: application/json' -d '{\"name\": \"\", \"url\":\"http://webapplog.com/es6\", \"text\": \"post was updated\", \"unnecessary_field\": \"the value should be ignored\"}'
#2.1.3 post.update : wrong postId
curl -X PUT    http://localhost:3000/posts/213 -H 'Content-Type: application/json' -d '{\"name\": \"Top 10 ES6 Features\", \"url\":\"http://webapplog.com/es6\", \"text\": \"post was updated\", \"unnecessary_field\": \"the value should be ignored\"}'
#2.1.4 post.delete : wrong postId
curl -X DELETE http://localhost:3000/posts/214

#2.2 test invalid data:comments
#2.2.1 post.create : missing comment.text
curl -X POST    http://localhost:3000/posts/0/comments   -H 'Content-Type: application/json' -d '{\"text999\": \"test comment\", \"unnecessary_field\": \"the value should be ignored\"}'
#2.2.2 post.update : empty comment.text
curl -X PUT     http://localhost:3000/posts/0/comments/0 -H 'Content-Type: application/json' -d '{\"text\": \"\", \"unnecessary_field\": \"the value should be ignored\"}'
#2.2.3 post.update : wrong commentId
curl -X PUT     http://localhost:3000/posts/0/comments/223 -H 'Content-Type: application/json' -d '{\"text\": \"test comment was updated\", \"unnecessary_field\": \"the value should be ignored\"}'
#2.2.4 post.delete : wrong commentId
curl -X DELETE  http://localhost:3000/posts/0/comments/224

#2.2.5 post.create : wrong postId
curl -X POST    http://localhost:3000/posts/225/comments   -H 'Content-Type: application/json' -d '{\"text\": \"test comment\", \"unnecessary_field\": \"the value should be ignored\"}'
#2.2.6 post.update : wrong postId
curl -X PUT     http://localhost:3000/posts/226/comments/0 -H 'Content-Type: application/json' -d '{\"text\": \"test comment was updated\", \"unnecessary_field\": \"the value should be ignored\"}'
#2.2.7 post.update : wrong postId
curl -X DELETE  http://localhost:3000/posts/227/comments/0 
#2.2.8 post.delete : wrong postId
curl -X GET     http://localhost:3000/posts/228/comments 



