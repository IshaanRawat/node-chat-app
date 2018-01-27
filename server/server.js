const http = require("http");
const path = require("path");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isString} = require("./utils/validation");
const {deparam} = require("./utils/deparam");
const {Users} = require("./utils/users");

const port = process.env.PORT || 4000;
const publicPath = path.join(__dirname, "..", "public");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    socket.on("join", (params, callback) => {
        params = deparam(params);
        if(!isString(params.name) || !isString(params.room)) {
            return callback("Name and Room name are required.");
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit("updateUsersList", users.getUsersList(params.room));

        socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));
        socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", `${params.name} has joined!`));
        callback();
    });

    socket.on("disconnect", () => {
        var user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit("updateUsersList", users.getUsersList(user.room));
            io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left!`));
        }
        console.log("User was disconnected.");
    });

    socket.on("createMessage", (message, callback) => {
        var user = users.getUser(socket.id);

        if(user && isString(message)) {
            io.to(user.room).emit("newMessage", generateMessage(user.name, message));
        }
        callback();
    });

    socket.on("createLocationMessage", (coordinates) => {
        var user = users.getUser(socket.id);
        if(user) {
            io.to(user.room).emit("newLocationMessage", generateLocationMessage(user.name, coordinates.latitude, coordinates.longitude));
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up and running on port ${port}.`);
});