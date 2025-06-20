const canvas = document.getElementById('postcardCanvas');
const ctx = canvas.getContext('2d');
const input = document.getElementById('photoInput');
const nextButton = document.getElementById('nextButton');
const logo = new Image();
logo.src = 'img/turiec_logo.png';

let img = null;
let scale = 1;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let startX, startY;

input.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      img = new Image();
      img.onload = () => {
        offsetX = 0;
        offsetY = 0;
        scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        drawCanvas();
        nextButton.style.display = 'inline-block';
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

function drawCanvas() {
  if (!img) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const drawWidth = img.width * scale;
  const drawHeight = img.height * scale;
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

  if (logo.complete) {
    const logoWidth = 100;
    const logoHeight = logo.height * (logoWidth / logo.width);
    ctx.drawImage(logo, canvas.width - logoWidth - 10, canvas.height - logoHeight - 10, logoWidth, logoHeight);
  }

  ctx.lineWidth = 10;
  ctx.strokeStyle = "white";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.offsetX;
  startY = e.offsetY;
  canvas.style.cursor = 'grabbing';
});

canvas.addEventListener('mousemove', (e) => {
  if (!isDragging || !img) return;
  offsetX += e.offsetX - startX;
  offsetY += e.offsetY - startY;
  startX = e.offsetX;
  startY = e.offsetY;
  drawCanvas();
});

canvas.addEventListener('mouseup', () => {
  isDragging = false;
  canvas.style.cursor = 'grab';
});

canvas.addEventListener('wheel', (e) => {
  if (!img) return;
  e.preventDefault();
  const delta = e.deltaY < 0 ? 1.05 : 0.95;
  scale *= delta;
  drawCanvas();
});

nextButton.addEventListener('click', () => {
  alert("Pokračujeme na zadnú stranu pohľadnice.");
});
