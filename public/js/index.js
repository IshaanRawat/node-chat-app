var socket = io();

const messageForm = document.querySelector("#message-form");
        
socket.on("connect", () => {
    console.log("Connected to the server.");
});

socket.on("disconnect", () => {
    console.log("Disconnected from the server.");
});

socket.on("newMessage", (message) => {
    console.log("New Message received!", message);
});

messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    socket.emit("createMessage", {
        from: "User",
        text: document.querySelector("input[name=message]").value
    }, (response) => {
        
    });
});
