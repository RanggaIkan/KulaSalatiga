// script.js
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const sendBtn = document.getElementById('send-btn');
const quickChips = document.querySelectorAll('.quick-chip');

// [DITAMBAHKAN]: Selector Tombol Reset Chat
const resetChatBtn = document.getElementById('reset-chat-btn');

// Selector Input Multimodal (Gambar, Dokumen, Audio)
const imageInput = document.getElementById('image-input');
const docInput = document.getElementById('document-input');
const audioInput = document.getElementById('audio-input');

// Selector Preview Bar Universal
const filePreviewContainer = document.getElementById('file-preview-container');
const filePreviewIcon = document.getElementById('file-preview-icon');
const fileName = document.getElementById('file-name');
const fileTypeBadge = document.getElementById('file-type-badge');
const removeFileBtn = document.getElementById('remove-file-btn');

let conversationHistory = [];
let activeFile = null;
let activeFileType = null; // 'image' | 'document' | 'audio'

// Pesan Sambutan Awal untuk Reset
const initialWelcomeHTML = `
  <div class="flex items-start gap-2.5 message-bot">
    <div class="w-8 h-8 rounded-full bg-[#1b4332] text-white flex items-center justify-center text-sm shrink-0 shadow-sm border border-[#d4a373]">
      🌿
    </div>
    <div class="bg-white border border-[#d4a373]/60 text-[#2b2d42] p-4 rounded-2xl rounded-tl-sm max-w-[85%] sm:max-w-[78%] shadow-sm text-xs sm:text-sm leading-relaxed">
      <p class="font-bold text-[#1b4332] font-heritage mb-1.5 text-sm">
        Sugeng rawuh! Sesi Anyar Dipunwiwiti 🏛️
      </p>
      Riwayat obrolan wis diresiki. Monggo badhe tanglet napa malih seputar wisata, kuliner legendaris, utawa <i>hidden gems</i> ing Salatiga? 🌿
    </div>
  </div>
`;

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

function smoothScrollToBottom() {
  if (chatBox) {
    chatBox.scrollTo({
      top: chatBox.scrollHeight,
      behavior: 'smooth'
    });
  }
}

// 1. [DITAMBAHKAN]: Handler Reset Sesi Chat
function resetConversation() {
  if (confirm('Mulai sesi obrolan baru dan bersihkan riwayat chat?')) {
    conversationHistory = [];
    if (chatBox) chatBox.innerHTML = initialWelcomeHTML;
    if (removeFileBtn) removeFileBtn.click();
    if (userInput) {
      userInput.value = '';
      userInput.focus();
    }
  }
}

if (resetChatBtn) {
  resetChatBtn.addEventListener('click', resetConversation);
}

// 2. Universal Preview Handler (Foto, PDF, & Audio)
function handleFileSelect(file, type, icon, badgeText) {
  if (!file) return;
  activeFile = file;
  activeFileType = type;
  if (fileName) fileName.textContent = file.name;
  if (filePreviewIcon) filePreviewIcon.textContent = icon;
  if (fileTypeBadge) fileTypeBadge.textContent = badgeText;
  if (filePreviewContainer) filePreviewContainer.classList.remove('hidden');
}

if (imageInput) imageInput.addEventListener('change', (e) => handleFileSelect(e.target.files[0], 'image', '📸', 'Foto siap dianalisis'));
if (docInput) docInput.addEventListener('change', (e) => handleFileSelect(e.target.files[0], 'document', '📄', 'Dokumen PDF siap diringkas'));
if (audioInput) audioInput.addEventListener('change', (e) => handleFileSelect(e.target.files[0], 'audio', '🎙️', 'Audio siap ditranskrip'));

if (removeFileBtn) {
  removeFileBtn.addEventListener('click', () => {
    activeFile = null;
    activeFileType = null;
    if (imageInput) imageInput.value = '';
    if (docInput) docInput.value = '';
    if (audioInput) audioInput.value = '';
    if (filePreviewContainer) filePreviewContainer.classList.add('hidden');
  });
}

