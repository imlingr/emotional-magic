let currentPage = 0;
const totalPages = 14;
const scores = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0 };
const choices = "ABCDEFGH";

const questions = Array(13).fill("😮 當你心情不好時，你通常會做些什麼呢？");

const optionsPerPage = [
  ["🌬️ 深呼吸 / 從1數到10","🍰 吃喜歡的食物","😷 表達身體不舒服","⏸️ 休息一下 / 暫停一下","🎧 聆聽他人的建議","🤐 不說出自己的想法和感受","🛌 什麼都不做 / 一直睡（擺爛）","✖️以上的方式我都很少用"],
  ["🤔 覺察自己是否受非理性想法影響","🎨 做喜歡的事","😢 哭泣 / 流淚","🕰 等一下再說（冷靜後再處理）","🤔 請教他人怎麼做","🙈 隱藏自己的感受","📱 一直一直打遊戲或滑手機 / 作息大亂","✖️以上的方式我都很少用"],
  ["🌷 把注意力放在美好的事物上","💆 捏捏抒壓小物","😭 大哭","🛋️ 找個舒服的地方放鬆一會兒","🗨️ 把心情說出來","😏 假裝不在乎","🚪 把自己一直關在房間","✖️以上的方式我都很少用"],
  ["😄 用幽默看待問題","🎤 唱歌","😡 在心中咒罵對方","🚿 洗個熱水澡","🙏 禱告 / 拜拜 / 祈請靈性力量協助","😓 覺得自己很倒楣","🍔 暴飲暴食 / 不吃不喝","✖️以上的方式我都很少用"],
  ["🧘 練習正念或冥想","🎸 彈奏樂器","💥 在心中想像痛揍對方","💤 好好睡一覺","🐶 跟寵物玩","💭 忍不住一直想一直想","🛒 瘋狂購物","✖️以上的方式我都很少用"],
  ["😂 想好笑的事情","🎨 藝術創作（畫畫等）","🖍️ 亂塗亂畫","🕹️ 玩遊戲（計時小玩一下）","🤗 來一個擁抱","🤦 自責懊惱","🏍️ 超速騎車 / 飆車","✖️以上的方式我都很少用"],
  ["🔄 轉念~轉動想法聚光燈","✍️ 創作（寫文、寫詩、寫歌…）","✂️ 撕紙或剪紙","🎬 看搞笑影片","💬 找好朋友聊一聊","😡 對自己生氣","🚫 做出傷害自己的行為","✖️以上的方式我都很少用"],
  ["🤝 站在對方的立場想一想","🧹 整理東西或房間","⛺️ 打枕頭或打玩偶","🧵 專心做手作","👫 找信任或喜歡的親友陪伴自己","⏰ 之後再說（拖延或逃避）","🙅‍♀️ 不讀不回 / 不想溝通 / 冷戰","✖️以上的方式我都很少用"],
  ["💪 對自己說鼓勵或安慰的話","🧽 大掃除或斷捨離","📝 在紙上寫滿三字經","🚶 一個人出去走一走","🚶‍♂️ 與親友到戶外走走","🙇‍♂️ 我就是爛","🗨️ 發限動抱怨或罵對方","✖️以上的方式我都很少用"],
  ["📓 寫日記","🏃 運動 / 跳舞 / 伸展","😱 找個地方大叫","🗣️ 告知他人自己需要獨處靜一靜","👨‍👩‍👦 向爸媽或照顧者傾訴","🙅 拒絕別人的幫忙","🚮 丟 / 摔 / 打 / 踢東西宣洩","✖️以上的方式我都很少用"],
  ["📚 閱讀","👍 做好事","😤 告訴對方自己很不爽 / 生氣了","🕰️ 默默等待親友來關心","👨‍🏫 尋求老師或大人的幫助","🙅‍♂️ 認為對方應該看出來自己心情不好","🔨 破壞東西","✖️以上的方式我都很少用"],
  ["📝 把想法及心情寫下來","💼 更努力去做 / 去學","✊ 握拳 / 瞪人","📵 暫時關掉手機","👩‍⚕️ 找專業的人幫忙（看醫生、服藥）","😒 認為別人不會了解自己的痛苦","🗣️ 罵人 / 嗆聲","✖️以上的方式我都很少用"],
  ["🔍 尋找解決或改善問題的方法","🦸‍♀️ 正面對決（面對它、處理它）","🚪 甩門離開","🤝 退出吵架中的群組","🧑‍⚕️ 找專業的人幫忙（專輔老師 / 心理師 / 社工師…）","😠 覺得都是別人的錯 / 別人害的","👊 打人 / 教訓對方","✖️以上的方式我都很少用"]
];

function startQuiz() {
  document.querySelector(".homepage").classList.add("hidden");
  document.getElementById("quiz-section").classList.remove("hidden");
  currentPage = 0;
  renderPage();
}

function renderPage() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";

  document.querySelectorAll(".quiz-banner, .progress-bar").forEach(el => el.remove());

  // 顯示進度與橫幅圖
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

    const icon = progress.querySelector("#progress-icon");
    const width = progress.offsetWidth - 28;
    icon.style.left = `${(currentPage / (totalPages - 1)) * width}px`;
  }

  // 題目頁
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
      label.innerHTML = `<input type="checkbox" name="opt" value="${choices[i]}" onchange="limitCheck(this)"> ${text}`;
      wrapper.appendChild(label);
    });

    const btn = document.createElement("button");
    btn.innerText = "下一頁";
    btn.onclick = handleNext;
    wrapper.appendChild(btn);
    container.appendChild(wrapper);

  } else if (currentPage === 13) {
    container.innerHTML = `
      <div class="question-box">
        <h2>📝 請簡單填寫以下資訊：</h2>
        <input type="number" id="age" placeholder="請輸入你的年齡">
        <div>
          <label><input type="radio" name="gender" value="男"> 男</label>
          <label><input type="radio" name="gender" value="女"> 女</label>
          <label><input type="radio" name="gender" value="其他"> 其他 <input type="text" placeholder="補充說明"></label>
        </div>
        <img src="images/去背_魔法寶箱02.png" class="treasure-btn" onclick="showResult()">
      </div>
    `;
  }
}

