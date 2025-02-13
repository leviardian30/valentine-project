const btnYes = document.getElementById("btnYes");
const btnNo = document.getElementById("btnNo");
const message = document.getElementById("message");
const heartsContainer = document.getElementById("hearts");
let clickCount = 0;
let btnYesSize = 1;
let btnNoSize = 1;

btnYes.addEventListener("click", () => {
  startLoveQuestionnaire();
});

async function startLoveQuestionnaire() {
  try {
    // Pertanyaan 1
    const name =
      prompt("Sebelum buka hadiah... Siapa nama kamu? 😊") || "Sayangku";

    // Pertanyaan 2
    const answer1 =
      prompt(
        `${name}, kamu siap menerima cintaku? 💖\n(Jawab 'iya' atau 'siap')`
      ) || "iya";

    // Pertanyaan 3
    const answer2 =
      prompt(
        "Kapan terakhir kali kamu tersenyum karena memikirkan aku? 😊\n(Contoh: tadi pagi, kemarin, atau jawab 'baru sekarang')"
      ) || "baru sekarang";

    // Pertanyaan 4
    const answer3 =
      prompt("Apa warna favorit kamu? 🌈\n(Akan aku jadikan warna khusus!)") ||
      "merah muda";

    showFinalMessage(name, answer2, answer3.toLowerCase());
    createHearts();
  } catch {
    alert("Wah kok dibatalin 😢 Tapi gapapa, tetap buat kamu!");
    message.style.display = "block";
  }
}

function showFinalMessage(name, moment, color) {
  message.innerHTML = `
                <h2 class="typing-effect">💌 Surat Cinta Untuk ${name} 💌</h2>
                <div style="color: ${color}; transition: all 0.5s ease;">
                    <p>Haloo ${name}! 💖</p>
                    <p>Terimakasih masih selalu tersenyum dari dulu hingga ${moment},<br/>
                    Aku selalu senang melihatamu tersenyum 🌸</p>
                    <p>Aku hanya ingin mengatakan</p>
                    <div class="love-questions">
                    <h3>Kamu, Alasanku Tersenyum 💖✨</h3>
                    <p>Sejak ada kamu di sisiku, </p> 
                    p>hidup terasa lebih seru! 😆🎉 </p>  
                    p>Dulu aku biasa saja,  </p> 
                    p>sekarang lebih ceria. 😍💫 </p>  
                    br>
                    p>Kamu ajarkan arti bahagia,  </p> 
                    p>bukan sekadar kata, tapi nyata. 💕😊  </p> 
                    p>Denganmu, semua terasa ringan,  </p> 
                    p>hari-hari penuh warna dan senyuman. 🌈😄  </p> 
                    br>
                    p>Di hari Valentine ini, 💌🍫  </p> 
                    p>tak perlu cokelat atau puisi.  </p> 
                    p>Cukup kamu di sini,  </p> 
                    p>itu sudah lebih dari mimpi! 💖✨</p> 
                    </div>
                    <p>Terserah kamu yang pilih, yang penting...<br>
                    <span style="font-size: 1.2em;">JANGAN PILIH ORANG LAIN! 😘</span></p>
                    <p>💝 Dari yang selalu mencintaimu 💝</p>
                </div>
            `;
  message.style.display = "block";
  message.style.animation = "bounce 1s ease";
  btnYes.style.display = "none";
  btnNo.style.display = "none";

  // Tambahkan efek ketik setelah 1 detik
  setTimeout(() => {
    const typingElement = document.querySelector(".typing-effect");
    if (typingElement) {
      typingElement.style.animation = "none";
      typingElement.style.borderRight = "none";
    }
  }, 2000);
}
btnYes.addEventListener("click", () => {
  message.style.display = "block";
  btnYes.style.display = "none";
  btnNo.style.display = "none";
  createHearts();
});

btnNo.addEventListener("click", () => {
  clickCount++;
  btnYesSize += 0.2;
  btnNoSize -= 0.2;

  btnYes.style.transform = `scale(${btnYesSize})`;
  btnNo.style.transform = `scale(${Math.max(btnNoSize, 0.5)})`;

  if (clickCount === 3) {
    alert("Hihihi... Gabisa ditolak begitu ajaaa~ 😜");
  }
  if (clickCount === 5) {
    alert("Pokoknya harus diterima! 😘");
    btnYes.click();
  }
});

function createHearts() {
  for (let i = 0; i < 50; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDelay = Math.random() * 2 + "s";
    heartsContainer.appendChild(heart);
  }
}

let currentQuestion = 0;
const questions = [
  {
    text: "Sebelum buka hadiah... Siapa nama kamu? 😊",
    placeholder: "Masukkan nama kamu di sini...",
    emoji: "💖",
  },
  {
    text: "Kamu siap menerima Hadiahnya 💖",
    placeholder: "Tulis 'siap' atau 'iya'...",
    emoji: "💌",
  },
  {
    text: "Kapan terakhir kali kamu tersenyum? 😊",
    placeholder: "Contoh: tadi pagi, kemarin...",
    emoji: "😊",
  },
  {
    text: "Apa warna favorit kamu? 🌈",
    placeholder: "Akan aku jadikan warna khusus!",
    emoji: "🎨",
  },
];

async function startLoveQuestionnaire() {
  btnYes.disabled = true;
  btnNo.disabled = true;
  showQuestionModal(currentQuestion);
}

