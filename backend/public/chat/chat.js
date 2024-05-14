


// for (let i = 0; i < 30; i++) {
//   const faceColors = getFaceColors();
//   id++;
//   const nickname = "Name: " + id;
//   const face = { id, ...faceColors, nickname };
//   faces.push(face);
// }




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


  
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const messageTextarea = document.getElementById("message-textarea");
    const message = messageTextarea.value;
    messageTextarea.value = "";
    socket.emit("client-submits-chat-message", { id: myId, message });
  }
});

function showSpeechBubble(element, message) {
  const speechBubble = element.querySelector('.speech-bubble');
  speechBubble.textContent = message;
  speechBubble.style.display = 'block'; // Make the speech bubble visible
  speechBubble.style.opacity = 0; // Start with the bubble fully transparent

  // Allow a small delay for CSS to catch up, then fade in
  setTimeout(() => {
    speechBubble.style.opacity = 1;
  }, 10);

  // Fade out after 5 seconds
  setTimeout(() => {
    speechBubble.style.opacity = 0;

    setTimeout(() => {
      speechBubble.style.display = 'none';
    }, 500); // This timeout matches the transition duration
  }, 5000);
}




