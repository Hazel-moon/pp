// /js/algorithm-game.js (버튼을 직접 드래그하는 구조 + 모바일 대응)

const grid = document.getElementById("grid");
let selectedCell = null;
let isLocked = false;
let angle = 0;
let currentBike = null;

// 격자 생성
document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < 36; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("dragover", (e) => e.preventDefault());
    cell.addEventListener("drop", () => {
      if (isLocked || !currentBike) return;
      placeBikeWithRotation(cell);
    });
    cell.addEventListener("touchend", (e) => {
      if (!currentBike || isLocked) return;
      const rect = cell.getBoundingClientRect();
      const touch = e.changedTouches[0];
      if (touch.clientX >= rect.left && touch.clientX <= rect.right && touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
        placeBikeWithRotation(cell);
      }
    });
    grid.appendChild(cell);
  }

  document.querySelectorAll(".bike_btn img").forEach((img) => {
    img.setAttribute("draggable", true);
    img.addEventListener("dragstart", (e) => {
      const src = img.getAttribute("src");
      const size = img.parentElement.dataset.size;
      const ghostBike = document.createElement("img");
      ghostBike.src = src;
      ghostBike.className = "bike";
      ghostBike.dataset.size = size;
      ghostBike.style.width = `${size * 60}px`;
      document.body.appendChild(ghostBike);
      ghostBike.style.position = "absolute";
      ghostBike.style.left = "-9999px";
      e.dataTransfer.setDragImage(ghostBike, 0, 0);
      currentBike = ghostBike.cloneNode();
      currentBike.setAttribute("draggable", false);
      setTimeout(() => ghostBike.remove(), 0);
    });

    // 모바일 대응: 터치 시 bike 객체 세팅
    img.addEventListener("touchstart", (e) => {
      const src = img.getAttribute("src");
      const size = img.parentElement.dataset.size;
      currentBike = document.createElement("img");
      currentBike.src = src;
      currentBike.className = "bike";
      currentBike.dataset.size = size;
      currentBike.style.width = `${size * 60}px`;
    });
  });
});

function canPlaceBike(startIndex, size, angle) {
  const row = Math.floor(startIndex / 6);
  const col = startIndex % 6;
  let positions = [];

  for (let i = 0; i < size; i++) {
    let index;
    switch (angle) {
      case 0:
        if (col + size > 6) return false;
        index = startIndex + i;
        break;
      case 90:
        if (row + size > 6) return false;
        index = startIndex + i * 6;
        break;
      case 180:
        if (col - (size - 1) < 0) return false;
        index = startIndex - i;
        break;
      case 270:
        if (row - (size - 1) < 0) return false;
        index = startIndex - i * 6;
        break;
      default:
        return false;
    }
    positions.push(index);
  }

  for (let idx of positions) {
    const cell = document.querySelector(`.cell[data-index='${idx}']`);
    if (!cell || cell.children.length > 0) return false;
  }
  return positions;
}

function placeBikeWithRotation(cell) {
  const startIndex = parseInt(cell.dataset.index);
  const size = parseInt(currentBike.dataset.size);
  const possibleAngles = [0, 90, 180, 270];

  for (let ang of possibleAngles) {
    const positions = canPlaceBike(startIndex, size, ang);
    if (positions) {
      angle = ang;
      currentBike.style.transform = `rotate(${angle}deg)`;
      positions.forEach((idx, i) => {
        const targetCell = document.querySelector(`.cell[data-index='${idx}']`);
        if (i === 0) {
          targetCell.innerHTML = "";
          targetCell.appendChild(currentBike);
          selectedCell = targetCell;
        }
      });
      return true;
    }
  }
  return false;
}

function lockPosition() {
  if (!selectedCell || !currentBike) {
    alert("자전거 위치를 먼저 정해주세요.");
    return;
  }
  isLocked = true;
  currentBike.setAttribute("draggable", false);
  alert("위치가 고정되었습니다. 자전거는 앞뒤로만 움직일 수 있습니다.");

  const moveBtns = document.createElement("div");
  moveBtns.className = "btns";
  moveBtns.innerHTML = `
    <button onclick="moveBike(1)">▶ 앞으로</button>
    <button onclick="moveBike(-1)">◀ 뒤로</button>
  `;
  document.querySelector(".bike_list").appendChild(moveBtns);
}

function moveBike(direction) {
  if (!selectedCell || !isLocked || !currentBike) return;
  const currentIndex = parseInt(selectedCell.dataset.index);
  const transform = window.getComputedStyle(currentBike).transform;
  let matrix = new DOMMatrix(transform);
  let rotateDeg = Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI));
  if (rotateDeg < 0) rotateDeg += 360;

  let targetIndex;
  switch (rotateDeg) {
    case 0:
      targetIndex = currentIndex + 1 * direction;
      break;
    case 90:
      targetIndex = currentIndex + 6 * direction;
      break;
    case 180:
      targetIndex = currentIndex - 1 * direction;
      break;
    case 270:
      targetIndex = currentIndex - 6 * direction;
      break;
    default:
      return;
  }

  const targetCell = document.querySelector(`.cell[data-index='${targetIndex}']`);
  if (targetCell && targetCell.children.length === 0) {
    targetCell.innerHTML = "";
    targetCell.appendChild(currentBike);
    selectedCell = targetCell;
  }
}
