const colors = {
    mediumAlmond: "#c79377",
    mediumDeepRose: "#e88c94",
    lightMediumAlmond: "#d9af9e",
    lightMediumRose: "#f3aeb3",
    lightAlmond: "#e6b9b4",
    lightRose: "#fbc7c4",
    lightMediumGolden: "#f2c8a2",
    veryLightAlmond: "#ede6cf",
    lightGolden: "#eddcc5",
    veryLightRose: "#f8e1e2",
    veryLightGolden: "#f0dece",
    deepestAlmond: "#533528",
    extraDeepGolden: "#614430",
    extraDeepRose: "#6d4d4c",
    extraDeepAlmond: "#6e4f45",
    veryDeepAlmond: "#88605f",
    deepGolden: "#8c5b2a",
    mediumDeepGolden: "#a06b4f",
    deepAlmond: "#976a59",
    veryDeepRose: "#906c65",
    deepRose: "#b96e6b",
    mediumDeepAlmond: "#ac8068",
    mediumGolden: "#dda26b"
  };
  

function oneFace(i, j) {
    const faceColor = _.sample(Object.values(colors));
    let browColor = chroma(faceColor).darken(1);
    if (Math.random() < 0.2) {
        browColor = chroma(faceColor).brighten(1);
    }
    let mouthColor = chroma(faceColor).darken(2);

    const eyeColor = "black";

    id++;

    return `
        
    <div id=${id} style="display: inline-block; text-align: center; margin: 10px;">
        <svg  x=${i * w} y=${j * w} class="buddy" viewBox="-5 -5 110 70" 
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
        <div style="font-size: 1em;">Name Here: ${id}</div> 
        <div class="speech-bubble" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: white; z-index: 2; display: none;">
        </div>
    </div>
    `;
}


function toggleOverlay(elementId) {
    const overlay = document.querySelector(`#${elementId} .overlay`);
    overlay.style.display = (overlay.style.display === 'none' || overlay.style.display === '') ? 'block' : 'none';
}


let id = 0;
const width = window.innerWidth - 50;
const nCols = 15;

const w = width / nCols;
const nRows = Math.floor(nCols / 2);
const svgFaces = `<div style="width: ${width}px;">
    ${Array.from({ length: nRows }, (_, j) => Array.from({ length: nCols }, (_, i) => oneFace(i, j))).flat().join('')}
</div>`;

const facesGallery = document.getElementById("face-gallery");
facesGallery.innerHTML = svgFaces;

const elements = Array.from(document.querySelectorAll(".buddy"));

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
// return "// add event listeners for grid of faces";

document.addEventListener('mousemove', function(event) {
    const pupils = document.querySelectorAll('.pupil');
    pupils.forEach(pupil => {
        const rect = pupil.parentElement.getBoundingClientRect();
        const isLeftPupil = pupil.id.includes('left');
        const eyeCenterX = rect.left + (rect.width / 2) + (isLeftPupil ? 20 : -20); // Adjust for pupil position
        const eyeCenterY = rect.top + (rect.height / 2) - 2.5; // Central Y position of eyes
        const dx = event.clientX - eyeCenterX;
        const dy = event.clientY - eyeCenterY;
        const angle = Math.atan2(dy, dx);
        const distance = Math.min(3, Math.sqrt(dx * dx + dy * dy) / 10);
        const pupilOffsetX = (isLeftPupil ? 70 : 30) + Math.cos(angle) * distance;
        const pupilOffsetY = 27.5 + Math.sin(angle) * distance;
        pupil.setAttribute('cx', pupilOffsetX);
        pupil.setAttribute('cy', pupilOffsetY);
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        // todo if the message is empty dont show it
        const message = event.target.value || "This is a test message!";
        event.target.value = "";
        // random from 1 to 40;
        const randomNumber = Math.floor(Math.random() * 40) + 1;
        const speakingDiv = document.getElementById(randomNumber);
        console.log(randomNumber);
        showSpeechBubble(speakingDiv, message);
    }
});

function showSpeechBubble(element, text) {
    const speechBubble = element.querySelector('.speech-bubble');
    speechBubble.textContent = text;
    
    // // Temporarily show the bubble for measurement
    // speechBubble.setAttribute('visibility', 'visible');
    // speechBubble.style.opacity = 1;

    // // Measure text size
    // const rect = bubbleText.getBoundingClientRect();
    // const requiredWidth = Math.min(Math.max(rect.width + 20, 80), 300);  // Ensure bubble is not too narrow or too wide
    // const requiredHeight = Math.max(rect.height, 45);  // Minimum height, adjust if necessary

    // // Adjust width and height of elements
    // bubbleRect.setAttribute('width', requiredWidth);
    // bubbleRect.setAttribute('height', requiredHeight + 10);
    // foreignObject.setAttribute('width', requiredWidth - 10);
    // foreignObject.setAttribute('height', requiredHeight - 10);

    // // Centering the bubble
    // const svgWidth = element.viewBox.baseVal.width;
    // const svgHeight = element.viewBox.baseVal.height;
    // const bubbleX = (svgWidth - requiredWidth) / 2; // Center horizontally
    // const bubbleY = (svgHeight - requiredHeight) / 2; // Center vertically

    // bubbleRect.setAttribute('x', bubbleX);
    // foreignObject.setAttribute('x', bubbleX + 5); // Adjusted for padding within the rect
    // bubbleRect.setAttribute('y', bubbleY);
    // foreignObject.setAttribute('y', bubbleY + 5); // Adjusted for padding within the rect

    // // Hide the bubble after adjusting sizes
    // speechBubble.setAttribute('visibility', 'hidden');
    // speechBubble.style.opacity = 0;

    // setTimeout(() => {
    //     speechBubble.setAttribute('visibility', 'visible');
    //     speechBubble.style.opacity = 1;

    //     const displayTime = Math.max(2000, text.length * 150); // At least 2 seconds, plus more time for longer texts

    //     setTimeout(() => {
    //         speechBubble.style.opacity = 0;
    //         setTimeout(() => speechBubble.setAttribute('visibility', 'hidden'), 500); // Wait for fade out
    //     }, displayTime);
    // }, 100);  
}



document.addEventListener("mousedown", () => {
    const faceElements = Array.from(document.querySelectorAll(".buddy"));
    faceElements.forEach((faceElement) => faceElement.classList.add("wink"));    
});



// const speakingSvg = document.getElementById("10");
// showSpeechBubble(speakingSvg, "Hello, this is a test message! Hello, this is a test message!");

// const speakingSvg2 = document.getElementById("15");
// showSpeechBubble(speakingSvg2, "Hello, this is a test message!");