function limitCheck(checkbox) {
  const checked = document.querySelectorAll('input[name=\"opt\"]:checked');
  if (checked.length > 5) {
    checkbox.checked = false;
    alert(\"最多只能選 5 項喔！\");
  }
}

function handleNext() {
  const selected = Array.from(document.querySelectorAll('input[name=\"opt\"]:checked')).map(c => c.value);
  if (selected.length < 1 || selected.length > 5) {
    alert(\"請選擇最少1項，最多5項！\");
    return;
  }

  selected.forEach(letter => {
    if (letter !== \"H\") scores[letter]++;
  });

  currentPage++;
  renderPage();
}

function showResult() {
  const age = document.getElementById("age")?.value || "";
  const genderInput = document.querySelector('input[name="gender"]:checked');
  const genderText = genderInput ? genderInput.value : "";
  const otherText = genderInput?.value === "其他"
    ? genderInput.parentElement.querySelector("input[type='text']").value
    : "";
  const gender = genderText === "其他" ? `其他：${otherText}` : genderText;

  if (!age || !gender) {
    alert("請填寫年齡與性別");
    return;
  }

  // 統計分數（1~5題為 1分，6~7為2分，H為0分）
  const fullScores = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0 };
  Object.entries(scores).forEach(([key, val]) => {
    fullScores[key] = (["F", "G"].includes(key)) ? val * 2 : val;
  });

  // 排序取前2高
  const sorted = Object.entries(fullScores).sort((a, b) => b[1] - a[1]);
  const topTwo = sorted.slice(0, 2).map(([key]) => key);

  // 顯示雷達圖 + 結果卡
  const container = document.getElementById("quiz-container");
  container.innerHTML = `
    <div class="result-box">
      <h2>✨你的情緒魔法屬性分析✨</h2>
      <canvas id="radarChart" width="300" height="300"></canvas>

      <div class="cards">
        ${topTwo.map(key => `
          <div class="card-block">
            <img src="images/人物卡${key}${角色名稱(key)}.png" class="result-card" />
            <div class="desc-block">${角色說明(key)}</div>
          </div>
        `).join("")}
      </div>

      <textarea id="message" placeholder="🔮簡單說說你的感想，魔法寶庫守護者會認真看哦！（可選填）"></textarea>
      <button onclick="submitToTally('${age}', '${gender}', '${encodeURIComponent(JSON.stringify(fullScores))}')">送出我的魔法結果 ✨</button>
    </div>
  `;

  // 畫圖
  const ctx = document.getElementById('radarChart').getContext('2d');
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ["A", "B", "C", "D", "E", "F", "G"],
      datasets: [{
        label: '屬性分數',
        data: ["A", "B", "C", "D", "E", "F", "G"].map(k => fullScores[k]),
        backgroundColor: "rgba(255, 193, 7, 0.2)",
        borderColor: "#f4b400",
        borderWidth: 2
      }]
    },
    options: {
      scales: { r: { beginAtZero: true, max: 10 } }
    }
  });
}
function 角色名稱(key) {
  return {
    A: "智慧轉念系魔法師",
    B: "活力行動系魔法師",
    C: "火山爆發系魔法師",
    D: "潛水龜龜系魔法師",
    E: "隊友召喚系魔法師",
    F: "地獄思維系黑巫師",
    G: "毀滅宇宙系黑巫師"
  }[key] || "";
}

function 角色說明(key) {
  return {
    A: `<strong>智慧轉念系魔法師 ✨</strong><br>你擅長調整想法與觀點，能用正向思維消除黑暗情緒。請繼續保持你內在的明亮魔力吧！`,
    B: `<strong>活力行動系魔法師 💪</strong><br>你的能量來自動起來的那一刻！無論運動、動手做，或轉移注意力，你總能靠行動來轉換情緒。`,
    C: `<strong>火山爆發系魔法師 🌋</strong><br>你的情緒來得快又猛烈，宣洩對你來說很重要，也代表你真誠地表達內在狀態。學習適度表達，就能更進一步。`,
    D: `<strong>潛水龜龜系魔法師 🐢</strong><br>你習慣獨處整理自己，也常常悶著不說。記得，有時分享情緒可以讓人感到更被理解。`,
    E: `<strong>隊友召喚系魔法師 🤝</strong><br>你會在情緒時刻主動找人支持、尋求幫助。這是勇敢而智慧的表現，請記得，你不孤單。`,
    F: `<strong>地獄思維系黑巫師 🔥</strong><br>你有時會陷入負面迴圈、自責與妄想受害。別忘了世界不一定敵對，停下想法，會看見一線曙光。`,
    G: `<strong>毀滅宇宙系黑巫師 💥</strong><br>你可能用激烈或自傷方式來釋放情緒。別害怕面對情緒的源頭，學會溫柔待自己，也是強大的魔法。`
  }[key] || "";
}
function submitToTally(age, gender, encodedScores) {
  const message = document.getElementById("message").value;
  const formURL = "https://tally.so/r/w82G0o";
  const params = new URLSearchParams();

  params.append("field:age", age);
  params.append("field:gender", gender);
  params.append("field:scores", decodeURIComponent(encodedScores));
  params.append("field:message", message);

  window.open(`${formURL}?${params.toString()}`, "_blank");
}
