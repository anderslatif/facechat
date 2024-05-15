const defaultFaceColors = {
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

function randomizeChoices() {
    const faceColorInput = document.getElementById('face-color');
    const eyeColorInput = document.getElementById('eye-color');
    const browColorInput = document.getElementById('brow-color');
    const mouthColorInput = document.getElementById('mouth-color');
    
    const faceColor = defaultFaceColors[Object.keys(defaultFaceColors)[Math.floor(Math.random() * Object.keys(defaultFaceColors).length)]];
    const eyeColors = [
        /* Brown */ "#6f4e37",
        /* Dark Brown */ "#3D2B1F",
        /* Green */ "#0f9e12",
        /* Blue */ "#0000ff",
        /* Black */ "#000000",
        /* Black */ "#000000",
    ];
    const eyeColor = eyeColors[Math.floor(Math.random() * eyeColors.length)];
    // random numbers between -2 and 2
    const browColor = chroma(faceColor).darken(Math.random() * 4 - 1);
    const mouthColor = chroma(faceColor).brighten(Math.random() * 4 - 1);


    faceColorInput.value = faceColor;
    eyeColorInput.value = eyeColors[Math.floor(Math.random() * eyeColors.length)];
    browColorInput.value = browColor;
    mouthColorInput.value =  mouthColor;

    redrawFaceOnPage();
}


function createFaceSVG() {
    const faceColor = document.getElementById('face-color').value;
    const eyeColor = document.getElementById('eye-color').value;
    const browColor = document.getElementById('brow-color').value;
    const mouthColor = document.getElementById('mouth-color').value;

return `
    <svg class="face-svg" viewBox="-5 -5 110 70" 
                        width=${100} height=${100} style="position: relative; z-index: 1;">
        <ellipse cx="50" cy="30" rx="50" ry="50" class="face" fill="${faceColor}" />
        <ellipse cx="30" cy="27.5" rx="10" ry="10" class="eye right-eye" fill="white" />
        <ellipse id="pupil-${1}-${2}-right" cx="30" cy="27.5" rx="5" ry="5" class="pupil" fill="${eyeColor}" />
        <ellipse cx="70" cy="27.5" rx="10" ry="10" class="eye left-eye" fill="white" />
        <ellipse id="pupil-${1}-${2}-left" cx="70" cy="27.5" rx="5" ry="5" class="pupil" fill="${eyeColor}" />
        <path d="M30 50 c0 20, 40 20, 40 0" class="mouth" fill="${mouthColor}" />
        <path d="M17.5 10 c0 0, 12.5 -6, 25 0" class="eyebrow" stroke="${browColor}" stroke-width=6 />
        <path d="M57.5 10 c0 0, 12.5 -6, 25 0" class="eyebrow" stroke="${browColor}" stroke-width=6 />        
    </svg>
`;
}

function redrawFaceOnPage() {
    const faceSVG = createFaceSVG();
    document.getElementById('face').innerHTML = faceSVG;
}

function redrawNicknameTagOnPage() {
  const name = document.getElementById('nickname-input').value || "Anonymous";
    if (name.length > 16) {
        alert('Name must be less than 16 characters');
        return;
    }
  document.getElementById('nickname-tag').textContent = name;
}

randomizeChoices();
redrawNicknameTagOnPage();
