require("dotenv").config();
const express = require('express');
const http = require('http');
const path = require("path");
const { Server } = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = new Server(server);


PORT= process.env.PORT || 9000

io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on("message", (message) => {
        io.emit('message', message);  
    });
    
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.resolve("./views")));  


app.get('/', (req, res) => {
    return res.render('homepage');
});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
