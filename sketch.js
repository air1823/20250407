let circles = []; // 儲存圓形的陣列
let stars = []; // 儲存星星的陣列
let hearts = []; // 儲存愛心的陣列
let showMenu = false; // 控制選單顯示的布林值
let showSubMenu = false; // 控制子選單顯示的布林值
let iframe; // 用於顯示內容的 iframe

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke(); // 移除圓形邊框

  // 初始化圓形
  for (let i = 0; i < 20; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      size: random(20, 50),
      color: color(random(200, 255), random(200, 255), random(200, 255)), // 馬卡龍色系
      speedX: random(-1, 1), // 慢速 X 移動
      speedY: random(-1, 1)  // 慢速 Y 移動
    });
  }

  // 初始化星星
  for (let i = 0; i < 50; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(5, 15),
      color: color(255, 255, random(200, 255)) // 柔和的藍白色
    });
  }

  // 初始化愛心
  for (let i = 0; i < 30; i++) {
    hearts.push({
      x: random(width),
      y: random(height),
      size: random(10, 20),
      color: color(random(255), random(150, 200), random(150, 200)) // 粉紅色系
    });
  }

  // 初始化 iframe
  iframe = createElement('iframe');
  iframe.position(50, height / 3); // 將 iframe 放置在畫布下方，距離邊框至少 50
  iframe.size(width - 100, height * 2 / 3 - 50); // 縮小 iframe，距離邊框至少 50
  iframe.hide(); // 預設隱藏 iframe
}

function draw() {
  background(240, 230, 220); // 柔和背景色

  // 繪製星星
  for (let star of stars) {
    fill(star.color);
    noStroke();
    ellipse(star.x, star.y, star.size); // 繪製星星
  }

  // 繪製愛心
  for (let heart of hearts) {
    fill(heart.color);
    noStroke();
    drawHeart(heart.x, heart.y, heart.size); // 繪製愛心
  }

  // 更新並繪製圓形
  for (let circle of circles) {
    circle.x += circle.speedX;
    circle.y += circle.speedY;

    // 邊界檢查，讓圓形反彈
    if (circle.x < 0 || circle.x > width) circle.speedX *= -1;
    if (circle.y < 0 || circle.y > height) circle.speedY *= -1;

    // 根據滑鼠 X 座標調整大小
    circle.size = map(mouseX, 0, width, 10, 100);

    fill(circle.color); // 設定馬卡龍色
    ellipse(circle.x, circle.y, circle.size); // 繪製圓形
  }

  // 檢查滑鼠是否在畫面上半部的三分之一處
  if (mouseY < height / 3) {
    showMenu = true;
  } else {
    showMenu = false;
    showSubMenu = false; // 當主選單隱藏時，隱藏子選單
  }

  // 顯示選單
  if (showMenu) {
    drawMenu();
  }
}

function drawMenu() {
  // 選單樣式
  let menuItems = ["首頁", "自我介紹", "作品", "測驗卷", "教學影片"];
  let menuX = 20; // 選單起始位置
  let menuY = 20;
  let itemWidth = 120; // 縮小選項寬度
  let itemHeight = 40; // 縮小選項高度

  for (let i = 0; i < menuItems.length; i++) {
    let itemX = menuX + i * (itemWidth + 10); // 橫向排列
    let itemY = menuY;

    // 檢查滑鼠是否在選單項目上
    let isHovered = mouseX > itemX && mouseX < itemX + itemWidth && mouseY > itemY && mouseY < itemY + itemHeight;

    // 設定選單樣式
    fill(isHovered ? color("#ffafcc") : color("#bde0fe")); // 背景顏色
    stroke(isHovered ? color("#ffafcc") : color("#333333")); // 邊框顏色
    strokeWeight(2);
    rect(itemX, itemY, itemWidth, itemHeight, 10); // 圓角矩形

    // 設定文字樣式
    fill("#52796f");
    noStroke();
    textSize(20); // 縮小文字大小
    textAlign(CENTER, CENTER);
    text(menuItems[i], itemX + itemWidth / 2, itemY + itemHeight / 2); // 文字置中

    // 滑鼠移到「作品」選項附近時顯示子選單
    if (isHovered && menuItems[i] === "作品") {
      showSubMenu = true;
    }

    if (isHovered && mouseIsPressed) {
      if (menuItems[i] === "首頁") {
        iframe.hide(); // 隱藏 iframe
      } else if (menuItems[i] === "測驗卷") {
        iframe.attribute('src', 'https://air1823.github.io/math/');
        iframe.show();
      }
    }
  }

  // 顯示子選單
  if (showSubMenu) {
    drawSubMenu(menuX + 2 * (itemWidth + 10), menuY + itemHeight + 20); // 子選單位置
  }
}

function drawSubMenu(x, y) {
  // 子選單樣式
  let subMenuItems = ["第一周作業", "第二周作業", "第三周作業", "第四周作業"];
  let itemWidth = 120; // 縮小選項寬度
  let itemHeight = 40; // 縮小選項高度

  for (let i = 0; i < subMenuItems.length; i++) {
    let itemX = x;
    let itemY = y + i * (itemHeight + 10); // 垂直排列

    // 檢查滑鼠是否在子選單項目上
    let isHovered = mouseX > itemX && mouseX < itemX + itemWidth && mouseY > itemY && mouseY < itemY + itemHeight;

    // 設定子選單樣式
    fill(isHovered ? color("#ffafcc") : color("#bde0fe")); // 背景顏色
    stroke(isHovered ? color("#ffafcc") : color("#333333")); // 邊框顏色
    strokeWeight(2);
    rect(itemX, itemY, itemWidth, itemHeight, 10); // 圓角矩形

    // 設定文字樣式
    fill("#52796f");
    noStroke();
    textSize(20); // 縮小文字大小
    textAlign(CENTER, CENTER);
    text(subMenuItems[i], itemX + itemWidth / 2, itemY + itemHeight / 2); // 文字置中

    if (isHovered && mouseIsPressed) {
      if (subMenuItems[i] === "第一周作業") {
        iframe.attribute('src', 'https://air1823.github.io/20250303/');
        iframe.show();
      } else if (subMenuItems[i] === "第二周作業") {
        iframe.attribute('src', 'https://air1823.github.io/20250314/');
        iframe.show();
      } else if (subMenuItems[i] === "第三周作業") {
        iframe.attribute('src', 'https://air1823.github.io/20250317/');
        iframe.show();
      } else if (subMenuItems[i] === "第四周作業") {
        iframe.attribute('src', 'https://air1823.github.io/20250324/');
        iframe.show();
      }
    }
  }
}

function drawHeart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}
