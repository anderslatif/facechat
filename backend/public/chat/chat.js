
function createFaceSVG(face, i, j) {
  const { faceColor, eyeColor, mouthColor, browColor, id, name } = face;

  return `
      
  <div id=${id} class="svg-container">
      <svg  x=${i * w} y=${j * w} class="svg-face" viewBox="-5 -5 110 70" 
          width=${w} height=${w} style="position: relative; z-index: 0;">
          <ellipse cx="50" cy="30" rx="50" ry="50" class="face" fill="${faceColor}" />
          <ellipse cx="30" cy="27.5" rx="10" ry="10" class="eye right-eye" fill="white" />
          <ellipse id="pupil-${i}-${j}-right" cx="30" cy="27.5" rx="5" ry="5" class="pupil" fill="${eyeColor}" />
          <ellipse cx="70" cy="27.5" rx="10" ry="10" class="eye left-eye" fill="white" />
          <ellipse id="pupil-${i}-${j}-left" cx="70" cy="27.5" rx="5" ry="5" class="pupil" fill="${eyeColor}" />
          <path d="M30 50 c0 20, 40 20, 40 0" class="mouth" fill="${mouthColor}" />
          <path d="M17.5 10 c0 0, 12.5 -6, 25 0" class="eyebrow" stroke="${browColor}" stroke-width=5 />
          <path d="M57.5 10 c0 0, 12.5 -6, 25 0" class="eyebrow" stroke="${browColor}" stroke-width=5 />
      </svg>
      <div style="font-size: 1em;">${name}</div> 
      <div class="speech-bubble">
      </div>
  </div>
  `;
}

const faces = [];
let id = 0;
for (let i = 0; i < 30; i++) {
  const faceColors = getFaceColors();
  id++;
  const name = "Name: " + id;
  const face = { id, ...faceColors, name };
  faces.push(face);
}

function optimalGrid(n) {
  let nCols = Math.ceil(Math.sqrt(n));
  while (n % nCols !== 0) {
    nCols++;
  }
  let nRows = n / nCols;
  return { nRows, nCols };
}


const width = window.innerWidth;
const { nRows, nCols } = optimalGrid(faces.length);


const w = width / (nCols * 2);
const svgFaces = `<div style="width: ${width}px;">
  ${faces.map((face, i) => createFaceSVG(face, i % nCols, Math.floor(i / nCols))).join('')}
</div>`;

const facesGallery = document.getElementById("face-gallery");
facesGallery.innerHTML = svgFaces;

const elements = Array.from(document.querySelectorAll(".svg-face"));

const wait = () =>
250 + Math.pow(elements.length, 0.75) * 1 * 1000 * Math.random();

elements.forEach((buddy) => {
  let timerId = setTimeout(function tick() {
    buddy.classList.add("wink");
    timerId = setTimeout(tick, wait());
  }, wait());
  buddy.addEventListener("animationend", () => {
    buddy.classList.remove("wink");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const speakingDiv = document.getElementById("1");
    showSpeechBubble(speakingDiv, "Hello, this is a test message!");
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




