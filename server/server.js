const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000; //heroku will give us a port but if we are not on heroku the default port would be 3000

app.use(express.static(publicPath)); // this allows us to serve up all assets from the public directory

app.get('*', (req, res)=>{
    res.sendFile(path.join(publicPath, 'index.html')); 
}); // 1st argument is path '*' means to match all unmatched routes. 2nd argument is a function to pass all the unhandled requests so we send back the index.html file in public directory

app.listen(port, ()=>{
    console.log('Server is up on port 3000')
}); // 3000 is a port, 2nd argument is a callback function which get called when server is up.