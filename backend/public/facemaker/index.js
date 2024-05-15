
function registerFace() {
  const faceColor = document.getElementById('face-color').value;
  const eyeColor = document.getElementById('eye-color').value;
  const browColor = document.getElementById('brow-color').value;
  const mouthColor = document.getElementById('mouth-color').value;
  const nickname = document.getElementById('nickname-input').value || "Anonymous";

  fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      faceColor,
      eyeColor,
      browColor,
      mouthColor,
      nickname
    })
  })
  .then(response => response.json())
  .then((result) => {
    if (result.success) {
      window.location.href = `/chat/${result.chatRoomName}`;
    } else {
      alert("Failed to register face");
    }
  })
}

document.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    registerFace();
  }
});


// this issues when users hit the back button to the page and the input field values are being cached
window.addEventListener('pageshow', () => {
  redrawFaceOnPage();
  redrawNicknameTagOnPage();
});


// Add a loading animation to the register button
const button = document.getElementById('register-button');
let dotCount = 0;

function updateButtonLabel() {
    const baseText = 'Start Chatting';
    button.textContent = baseText + '.'.repeat(dotCount);
    dotCount = (dotCount + 1) % 4;  // Cycle through 0 to 3
}

setInterval(updateButtonLabel, 500);
