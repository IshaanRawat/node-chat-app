var socket = io();
        
socket.on("connect", () => {
    console.log("Connected to the server.");

    socket.emit("createMessage", {
        from: "ishaan@ishaanrawat.com",
        text: "Hey! What's up?"
    });
});

socket.on("disconnect", () => {
    console.log("Disconnected from the server.");
});

socket.on("newMessage", (message) => {
    console.log("New Message received!", message);
});
