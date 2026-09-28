let grid;
let isLocked = false;
let bikeCounter = 0;
let redBike = null; // 초기 자전거
let redBikePositions = [13, 14]; // 초기 위치 (1인용 자전거)

window.addEventListener("DOMContentLoaded", () => {
  grid = document.getElementById("grid");

  // 1. 격자 만들기
  for (let i = 0; i < 36; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.dataset.occupied = "false";
    grid.appendChild(cell);
  }

  // 2. 빨간 자전거 초기 배치 (1인용)
  redBike = document.createElement("img");
  redBike.src = "./img/bike_red1.png";
  redBike.className = "bike";
  redBike.dataset.size = "2";
  redBike.dataset.bikeId = "red-bike";
  redBike.setAttribute("draggable", false);
  redBike.style.width = `${60 * 2}px`;
  redBike.style.transform = "rotate(0deg)";

  redBikePositions.forEach((idx, i) => {
    const cell = document.querySelector(`.cell[data-index="${idx}"]`);
    if (cell) {
      cell.innerHTML = "";
      if (i === 0) {
        cell.appendChild(redBike);
      } else {
        const shadow = document.createElement("div");
        shadow.className = "bike-shadow";
        cell.appendChild(shadow);
      }
      cell.dataset.occupied = "true";
      cell.dataset.bikeId = "red-bike";
    }
  });

  // 3. 드래그 가능한 자전거 버튼 처리
  document.querySelectorAll(".bike_btn img").forEach((img) => {
    const bikeId = `bike-${bikeCounter++}`;
    img.setAttribute("draggable", true);
    img.dataset.bikeId = bikeId;

    img.addEventListener("dragstart", (e) => {
      const src = img.getAttribute("src");
      const size = img.parentElement.dataset.size;
      e.dataTransfer.setData("bike-id", bikeId);
      e.dataTransfer.setData("bike-src", src);
      e.dataTransfer.setData("bike-size", size);

      const ghost = img.cloneNode();
      ghost.style.position = "absolute";
      ghost.style.left = "-9999px";
      ghost.style.width = `${size * 60}px`;
      document.body.appendChild(ghost);
      e.dataTransfer.setDragImage(ghost, 0, 0);
      setTimeout(() => ghost.remove(), 0);
    });
  });

  // 4. 각 셀에 드롭 이벤트
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("dragover", (e) => {
      if (!isLocked) e.preventDefault();
    });

    cell.addEventListener("drop", (e) => {
      if (isLocked) return;

      e.preventDefault();
      const bikeId = e.dataTransfer.getData("bike-id");
      const size = e.dataTransfer.getData("bike-size");
      const src = e.dataTransfer.getData("bike-src");
      const bike = document.querySelector(`img[data-bike-id='${bikeId}']`);
      if (!bike) return;

      const tempBike = document.createElement("img");
      tempBike.src = src;
      tempBike.className = "bike";
      tempBike.dataset.size = size;
      tempBike.dataset.bikeId = bikeId;
      tempBike.style.width = `${size * 60}px`;
      tempBike.setAttribute("draggable", false);

      const success = placeBikeWithRotation(cell, tempBike);

      if (success) {
        const btn = bike.closest(".bike_btn");
        if (btn) btn.innerHTML = ""; // 제거
      }
    });
  });

  // 5. 위치 정하기 완료 버튼
  const doneBtn = document.querySelector(".btn_done");
  if (doneBtn) {
    doneBtn.addEventListener("click", () => {
      isLocked = true;
      document.querySelectorAll(".bike").forEach((bike) => {
        bike.setAttribute("draggable", false);
      });
      alert("자전거가 고정되었습니다. 이제 빨간 자전거를 출구로 이동해보세요!");

      // 이동 버튼 추가
      const moveBtns = document.createElement("div");
      moveBtns.className = "btns";
      moveBtns.innerHTML = `
        <button onclick="moveRedBike(1)">▶ 앞으로</button>
        <button onclick="moveRedBike(-1)">◀ 뒤로</button>
      `;
      document.querySelector(".bike_list").appendChild(moveBtns);
    });
  }
});

function clearBikeShadow(bikeId) {
  document.querySelectorAll(".cell").forEach((cell) => {
    if (cell.dataset.bikeId === bikeId) {
      cell.dataset.occupied = "false";
      cell.removeAttribute("data-bike-id");
      cell.innerHTML = "";
    }
  });
}

function placeBikeWithRotation(cell, bike) {
  const startIndex = parseInt(cell.dataset.index);
  const size = parseInt(bike.dataset.size);
  const angles = [0, 270];
  const bikeId = bike.dataset.bikeId;

  for (let a of angles) {
    const positions = canPlaceBike(startIndex, size, a);
    if (positions) {
      clearBikeShadow(bikeId);
      bike.style.transform = `rotate(${a}deg)`;

      positions.forEach((idx, i) => {
        const targetCell = document.querySelector(`.cell[data-index='${idx}']`);
        if (i === 0) {
          targetCell.innerHTML = "";
          targetCell.appendChild(bike);
        } else {
          const shadow = document.createElement("div");
          shadow.className = "bike-shadow";
          targetCell.innerHTML = "";
          targetCell.appendChild(shadow);
        }

        targetCell.dataset.occupied = "true";
        targetCell.dataset.bikeId = bikeId;
      });

      return true;
    }
  }

  return false;
}

function canPlaceBike(startIndex, size, angle) {
  const row = Math.floor(startIndex / 6);
  const col = startIndex % 6;
  const positions = [];

  for (let i = 0; i < size; i++) {
    let idx;
    switch (angle) {
      case 0:
        if (col + size > 6) return false;
        idx = startIndex + i;
        break;
      case 270:
        if (row - (size - 1) < 0) return false;
        idx = startIndex - i * 6;
        break;
      default:
        return false;
    }

    const cell = document.querySelector(`.cell[data-index='${idx}']`);
    if (!cell || cell.dataset.occupied === "true") return false;
    positions.push(idx);
  }

  return positions;
}

function moveRedBike(direction) {
  if (!redBike || !isLocked) return;

  const currentIndex = parseInt(redBike.closest(".cell").dataset.index);
  const size = parseInt(redBike.dataset.size);

  let newIndexes = [];
  for (let i = 0; i < size; i++) {
    const idx = currentIndex + direction * i;
    if (idx < 0 || idx >= 36) return;
    const cell = document.querySelector(`.cell[data-index='${idx}']`);
    if (!cell || (cell.dataset.occupied === "true" && cell.dataset.bikeId !== "red-bike")) return;
    newIndexes.push(idx);
  }

  clearBikeShadow("red-bike");

  newIndexes.forEach((idx, i) => {
    const targetCell = document.querySelector(`.cell[data-index='${idx}']`);
    targetCell.innerHTML = "";
    if (i === 0) {
      targetCell.appendChild(redBike);
    } else {
      const shadow = document.createElement("div");
      shadow.className = "bike-shadow";
      targetCell.appendChild(shadow);
    }
    targetCell.dataset.occupied = "true";
    targetCell.dataset.bikeId = "red-bike";
  });

  if (newIndexes.includes(18)) {
    alert("출구에 도달했습니다! 🎉");
  }
}
