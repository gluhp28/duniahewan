// script.js — men-support kuis interaktif & beberapa efek ringan

// ---- KUIS DATA ----
const quizData = [
  {
    q: "Hewan mana yang merupakan primata besar?",
    options: ["Komodo", "Orangutan", "Elang Jawa", "Ikan Paus"],
    a: 1,
    info: "Orangutan adalah primata besar yang hidup di hutan hujan Sumatra dan Kalimantan."
  },
  {
    q: "Manakah hewan yang termasuk dilindungi di Indonesia?",
    options: ["Kucing kampung", "Harimau Sumatra", "Ayam", "Kelinci"],
    a: 1,
    info: "Harimau Sumatra termasuk hewan yang dilindungi karena populasinya yang menurun."
  },
  {
    q: "Komodo dapat ditemukan di pulau mana?",
    options: ["Sumatra", "Komodo/Rinca", "Jawa", "Sulawesi"],
    a: 1,
    info: "Komodo hidup di pulau Komodo, Rinca, Flores (sebagian), dan sekitarnya."
  }
];

// ---- LOGIKA KUIS ----
document.addEventListener('DOMContentLoaded', () => {
  const qNum = document.getElementById('question-number');
  const qText = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const nextBtn = document.getElementById('nextBtn');
  const resetBtn = document.getElementById('resetBtn');
  const resultEl = document.getElementById('result');
  const quizContainer = document.getElementById('quiz-container');
  const scoreEl = document.getElementById('score');
  const explanations = document.getElementById('explanations');
  const retryBtn = document.getElementById('retry');

  let index = 0;
  let answers = [];

  function renderQuestion(){
    const item = quizData[index];
    qNum.textContent = `Soal ${index+1} / ${quizData.length}`;
    qText.textContent = item.q;
    optionsEl.innerHTML = '';
    item.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'opt-btn';
      btn.textContent = opt;
      btn.dataset.idx = i;
      btn.addEventListener('click', () => {
        // pilih satu opsi: highlight
        document.querySelectorAll('#options button').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
      optionsEl.appendChild(btn);
    });
  }

  function showResult(){
    quizContainer.style.display = 'none';
    resultEl.classList.remove('hidden');
    const score = answers.reduce((s, an, i) => s + (an === quizData[i].a ? 1 : 0), 0);
    scoreEl.textContent = `Skor: ${score} / ${quizData.length}`;
    explanations.innerHTML = '';
    quizData.forEach((q, i) => {
      const wrap = document.createElement('div');
      wrap.className = 'explain';
      wrap.style.padding = '10px';
      wrap.style.border = '1px solid #eee';
      wrap.style.borderRadius = '8px';
      wrap.style.marginTop = '8px';
      wrap.innerHTML = `<strong>${q.q}</strong>
        <div>Jawabanmu: <em>${q.options[answers[i]] ?? '—'}</em></div>
        <div>Jawaban benar: <em>${q.options[q.a]}</em></div>
        <div style="margin-top:6px;color:#374151">${q.info}</div>`;
      explanations.appendChild(wrap);
    });
  }

  nextBtn.addEventListener('click', () => {
    const sel = document.querySelector('#options button.selected');
    if(!sel){
      // jika belum pilih, beri animasi 'shake'
      optionsEl.animate([{transform:'translateX(0)'},{transform:'translateX(-8px)'},{transform:'translateX(8px)'},{transform:'translateX(0)'}],{duration:300});
      return;
    }
    answers[index] = Number(sel.dataset.idx);
    // next or finish
    if(index + 1 < quizData.length){
      index++;
      renderQuestion();
      // scroll ke atas kartu
      document.getElementById('quiz-card').scrollIntoView({behavior:'smooth'});
    } else {
      showResult();
    }
  });

  resetBtn.addEventListener('click', () => {
    index = 0; answers = [];
    quizContainer.style.display = 'block';
    resultEl.classList.add('hidden');
    renderQuestion();
  });

  retryBtn && retryBtn.addEventListener('click', () => {
    index = 0; answers = [];
    quizContainer.style.display = 'block';
    resultEl.classList.add('hidden');
    renderQuestion();
    window.scrollTo({top:0, behavior:'smooth'});
  });

  // inisialisasi pertama
  renderQuestion();
});
