function createFaceSVG(face, i, j, w) {
    const { faceColor, eyeColor, mouthColor, browColor, id, nickname } = face;
  
    return ` 
    <div id=${id} class="svg-container">
        <svg  x=${i * w} y=${j * w} class="svg-face" viewBox="-5 -5 110 70" 
            width=${w} height=${w} style="position: relative; z-index: 0;">
            <ellipse cx="50" cy="30" rx="50" ry="50" class="face" fill="${faceColor}" />
            <ellipse cx="30" cy="27.5" rx="10" ry="10" class="eye right-eye sleep-element" fill="white" />
            <ellipse id="pupil-${i}-${j}-right" cx="30" cy="27.5" rx="5" ry="5" class="pupil sleep-element" fill="${eyeColor}" />
            <ellipse cx="70" cy="27.5" rx="10" ry="10" class="eye left-eye sleep-element" fill="white" />
            <ellipse id="pupil-${i}-${j}-left" cx="70" cy="27.5" rx="5" ry="5" class="pupil sleep-element" fill="${eyeColor}" />
            <path d="M30 50 c0 20, 40 20, 40 0" class="mouth sleep-element" fill="${mouthColor}" />
            <path d="M17.5 10 c0 0, 12.5 -6, 25 0" class="eyebrow sleep-element" stroke="${browColor}" stroke-width=5 />
            <path d="M57.5 10 c0 0, 12.5 -6, 25 0" class="eyebrow sleep-element" stroke="${browColor}" stroke-width=5 />
        </svg>
        <div style="font-size: 1em;">${nickname}</div> 
        <div class="speech-bubble">
        </div>
    </div>
    `;
}

function optimalGrid(n) {
    let nCols = Math.ceil(Math.sqrt(n));
    while (n % nCols !== 0) {
      nCols++;
    }
    let nRows = n / nCols;
    return { nRows, nCols };
}

function makeBlink(elements) {
    elements.forEach((face) => {
     
        function scheduleNextBlink() {
            setTimeout(() => {
                // Check right before deciding to blink if the element is asleep
                const isAsleep = face.querySelectorAll(".sleep").length > 0;
                if (!isAsleep) {
                    face.classList.add("wink");
                }
                scheduleNextBlink(); // Continue scheduling blinks regardless
            }, wait());
        }
  
        // Start the initial blinking
        scheduleNextBlink();
  
        face.addEventListener("animationend", () => {
            face.classList.remove("wink");
        });
    });
  
    function wait() {
        return 5000 + Math.pow(elements.length, 0.75) * 1000 * Math.random();
    }
}

  
function toggleMouth(id, duration) {
    const face = document.getElementById(id);
    const mouth = face.querySelector('.mouth');
    let isOpen = false; 
    const intervalTime = 500; 

    const intervalId = setInterval(() => {
        if (isOpen) {
            mouth.setAttribute('d', 'M30 50 c0 10, 40 10, 40 0'); // Slightly closed
        } else {
            mouth.setAttribute('d', 'M30 50 c0 30, 40 30, 40 0'); // Open
        }
        isOpen = !isOpen;
    }, intervalTime);

    setTimeout(() => {
        clearInterval(intervalId);
        // Reset the mouth to a default state
        mouth.setAttribute('d', 'M30 50 c0 20, 40 20, 40 0');
    }, duration);
}