const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db');
const app = express(); 

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.post('/register' ,(req,res) => {
    const username = req.body.username
    const password = req.body.password
    db.query(
        "INSERT INTO users (username, password) VALUES (?,?)",
        [username, password],(err, result) => {
            console.log(err);
        }
    );
    });

app.get('/posts',(req,res)=>{
    const POST_QUARY = "select * from guestbook.posts";
    connection.query(POST_QUARY, (err, response) => {
        if(err) console.log(err)
        else res.send(response)
    })
})

app.post('/addpost',(req,res)=>{
    const ADD_QUARY = `INSERT INTO guestbook.posts (Text) VALUES ('${req.body.post}')`
    connection.query(ADD_QUARY, (err) => {
        if(err) console.log(err)
        else res.send('inserted')
    })
})

app.delete('/deletepost/:postID',(req,res)=>{
    const DELETE_QUARY = `DELETE FROM guestbook.posts WHERE (postID=${req.params.postID})`;
    connection.query(DELETE_QUARY, (err, res) => {
        if(err) console.log(err)
        
    })
})

app.listen(4000, ()=>{
    console.log('running on port 4000')
})