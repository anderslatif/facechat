document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('message-input');

    // Continuously focus the input
    input.focus();

    // Refocus the input whenever it loses focus
    input.addEventListener('blur', () => {
        setTimeout(() => {
            input.focus();
        }, 0);
    });
});



function handleEyeMovement(id, clientX, clientY) {
    const face = document.getElementById(id);
    const pupils = face.querySelectorAll('.pupil');
    pupils.forEach(pupil => {
        const rect = pupil.parentElement.getBoundingClientRect();
        const isLeftPupil = pupil.id.includes('left');
        const eyeCenterX = rect.left + (rect.width / 2) + (isLeftPupil ? 20 : -20); // Adjust for pupil position
        const eyeCenterY = rect.top + (rect.height / 2) - 2.5; // Central Y position of eyes
        const dx = clientX - eyeCenterX;
        const dy = clientY - eyeCenterY;
        const angle = Math.atan2(dy, dx);
        const distance = Math.min(3, Math.sqrt(dx * dx + dy * dy) / 10);
        const pupilOffsetX = (isLeftPupil ? 70 : 30) + Math.cos(angle) * distance;
        const pupilOffsetY = 27.5 + Math.sin(angle) * distance;
        pupil.setAttribute('cx', pupilOffsetX);
        pupil.setAttribute('cy', pupilOffsetY);
    });
}

socket.on("receive-id", ({ id }) => {
    myId = id;

    document.addEventListener('mousemove', (event) => {
        const clientX = event.clientX;
        const clientY = event.clientY;
        handleEyeMovement(myId, clientX, clientY);
        socket.emit('client-updates-pupils', { clientX, clientY });
    });

    document.addEventListener("mousedown", () => {
        const face = document.getElementById(myId);
        const isAsleep = face.querySelectorAll(".sleep").length > 0;
        if (isAsleep) {
            return;
        }
        handleWink(myId);
        socket.emit("client-winks", {});
    });

    myFaceSVGContainer = document.getElementById(myId);

    window.addEventListener('blur', (event) => {
        handleSleep(myId);
        socket.emit('client-sleeps', {});
    });
    
    window.addEventListener('focus', (event) => {
        handleWake(myId);
        socket.emit('client-wakes', {});
    });
});

function handleSleep(id) {
    const face = document.getElementById(id);
    const sleepElements = face.querySelectorAll('.sleep-element');
    sleepElements.forEach((sleepElement) => sleepElement.classList.add('sleep'));
}

function handleWake(id) {
    const face = document.getElementById(id);
    const sleepElements = face.querySelectorAll('.sleep-element');
    sleepElements.forEach((sleepElement) => sleepElement.classList.remove('sleep'));
}

socket.on('update-sleep', ({ id }) => {
    handleSleep(id);
});

socket.on('update-wake', ({ id }) => {
    handleWake(id);
});

socket.on('update-pupils', ({ id, clientX, clientY }) => {
    handleEyeMovement(id, clientX, clientY);
});

function handleWink(id) {
    const myFace = document.getElementById(id);
    const faceElements = myFace.querySelectorAll(".svg-face");
    faceElements.forEach((faceElement) => faceElement.classList.add("wink"));
}

socket.on("update-winks", ({ id }) => {
    handleWink(id);
});
