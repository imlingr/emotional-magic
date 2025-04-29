function startQuiz() {
  document.querySelector('.container').classList.add('hidden');
  document.getElementById('quiz-container').classList.remove('hidden');
  loadQuestions();
}

const questions = [
  "🤔 當你心情不好時，你通常會做些什麼呢？（複選：最少1項，最多5項）",
  "😟 面對挫折時，你的第一反應通常是？",
  "😢 難過時，你會傾向採取哪些行動？",
  "😡 生氣的時候，你最常做什麼？",
  "😰 壓力大時，你習慣的紓壓方式是？",
  "🥺 感覺無助的時候，你的應對行為是？",
  "😣 當你覺得一切都很煩時，你會？",
  "😭 感到被誤解時，你通常會？",
  "😞 心情低落時，你傾向？",
  "😤 被批評時，你的第一個行為是？",
  "😶 心情很悶的時候，你的行動？",
  "😔 情緒崩潰邊緣時，你會？",
  "😩 極度失望時，你的習慣行為？"
];

let currentQuestion = 0;

function loadQuestions() {
  const container = document.getElementById('quiz-container');
  container.innerHTML = `
    <h2>${questions[currentQuestion]}</h2>
    <div>
      <label><input type="checkbox"> 聯絡朋友傾訴</label><br>
      <label><input type="checkbox"> 狂吃狂睡或暴玩</label><br>
      <label><input type="checkbox"> 瘋狂購物/滑手機</label><br>
      <label><input type="checkbox"> 獨自流淚或發呆</label><br>
      <label><input type="checkbox"> 尋求老師、心理師協助</label><br>
      <label><input type="checkbox"> 用寫作、畫畫紓壓</label><br>
      <label><input type="checkbox"> 大吼大叫、摔東西</label><br>
      <label><input type="checkbox"> 運動、散步、做家事</label><br>
    </div>
    <button onclick="nextQuestion()">下一頁</button>
  `;
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    showResult();
  } else {
    loadQuestions();
  }
}

function showResult() {
  document.getElementById('quiz-container').classList.add('hidden');
  document.getElementById('result-container').classList.remove('hidden');
  document.getElementById('result-container').innerHTML = `
    <h2>✨恭喜你完成了情緒魔法寶庫探索✨</h2>
    <p>你的情緒魔法屬性是：「智慧轉念系＋活力行動系」（範例展示）</p>
    <p>🎀別忘了寫下你的感受，或給守護者回信喔！</p>
  `;
}
