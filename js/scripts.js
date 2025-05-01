let currentPage = 0;
const totalPages = 14;
const scores = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0 };
const choices = "ABCDEFGH";

const questions = Array(13).fill("😮 當你心情不好時，你通常會做些什麼呢？");
const optionsPerPage = [...]; // ← ← ← 貼上你 13 頁的選項陣列

function startQuiz() {
  document.querySelector(".homepage").classList.add("hidden");
  document.getElementById("quiz-section").classList.remove("hidden");
  currentPage = 0;
  renderPage();
}

function renderPage() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";

  // 清空橫幅圖與進度條（避免重複插入）
  document.querySelectorAll(".quiz-banner, .progress-bar").forEach(el => el.remove());

  // 顯示合照圖與進度條（頁1～14）
  if (currentPage < totalPages) {
    const banner = document.createElement("img");
    banner.src = "images/合照有景_大圖1.png";
    banner.className = "quiz-banner";
    document.getElementById("quiz-section").prepend(banner);

    const progress = document.createElement("div");
    progress.className = "progress-bar";
    progress.innerHTML = `
      <div class="progress-track"></div>
      <img src="images/魔法元素_牛皮色牌卡.png" id="progress-icon" class="progress-icon" />
    `;
    document.getElementById("quiz-section").insertBefore(progress, container);

    // 進度圖移動
    const progressIcon = progress.querySelector("#progress-icon");
    const segment = (progress.offsetWidth - 28) / (totalPages - 1);
    progressIcon.style.left = `${segment * currentPage}px`;
  }

  // 題目頁 1～13
  if (currentPage < 13) {
    const wrapper = document.createElement("div");
    wrapper.className = "question-box";

    wrapper.innerHTML = `
      <h2>${questions[currentPage]}</h2>
      <span class="note">（複選：最少1項，最多5項）</span>
    `;

    optionsPerPage[currentPage].forEach((text, i) => {
      const label = document.createElement("label");
      label.className = "option-item";
      label.innerHTML = `
        <input type="checkbox" name="opt" value="${choices[i]}" onchange="limitCheck(this)"> ${text}
      `;
      wrapper.appendChild(label);
    });

    const btn = document.createElement("button");
    btn.innerText = "下一頁";
    btn.onclick = () => handleNext();
    wrapper.appendChild(btn);
    container.appendChild(wrapper);

  } else if (currentPage === 13) {
    // 第14頁：資訊頁
    container.innerHTML = `
      <div class="question-box">
        <h2>📝 在揭曉結果前，請填寫以下資訊：</h2>
        <input type="number" id="age" placeholder="請輸入你的年齡">
        <input type="text" id="gender" placeholder="請輸入你的性別（男 / 女 / 其他）">
        <img src="images/去背_魔法寶箱02.png" class="treasure-btn" onclick="showResult()" />
      </div>
    `;
  }
}

function limitCheck(checkbox) {
  const checked = document.querySelectorAll('input[name="opt"]:checked');
  if (checked.length > 5) {
    checkbox.checked = false;
    alert("最多只能選 5 項喔！");
  }
}

function handleNext() {
  const selected = Array.from(document.querySelectorAll('input[name="opt"]:checked')).map(c => c.value);
  if (selected.length < 1 || selected.length > 5) {
    alert("請選擇最少1項，最多5項！");
    return;
  }
  selected.forEach(letter => {
    if (letter !== "H") scores[letter]++;
  });

  currentPage++;
  renderPage();
}

function showResult() {
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  if (!age || !gender) {
    alert("請填寫年齡與性別");
    return;
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topTwo = sorted.slice(0, 2).map(([key]) => key);

  const container = document.getElementById("quiz-container");
  container.innerHTML = `
    <div class="result-box">
      <h2>✨測驗完成！</h2>
      <p>你的年齡：${age}</p>
      <p>你的性別：${gender}</p>
      <p>你的情緒魔法屬性是：<strong>${topTwo.join("＋")}</strong></p>
      <p>🎀歡迎在頁尾留下你的心得回饋！</p>
    </div>
  `;
}
