const http = require("http");
const path = require("path");
const express = require("express");
const socketIO = require("socket.io");

const port = process.env.PORT || 4000;
const publicPath = path.join(__dirname, "..", "public");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connected.");

    socket.on("disconnect", () => {
        console.log("User was disconnected.");
    });

    socket.on("createMessage", (message) => {
        console.log("New Message created:", message);
        io.emit("newMessage", {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });
});

server.listen(port, () => {
    console.log(`Server is up and running on port ${port}.`);
});