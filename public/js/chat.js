var socket = io();

const messageForm = document.querySelector("#message-form");
const messageInputField = document.querySelector("input[name=message]");
const messageContainer = document.querySelector("#messages");
const locationButton = document.querySelector("#send-location");

// function scrollToBottom() {
//     let newMessage = document.querySelector("#messages li:last-child");
//     let lastMessage = document.querySelector("#messages li:nth-last-child(2)");
//     let clientHeight = messageContainer.clientHeight;
//     let scrollTop = messageContainer.scrollTop;
//     let scrollHeight = messageContainer.scrollHeight;
//     let newMessageHeight = newMessage.clientHeight;
//     let lastMessageHeight = lastMessage.clientHeight;

//     if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
//         console.log("Should scroll!");
//     }
// }

function deparam(params) {
    var result = {};
    params = params.split("?")[1];
    for(query of params.split("&")) {
        result[query.split("=")[0]] = query.split("=")[1].replace("+", " ");
    }
    return result;
}
        
socket.on("connect", () => {
    console.log("Connected to the server.");
});

socket.on("disconnect", () => {
    console.log("Disconnected from the server.");
});

socket.on("newMessage", (message) => {
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