// 3. Fungsi Menampilkan Pesan ke UI
function appendMessage(role, content = '', filePreviewData = null) {
  if (!chatBox) return;
  const container = document.createElement('div');
  container.className = role === 'user' 
    ? 'flex justify-end message-user' 
    : 'flex items-start gap-2 message-bot';

  let fileAttachmentHTML = '';
  if (filePreviewData) {
    if (filePreviewData.type === 'image') {
      fileAttachmentHTML = `<img src="${filePreviewData.url}" class="w-48 h-32 object-cover rounded-xl mb-2 border border-[#d4a373]/40 shadow-sm" />`;
    } else {
      fileAttachmentHTML = `
        <div class="bg-black/20 border border-[#d4a373]/40 px-3 py-1.5 rounded-xl text-xs mb-2 inline-flex items-center gap-2">
          <span>${filePreviewData.type === 'document' ? '📄' : '🎙️'}</span>
          <span class="font-bold truncate max-w-[180px]">${filePreviewData.name}</span>
        </div><br/>
      `;
    }
  }

  if (role === 'user') {
    container.innerHTML = `
      <div class="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-[#fdf8f0] p-3 px-3.5 rounded-2xl rounded-tr-sm max-w-[85%] shadow-sm text-xs sm:text-sm leading-relaxed whitespace-pre-wrap border border-[#d4a373]/30">
        ${fileAttachmentHTML}
        ${escapeHTML(content)}
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="w-7 h-7 rounded-full bg-[#1b4332] text-white flex items-center justify-center text-xs shrink-0 shadow-sm border border-[#d4a373]">
        🌿
      </div>
      <div class="bot-content bg-[#0d2818] border border-[#d4a373]/50 text-[#faedcd] p-3 px-3.5 rounded-2xl rounded-tl-sm max-w-[85%] shadow-sm text-xs sm:text-sm leading-relaxed">
        ${content}
      </div>
    `;
  }

  chatBox.appendChild(container);
  smoothScrollToBottom();
  return container;
}

// 4. Efek Mengetik Kata demi Kata (Typewriter)
async function typeWriterEffect(element, fullMarkdownText) {
  const words = fullMarkdownText.split(' ');
  let currentText = '';

  for (let i = 0; i < words.length; i++) {
    currentText += (i === 0 ? '' : ' ') + words[i];
    element.innerHTML = marked.parse(currentText);
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    await new Promise((resolve) => setTimeout(resolve, 18));
  }
}

// 5. [DITAMBAHKAN]: Friendly Error UI Generator
function renderFriendlyError(targetElement, errorMessage, lastPromptText = '') {
  let humanError = "Waduh, server lagi rehat utawa durung jalan lur! Pastike backend di port 3000 wis aktif ya.";
  
  if (errorMessage.includes("429") || errorMessage.toLowerCase().includes("quota")) {
    humanError = "Kuota request AI lagi padet sedhela lur. Enteni sakmenit banjur jajal meneh ya!";
  } else if (errorMessage.includes("API_KEY") || errorMessage.includes("400")) {
    humanError = "Konfigurasi API Key durung bener ing file .env server.";
  }

  targetElement.innerHTML = `
    <div class="bg-[#bc4749]/20 border border-[#bc4749]/60 rounded-2xl p-3 text-xs text-[#faedcd]">
      <div class="flex items-center gap-1.5 font-bold text-[#f4a261] mb-1">
        <span>⚠️</span>
        <span>Nyuwun Sewu, Ana Kendhala Sistem</span>
      </div>
      <p class="text-[11px] leading-relaxed text-[#faedcd]/90">${humanError}</p>
      <div class="mt-2.5 pt-2 border-t border-[#bc4749]/30 flex items-center justify-between">
        <span class="text-[10px] text-[#faedcd]/50 font-mono">${escapeHTML(errorMessage.substring(0, 35))}...</span>
        ${lastPromptText ? `
          <button type="button" onclick="retryLastPrompt('${escapeHTML(lastPromptText)}')" class="bg-[#bc4749] hover:bg-[#a7383a] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all shadow-sm">
            Coba Maneh ↻
          </button>
        ` : ''}
      </div>
    </div>
  `;
}

window.retryLastPrompt = function(promptText) {
  if (userInput && chatForm) {
    userInput.value = promptText;
    chatForm.dispatchEvent(new Event('submit'));
  }
};

