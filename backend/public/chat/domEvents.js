document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('message-textarea');

    // Continuously focus the input
    input.focus();

    // Refocus the input whenever it loses focus
    input.addEventListener('blur', () => {
        setTimeout(() => {
            input.focus();
        }, 0);
    });
});

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

document.addEventListener("mousedown", () => {
    const faceElements = Array.from(document.querySelectorAll(".svg-face"));
    faceElements.forEach((faceElement) => faceElement.classList.add("wink"));    
});

