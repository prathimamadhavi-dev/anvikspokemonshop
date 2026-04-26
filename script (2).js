// ─── EmailJS init ────────────────────────────────────────────────────────────
const EMAILJS_PUBLIC_KEY = 'vhlH7Lv-q35WMm1_p';
const EMAILJS_SERVICE_ID = 'service_dnhtqho';
const TEMPLATE_ID        = 'template_uawt115';

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

// ─── State ───────────────────────────────────────────────────────────────────
let currentCard = { name: '', num: '' };
let currentMode = null;

// ─── Card clicks ─────────────────────────────────────────────────────────────
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    currentCard.name = card.dataset.name;
    currentCard.num  = card.dataset.num;
    document.getElementById('modalCardName').textContent = currentCard.name;
    document.getElementById('modalCardNum').textContent  = currentCard.num;

    currentMode = null;
    document.getElementById('tradeBtn').classList.remove('active');
    document.getElementById('buyBtn').classList.remove('active');
    document.getElementById('formArea').classList.remove('open');
    document.getElementById('successMsg').style.display = 'none';
    document.getElementById('formInput').value = '';
    document.getElementById('formEmail').value = '';
    document.getElementById('formName').value  = '';
    hideErrors();

    document.getElementById('modalOverlay').classList.add('active');
  });
});

// ─── Modal helpers ───────────────────────────────────────────────────────────
function handleOverlayClick(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}

// ─── Trade / Buy mode ────────────────────────────────────────────────────────
function setMode(mode) {
  currentMode = mode;

  const tradeBtn = document.getElementById('tradeBtn');
  const buyBtn   = document.getElementById('buyBtn');
  const label    = document.getElementById('formLabel');
  const input    = document.getElementById('formInput');
  const sendBtn  = document.getElementById('sendBtn');

  tradeBtn.classList.toggle('active', mode === 'trade');
  buyBtn.classList.toggle('active',   mode === 'buy');

  if (mode === 'trade') {
    label.textContent   = 'Your Trade Offer';
    input.placeholder   = 'What are you offering in return?';
    sendBtn.className   = 'send-btn';
    sendBtn.textContent = 'SEND TRADE OFFER';
  } else {
    label.textContent   = 'Your Offer Price';
    input.placeholder   = 'How much are you offering? (e.g. $25)';
    sendBtn.className   = 'send-btn buy-style';
    sendBtn.textContent = 'SEND BUY OFFER';
  }

  document.getElementById('successMsg').style.display = 'none';
  hideErrors();
  document.getElementById('formArea').classList.add('open');
}

function hideErrors() {
  document.getElementById('inputError').style.display   = 'none';
  document.getElementById('emailError').style.display   = 'none';
  document.getElementById('nameError').style.display    = 'none';
  document.getElementById('formInput').style.borderColor = '';
  document.getElementById('formEmail').style.borderColor = '';
  document.getElementById('formName').style.borderColor  = '';
}

// ─── Send trade/buy ──────────────────────────────────────────────────────────
function sendRequest() {
  const nameVal  = document.getElementById('formName').value.trim();
  const inputVal = document.getElementById('formInput').value.trim();
  const emailVal = document.getElementById('formEmail').value.trim();
  let valid = true;

  hideErrors();

  if (!nameVal) {
    document.getElementById('nameError').style.display    = 'block';
    document.getElementById('formName').style.borderColor = '#ef4444';
    valid = false;
  }
  if (!inputVal) {
    document.getElementById('inputError').style.display    = 'block';
    document.getElementById('formInput').style.borderColor = '#ef4444';
    valid = false;
  }
  if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
    document.getElementById('emailError').style.display    = 'block';
    document.getElementById('formEmail').style.borderColor = '#ef4444';
    valid = false;
  }
  if (!valid) return;

  const btn = document.getElementById('sendBtn');
  btn.disabled    = true;
  btn.textContent = 'SENDING...';

  const templateParams = {
    user_name:  nameVal,
    user_email: emailVal,
    card:       currentCard.name + ' · ' + currentCard.num,
    type:       currentMode === 'trade' ? 'TRADE' : 'BUY',
    time:       new Date().toLocaleString(),
    location:   currentMode === 'trade' ? 'Trade offer: ' + inputVal : 'Buy offer: ' + inputVal,
  };

  console.log('Sending to EmailJS:', templateParams);

  emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_ID, templateParams)
    .then(() => {
      document.getElementById('formArea').classList.remove('open');
      document.getElementById('successMsg').style.display = 'block';
      showToast('Request sent!', false);
      setTimeout(closeModal, 2000);
    })
    .catch(err => {
      console.error('EmailJS error:', JSON.stringify(err));
      showToast('Error: ' + (err.text || err.status || 'check console'), true);
    })
    .finally(() => {
      btn.disabled    = false;
      btn.textContent = currentMode === 'trade' ? 'SEND TRADE OFFER' : 'SEND BUY OFFER';
    });
}

// ─── Meeting ─────────────────────────────────────────────────────────────────
function submitMeeting() {
  const nameVal     = document.getElementById('meet-name').value.trim();
  const dateVal     = document.getElementById('meet-date').value;
  const locationVal = document.getElementById('meet-location').value.trim();
  const emailVal    = document.getElementById('meet-email').value.trim();
  const noteVal     = document.getElementById('meet-note').value.trim();

  ['name', 'date', 'location', 'email'].forEach(f => {
    document.getElementById(`err-${f}`).style.display = 'none';
    document.getElementById(`meet-${f}`).classList.remove('invalid');
  });

  let valid = true;
  if (!nameVal) {
    document.getElementById('err-name').style.display = 'block';
    document.getElementById('meet-name').classList.add('invalid');
    valid = false;
  }
  if (!dateVal) {
    document.getElementById('err-date').style.display = 'block';
    document.getElementById('meet-date').classList.add('invalid');
    valid = false;
  }
  if (!locationVal) {
    document.getElementById('err-location').style.display = 'block';
    document.getElementById('meet-location').classList.add('invalid');
    valid = false;
  }
  if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
    document.getElementById('err-email').style.display = 'block';
    document.getElementById('meet-email').classList.add('invalid');
    valid = false;
  }
  if (!valid) return;

  const btn       = document.querySelector('.submit-meeting-btn');
  btn.disabled    = true;
  btn.textContent = 'SENDING...';

  const templateParams = {
    user_name:  nameVal,
    user_email: emailVal,
    card:       'N/A — Meeting Request',
    type:       'MEETING',
    time:       dateVal,
    location:   locationVal + (noteVal ? ' — Note: ' + noteVal : ''),
  };

  console.log('Sending meeting to EmailJS:', templateParams);

  emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_ID, templateParams)
    .then(() => {
      showToast('Meeting request sent!', false);
      document.getElementById('meet-name').value     = '';
      document.getElementById('meet-date').value     = '';
      document.getElementById('meet-location').value = '';
      document.getElementById('meet-email').value    = '';
      document.getElementById('meet-note').value     = '';
    })
    .catch(err => {
      console.error('EmailJS error:', JSON.stringify(err));
      showToast('Error: ' + (err.text || err.status || 'check console'), true);
    })
    .finally(() => {
      btn.disabled    = false;
      btn.textContent = 'SCHEDULE MEETING';
    });
}

// ─── Toast ───────────────────────────────────────────────────────────────────
function showToast(msg, isError = false) {
  const t       = document.getElementById('toast');
  t.textContent = isError ? `⚠ ${msg}` : `✓ ${msg}`;
  t.className   = 'toast' + (isError ? ' error' : '');
  void t.offsetWidth;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}