// 6. Form Submit Handler
if (chatForm) {
  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = userInput.value.trim();
    const currentFile = activeFile;
    const currentType = activeFileType;

    if (!text && !currentFile) return;

    let fileData = null;
    if (currentFile) {
      fileData = {
        name: currentFile.name,
        type: currentType,
        url: currentType === 'image' ? URL.createObjectURL(currentFile) : null
      };
    }

    appendMessage('user', text || `(Mengirim ${currentType} untuk diproses...)`, fileData);

    userInput.value = '';
    if (removeFileBtn) removeFileBtn.click();
    if (sendBtn) sendBtn.disabled = true;

    const loadingHTML = `
      <div class="flex items-center gap-1.5 py-1 px-1">
        <span class="w-2 h-2 rounded-full bg-[#d4a373] animate-bounce"></span>
        <span class="w-2 h-2 rounded-full bg-[#d4a373] animate-bounce [animation-delay:0.15s]"></span>
        <span class="w-2 h-2 rounded-full bg-[#d4a373] animate-bounce [animation-delay:0.3s]"></span>
      </div>
    `;
    const thinkingElem = appendMessage('bot', loadingHTML);
    const botTarget = thinkingElem ? thinkingElem.querySelector('.bot-content') : null;

    try {
      let response;

      if (currentFile) {
        const formData = new FormData();
        formData.append(currentType, currentFile);
        formData.append('prompt', text || '');

        let endpoint = '/generate-from-image';
        if (currentType === 'document') endpoint = '/generate-from-document';
        if (currentType === 'audio') endpoint = '/generate-from-audio';

        response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
        });
      } else {
        conversationHistory.push({ role: 'user', text });

        response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ conversation: conversationHistory }),
        });
      }

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || errData.message || `Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.result && botTarget) {
        botTarget.innerHTML = '';
        await typeWriterEffect(botTarget, data.result);
        if (!currentFile) {
          conversationHistory.push({ role: 'model', text: data.result });
        }
      } else if (botTarget) {
        botTarget.textContent = 'Nyuwun sewu, bot dereng saged mangsuli (Tidak ada respon).';
      }
    } catch (err) {
      console.error(err);
      if (botTarget) {
        renderFriendlyError(botTarget, err.message, text);
      }
    } finally {
      if (sendBtn) sendBtn.disabled = false;
      smoothScrollToBottom();
    }
  });
}

// 7. Quick Chips Handler
if (quickChips) {
  quickChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      if (userInput && chatForm) {
        userInput.value = chip.textContent.trim();
        chatForm.dispatchEvent(new Event('submit'));
      }
    });
  });
}

// 8. Filter Kategori Sinkron (Halaman salatiga.html)
function filterCategory(cat, event) {
  const cards = document.querySelectorAll('.spot-card');
  const navItems = document.querySelectorAll('.nav-item');
  const filterPills = document.querySelectorAll('.filter-pill');

  navItems.forEach(item => item.classList.remove('active-nav'));
  filterPills.forEach(pill => {
    pill.classList.remove('bg-[#1b4332]', 'text-[#faedcd]');
    pill.classList.add('bg-[#07130c]/70', 'text-[#faedcd]');
  });

  if (event && event.target) {
    if (event.target.classList.contains('nav-item')) {
      event.target.classList.add('active-nav');
    } else if (event.target.classList.contains('filter-pill')) {
      event.target.classList.add('bg-[#1b4332]', 'text-[#faedcd]');
      event.target.classList.remove('bg-[#07130c]/70');
    }
  }

  cards.forEach(card => {
    if (cat === 'all' || card.dataset.category === cat) {
      card.style.display = 'flex';
      card.style.animation = 'none';
      card.offsetHeight;
      card.style.animation = 'cardFadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    } else {
      card.style.display = 'none';
    }
  });
}

// 9. Pencarian Spot Instan
function searchSpot() {
  const inputElem = document.getElementById('search-input');
  if (!inputElem) return;
  const query = inputElem.value.toLowerCase();
  const cards = document.querySelectorAll('.spot-card');
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(query) ? 'flex' : 'none';
  });
}

// 10. Toggle Popup Chat Widget
function toggleChat() {
  const widget = document.getElementById('chat-widget');
  const toggleBtn = document.getElementById('chat-toggle-btn');
  if (widget && toggleBtn) {
    if (widget.classList.contains('hidden')) {
      widget.classList.remove('hidden');
      toggleBtn.classList.add('hidden');
    } else {
      widget.classList.add('hidden');
      toggleBtn.classList.remove('hidden');
    }
  }
}

// 11. Tombol Tanya AI di Kartu Destinasi
function askAI(promptText) {
  const widget = document.getElementById('chat-widget');
  if (widget && widget.classList.contains('hidden')) toggleChat();
  if (userInput && chatForm) {
    userInput.value = promptText;
    chatForm.dispatchEvent(new Event('submit'));
  }
}