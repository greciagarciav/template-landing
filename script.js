var menuToggle = document.querySelector('[data-template-id="mobile-menu-toggle"]');
var mobileNavigation = document.getElementById('mobile-navigation');
var siteHeader = document.querySelector('header');

function closeMobileMenu() {
  if (!mobileNavigation || !menuToggle) return;
  mobileNavigation.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú');
}

if (menuToggle && mobileNavigation) {
  menuToggle.addEventListener('click', function() {
    var isOpen = mobileNavigation.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  document.addEventListener('click', function(event) {
    if (mobileNavigation.classList.contains('open') && !siteHeader.contains(event.target)) {
      closeMobileMenu();
    }
  });

  mobileNavigation.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', closeMobileMenu);
  });
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') closeMobileMenu();
});

document.querySelectorAll('.filter-btn').forEach(function(button) {
  button.addEventListener('click', function() {
    var target = button.dataset.target;
    document.querySelectorAll('.filter-btn').forEach(function(item) {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.case-panel').forEach(function(panel) { panel.classList.remove('active'); });
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');
    if (target) {
      var panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    }
  });
});

var clinicVideoPlayButton = document.querySelector('[data-template-id="clinic-video-play-button"]');
var clinicVideoStatus = document.querySelector('[data-template-id="clinic-video-status"]');
var clinicVideoReadyStatus = document.querySelector('[data-template-id="clinic-video-ready-status"]');
if (clinicVideoPlayButton) {
  clinicVideoPlayButton.addEventListener('click', function() {
    if (clinicVideoStatus) clinicVideoStatus.classList.add('hidden');
    if (clinicVideoReadyStatus) clinicVideoReadyStatus.classList.remove('hidden');
    clinicVideoPlayButton.setAttribute('aria-label', 'Video pendiente de añadir');
  });
}

var privacyModal = document.getElementById('privacy-modal');
var privacyTrigger = document.querySelector('[data-privacy-trigger]');
var privacyClose = document.getElementById('privacy-close');

function openPrivacyModal() {
  if (!privacyModal) return;
  privacyModal.classList.add('open');
  privacyModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePrivacyModal() {
  if (!privacyModal) return;
  privacyModal.classList.remove('open');
  privacyModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (privacyTrigger) {
  privacyTrigger.addEventListener('click', function(event) {
    event.preventDefault();
    openPrivacyModal();
  });
}

if (privacyClose) {
  privacyClose.addEventListener('click', closePrivacyModal);
}

if (privacyModal) {
  privacyModal.addEventListener('click', function(event) {
    if (event.target === privacyModal) closePrivacyModal();
  });
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && privacyModal && privacyModal.classList.contains('open')) {
    closePrivacyModal();
  }
});

document.querySelectorAll('.faq-trigger').forEach(function(button) {
  button.addEventListener('click', function() {
    var item = button.closest('.faq-item');
    if (!item) return;
    var isOpen = item.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
});

if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}

var booking = { step: 1, reason: '', date: '', time: '', name: '', phone: '', notes: '' };
var bookingModal = document.getElementById('booking-modal');
var bookingContent = document.getElementById('booking-content');
var bookingBack = document.getElementById('booking-back');
var bookingProgress = document.getElementById('booking-progress-bar');

function openBooking() {
  if (!bookingModal) return;
  if (mobileNavigation && mobileNavigation.classList.contains('open')) {
    closeMobileMenu();
  }
  booking.step = 1;
  bookingModal.classList.add('open');
  bookingModal.setAttribute('aria-hidden', 'false');
  renderBooking();
  var bookingFocusTarget = document.getElementById('booking-content');
  if (bookingFocusTarget) bookingFocusTarget.focus();
}

function closeBooking() {
  if (!bookingModal) return;
  bookingModal.classList.remove('open');
  bookingModal.setAttribute('aria-hidden', 'true');
  bookingModal.style.display = 'none';
  setTimeout(function() {
    if (bookingModal && !bookingModal.classList.contains('open')) {
      bookingModal.style.display = '';
    }
  }, 10);
}

function renderBooking() {
  if (!bookingBack || !bookingProgress || !bookingContent) return;

  bookingBack.style.visibility = booking.step > 1 && booking.step < 5 ? 'visible' : 'hidden';
  bookingProgress.style.width = (booking.step === 5 ? 100 : booking.step * 25) + '%';

  if (booking.step === 1) bookingContent.innerHTML =
    '<div class="booking-step"><h3>¿Presentas dolor o molestia actualmente?</h3><button class="booking-choice" data-reason="Chequeo preventivo / Rutina"><strong>Chequeo preventivo / Rutina</strong><small>Sin dolor ni molestia actual</small></button><button class="booking-choice" data-reason="Sensibilidad o molestia leve"><strong>Sensibilidad o molestia leve</strong><small>Al frío, calor o masticar</small></button><button class="booking-choice" data-reason="Dolor agudo / Molestia evidente"><strong>Dolor agudo / Molestia evidente</strong><small>Atención prioritaria recomendada</small></button></div><div class="booking-footer"><button id="booking-next" type="button">Continuar →</button></div>';

  if (booking.step === 2) bookingContent.innerHTML =
    '<div class="booking-step"><h3>Selecciona tu día preferido:</h3><p class="booking-note">Preferencias sujetas a coordinación; no hay calendario conectado.</p><div class="booking-dates"><button class="booking-date" data-date="Hoy"><strong>Hoy</strong><small>19 sep</small></button><button class="booking-date" data-date="Mañana"><strong>Mañana</strong><small>20 sep</small></button><button class="booking-date" data-date="Sábado"><strong>Sáb</strong><small>21 sep</small></button></div><h3 style="margin-top:1.2rem">Horario preferido:</h3><div class="booking-times"><button class="booking-time" data-time="9:00 a. m.">9:00 a. m.</button><button class="booking-time" data-time="10:30 a. m.">10:30 a. m.</button><button class="booking-time" data-time="11:30 a. m.">11:30 a. m.</button><button class="booking-time" data-time="3:00 p. m.">3:00 p. m.</button><button class="booking-time" data-time="4:30 p. m.">4:30 p. m.</button><button class="booking-time" data-time="6:00 p. m.">6:00 p. m.</button></div></div><div class="booking-footer"><button id="booking-next" type="button">Continuar →</button></div>';

  if (booking.step === 3) bookingContent.innerHTML =
    '<div class="booking-step"><h3>Tus datos para coordinar la cita:</h3><label class="booking-field">Nombre completo del paciente: *<input id="booking-name" required placeholder="Ej. Tu nombre completo"></label><label class="booking-field">Teléfono / WhatsApp: *<input id="booking-phone" required placeholder="Ej. +51 987 654 321"></label><label class="booking-field">Notas adicionales (opcional):<textarea id="booking-notes" placeholder="Cuéntanos algo que debamos considerar..."></textarea></label><p id="booking-error" class="booking-error" role="alert"></p></div><div class="booking-footer"><button id="booking-next" type="button">Continuar →</button></div>';

  if (booking.step === 4) bookingContent.innerHTML =
    '<div class="booking-step"><h3>Revisa tu solicitud</h3><div class="booking-summary"><strong>Motivo:</strong> '+booking.reason+'<br><strong>Día:</strong> '+booking.date+'<br><strong>Horario:</strong> '+booking.time+'<br><strong>Nombre:</strong> '+booking.name+'<br><strong>Teléfono:</strong> '+booking.phone+'<br><strong>Notas:</strong> '+(booking.notes || 'Sin notas')+'</div><p class="booking-note" style="margin-top:1rem">Esto es una solicitud de coordinación, no una cita confirmada.</p></div><div class="booking-footer"><button id="booking-next" type="button">Confirmar y preparar WhatsApp →</button></div>';

  if (booking.step === 5) bookingContent.innerHTML =
    '<div class="booking-success"><h3>Solicitud preparada</h3><p>WhatsApp se abrió con tu solicitud. El equipo de Dentomeri coordinará contigo la disponibilidad.</p><button id="booking-finish" class="booking-footer" type="button">Volver a la web</button></div>';

  bookingContent.querySelectorAll('[data-reason]').forEach(function(b){
    b.classList.toggle('selected', b.dataset.reason === booking.reason);
    b.onclick = function(){ booking.reason = b.dataset.reason; renderBooking(); };
  });

  bookingContent.querySelectorAll('[data-date]').forEach(function(b){
    b.classList.toggle('selected', b.dataset.date === booking.date);
    b.onclick = function(){ booking.date = b.dataset.date; renderBooking(); };
  });

  bookingContent.querySelectorAll('[data-time]').forEach(function(b){
    b.classList.toggle('selected', b.dataset.time === booking.time);
    b.onclick = function(){ booking.time = b.dataset.time; renderBooking(); };
  });

  var next = document.getElementById('booking-next');
  if (next) {
    next.onclick = function() {
      if (booking.step === 1 && !booking.reason) return;
      if (booking.step === 2 && (!booking.date || !booking.time)) return;
      if (booking.step === 3) {
        booking.name = document.getElementById('booking-name').value.trim();
        booking.phone = document.getElementById('booking-phone').value.trim();
        booking.notes = document.getElementById('booking-notes').value.trim();

        if (!booking.name || !booking.phone) {
          document.getElementById('booking-error').textContent = 'Completa los campos obligatorios para continuar.';
          return;
        }
      }
      if (booking.step === 4) {
        var msg =
          'Solicitud de cita odontológica%0AMotivo: ' + encodeURIComponent(booking.reason) +
          '%0AFecha preferida: ' + encodeURIComponent(booking.date) +
          '%0AHora preferida: ' + encodeURIComponent(booking.time) +
          '%0ANombre: ' + encodeURIComponent(booking.name) +
          '%0ATeléfono: ' + encodeURIComponent(booking.phone) +
          '%0ANotas: ' + encodeURIComponent(booking.notes || 'Sin notas');

        window.open('https://wa.me/51969744485?text=' + msg, '_blank');
        booking.step = 5;
      } else {
        booking.step++;
      }
      renderBooking();
    };
  }

  var finish = document.getElementById('booking-finish');
  if (finish) finish.onclick = closeBooking;
}

var bookingButtons = [
  document.querySelector('[data-template-id="nav-appointment"]'),
  document.querySelector('[data-template-id="mobile-nav-appointment"]'),
  document.querySelector('[data-template-id="hero-book-button"]'),
  document.querySelector('[data-template-id="specialist-book-button"]'),
  document.querySelector('[data-template-id="process-book-button"]'),
  document.querySelector('[data-template-id="video-book-button"]'),
  document.querySelector('[data-template-id="cta-book-button"]')
];

bookingButtons.forEach(function(button) {
  if (button) button.addEventListener('click', openBooking);
});

var promotionButton = document.querySelector('[data-template-id="promotion-button"]');
if (promotionButton) {
  promotionButton.addEventListener('click', function() {
    window.open('https://wa.me/51969744485?text=' + encodeURIComponent('Hola Dentomeri, me gustaría saber qué promociones tienes disponible.'), '_blank');
  });
}

if (bookingBack) {
  bookingBack.addEventListener('click', function() {
    if (booking.step > 1) {
      booking.step--;
      renderBooking();
    }
  });
}

if (bookingModal) {
  bookingModal.addEventListener('click', function(e) {
    if (e.target === bookingModal) closeBooking();
  });
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && bookingModal && bookingModal.classList.contains('open')) closeBooking();
});

var floatingWhatsappButton = document.querySelector('[data-template-id="whatsapp-button"]');
if (floatingWhatsappButton) {
  floatingWhatsappButton.onclick = function(event) {
    event.preventDefault();
    event.stopPropagation();
    window.open('https://wa.me/51969744485?text=' + encodeURIComponent('Hola Dentomeri, me gustaría más información.'), '_blank', 'noopener,noreferrer');
    return false;
  };
}
