
const socket = io();
let myId;

socket.on("receive-id", ({ id }) => {
  myId = id;
});

socket.on("update-faces", ({ faces }) => {
  const width = window.innerWidth;
  const { nRows, nCols } = optimalGrid(faces.length);
  const w = width / (nCols * 4);

  const svgFaces = `<div style="width: ${width}px;">
    ${faces.map((face, i) => createFaceSVG(face, i % nCols, Math.floor(i / nCols), w)).join('')}
  </div>`;

  

  const facesGallery = document.getElementById("face-gallery");
  facesGallery.innerHTML = svgFaces;

  const svgFacesElements = Array.from(document.querySelectorAll(".svg-face"));
  makeBlink(svgFacesElements);
});

socket.on("server-broadcasts-chat-message", ({ id, message }) => {
  console.log("server-broadcasts-chat-message", id, message);
  const faceElement = document.getElementById(id);
  showSpeechBubble(faceElement, message);
});


const messageInput = document.getElementById("message-input");
const messageLengthLimit = 200;

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || messageInput.value.length > messageLengthLimit) {
    const message = messageInput.value;
    messageInput.value = "";
    if (message.length === 0) {
      return;
    }
    socket.emit("client-submits-chat-message", { id: myId, message });
  }
});

function showSpeechBubble(element, message) {
  const speechBubble = element.querySelector('.speech-bubble');
  speechBubble.textContent = message;
  speechBubble.style.display = 'block'; // Make the speech bubble visible
  speechBubble.style.opacity = 0; // Start with the bubble fully transparent

  if (speechBubble.fadeTimeout) {
    clearTimeout(speechBubble.fadeTimeout);
    clearTimeout(speechBubble.hideTimeout);
  }

  // Allow a small delay for CSS to catch up, then fade in
  setTimeout(() => {
    speechBubble.style.opacity = 1;
  }, 10);

  // Fade out after 5 seconds
  speechBubble.fadeTimeout = setTimeout(() => {
    speechBubble.style.opacity = 0;

    // Set to display none after the transition to fully transparent
    speechBubble.hideTimeout = setTimeout(() => {
      speechBubble.style.display = 'none';
    }, 500); // This timeout matches the transition duration
  }, 5000);
}