function showQuestionModal(index) {
  const modal = document.getElementById("customModal");
  const overlay = document.getElementById("modalOverlay");
  const content = document.getElementById("modalContent");
  const q = questions[index];

  content.innerHTML = `
                <h3 style="color: #ff3385;">${q.emoji} ${q.text}</h3>
                <input type="text" id="modalInput" placeholder="${q.placeholder}">
                <div style="margin-top: 20px;">
                    <button onclick="handleModalResponse(${index})">Kirim Jawaban 💘</button>
                </div>
            `;

  modal.style.display = "block";
  overlay.style.display = "block";

  // Tambahkan efek emoji
  createEmojiEffect(q.emoji);
}

function createEmojiEffect(emoji) {
  const effect = document.createElement("div");
  effect.className = "emoji-effect";
  effect.textContent = emoji;
  effect.style.left = Math.random() * 90 + "%";
  document.body.appendChild(effect);

  setTimeout(() => {
    effect.remove();
  }, 3000);
}

function handleModalResponse(index) {
  const input = document.getElementById("modalInput").value;
  const modal = document.getElementById("customModal");
  const overlay = document.getElementById("modalOverlay");

  if (!input.trim()) {
    alertCustom("Wah harus diisi dong! 😢");
    return;
  }

  // Simpan jawaban
  questions[index].answer = input;

  modal.style.display = "none";
  overlay.style.display = "none";

  if (index < questions.length - 1) {
    currentQuestion++;
    setTimeout(() => showQuestionModal(currentQuestion), 500);
  } else {
    showFinalMessage();
  }
}

function alertCustom(message) {
  const modal = document.getElementById("customModal");
  const content = document.getElementById("modalContent");

  content.innerHTML = `
                <h3 style="color: #ff3385;">⚠️ ${message}</h3>
                <button onclick="showQuestionModal(currentQuestion)">Oke, Saya Isi 😊</button>
            `;
  modal.style.display = "block";
}
function showGallery() {
  document.getElementById("gallery").classList.add("show-gallery");
  setTimeout(() => {
    window.scrollTo({
      top: document.getElementById("gallery").offsetTop - 50,
      behavior: "smooth",
    });
  }, 300);
}

function openModal(src) {
  const modal = document.getElementById("photoModal");
  const modalImg = document.getElementById("modalImg");
  modal.style.display = "flex";
  modalImg.src = src;
}

function closeModal() {
  document.getElementById("photoModal").style.display = "none";
}

function showGallery() {
  // Animasi tombol saat diklik
  const btn = document.querySelector(".gallery-trigger");
  btn.style.transform = "scale(0.95)";
  setTimeout(() => {
    btn.style.transform = "scale(1)";
  }, 200);

  // Tampilkan galeri
  document.getElementById("gallery").classList.add("show-gallery");

  // Tambahkan efek hujan hati
  createHearts();

  // Scroll halus ke galeri
  setTimeout(() => {
    document.getElementById("gallery").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 300);
}

// Modifikasi fungsi showFinalMessage
function showFinalMessage() {
  const answers = questions.map((q) => q.answer || "(Kosong)");
  message.innerHTML = `
                <h2 class="typing-effect">💌 Surat Spesial Untuk  ${
                  answers[0] || "Sayangku"
                }💌</h2>
                <div style="color: ${
                  answers[3] || "#ff3385"
                }; transition: all 0.5s ease;">
                    <p>Haloo ${answers[0] || "Sayangku"}! 💖</p>
                    <p>Terimakasih masih selalu tersenyum dari dulu hingga ${
                      answers[2] || "kemarin"
                    },<br/>
                    Aku selalu senang melihatamu tersenyum 🌸</p>
                    <p>Aku hanya ingin mengatakan</p>
                    <div class="love-questions">
                    <h3>Kamu, Adalah Alasanku Tersenyum 💖✨</h3>
                    <p>Sejak ada kamu di disini, </p> 
                    <p>hidup terasa lebih seru! 😆🎉 </p>  
                    <p>Dulu aku biasa saja,  </p> 
                    <p>sekarang lebih ceria. 😍💫 </p>  
                    <p>Kamu ajarkan arti bahagia,  </p> 
                    <p>bukan sekadar kata, tapi nyata. 💕😊  </p> 
                    <p>Denganmu, semua terasa ringan,  </p> 
                    <p>hari-hari penuh warna dan senyuman. 🌈😄  </p> 
                    <p>Di hari Valentine ini, 💌🍫  </p> 
                    <p>tak perlu cokelat atau puisi.  </p> 
                    <p>Cukup kamu di sini,  </p> 
                    <p>itu sudah lebih dari apapun di dunia ini! 💖✨</p> 
                    </div>
                    <p>💝 Dari yang selalu Bersamamu 💝</p>
                </div>
            `;
  message.style.display = "block";
  message.style.animation = "bounce 1s ease";
  btnYes.style.display = "none";
  btnNo.style.display = "none";
  createHearts();
}
window.onclick = function (event) {
  const modal = document.getElementById("photoModal");
  if (event.target == modal) {
    closeModal();
  }
};
function showSurprise() {
  // Tambahkan konten kejutan di sini
  alertCustom(
    "Hihihi... Kejutannya cuma ini aja 😜 Tapi cintaku nggak terbatas! 💖"
  );
}
