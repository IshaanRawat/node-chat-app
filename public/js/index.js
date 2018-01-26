var socket = io();

const messageForm = document.querySelector("#message-form");
const messageInputField = document.querySelector("input[name=message]");
const messageContainer = document.querySelector("#messages");
const locationButton = document.querySelector("#send-location");
        
socket.on("connect", () => {
    console.log("Connected to the server.");
});

socket.on("disconnect", () => {
    console.log("Disconnected from the server.");
});

socket.on("newMessage", (message) => {
    console.log("New Message received!", message);

    let li = document.createElement("li");
    li.textContent = `${message.from}: ${message.text}`;
    messageContainer.appendChild(li);
});

socket.on("newLocationMessage", (message) => {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.setAttribute("href", message.url);
    a.setAttribute("target", "_blank");
    a.textContent = "My current location";
    li.textContent = `${message.from}: `;
    li.appendChild(a);
    messageContainer.appendChild(li);
})

messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    socket.emit("createMessage", {
        from: "User",
        text: messageInputField.value
    }, (response) => {
        messageInputField.value = "";
    });
});

locationButton.addEventListener("click", (event) => {
    if(!navigator.geolocation) {
        return alert("Geolocation is not supported in your browser.");
    }

    locationButton.setAttribute("disabled", "disabled");
    locationButton.textContent = "Fetching location...";

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttribute("disabled");
        locationButton.textContent = "Send Location";
    }, () => {
        alert("Unable to fetch the location.");
        locationButton.removeAttribute("disabled");
        locationButton.textContent = "Send Location";
    });
});
