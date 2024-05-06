function createSquares(n) {
  const container = document.getElementById('grid-container');
  container.innerHTML = ''; // Clear the container first

  for (let i = 0; i < n; i++) {
      const square = document.createElement('div');
      square.className = 'grid-square';
      square.style.backgroundColor = getRandomColor();
      container.appendChild(square);
  }
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

window.addEventListener('resize', () => createSquares(16));
createSquares(23); // Create 16 squares initially
