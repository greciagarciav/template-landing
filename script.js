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

var specialityCarousel = document.getElementById('specialty-carousel');
if (specialityCarousel) {
  var specialityCards = Array.from(specialityCarousel.children);
  var firstGroup = document.createElement('div');
  firstGroup.className = 'specialty-carousel-group';

  specialityCards.forEach(function(card) {
    firstGroup.appendChild(card);
  });

  var secondGroup = document.createElement('div');
  secondGroup.className = 'specialty-carousel-group';
  specialityCards.forEach(function(card) {
    var clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    secondGroup.appendChild(clone);
  });

  specialityCarousel.innerHTML = '';
  specialityCarousel.appendChild(firstGroup);
  specialityCarousel.appendChild(secondGroup);

  var specialityOffset = 0;
  var specialitySpeed = 0.8;
  var specialityStep = firstGroup.offsetWidth || 0;
  var specialityLoopId = null;

  function tickSpecialityCarousel() {
    if (!specialityCarousel || !firstGroup) return;

    specialityStep = firstGroup.offsetWidth || 0;
    specialityOffset += specialitySpeed;

    if (specialityOffset >= specialityStep) {
      specialityOffset = 0;
      specialityCarousel.style.transform = 'translate3d(0, 0, 0)';
      return;
    }

    specialityCarousel.style.transform = 'translate3d(-' + specialityOffset + 'px, 0, 0)';
  }

  specialityLoopId = setInterval(tickSpecialityCarousel, 16);

  specialityCarousel.addEventListener('mouseenter', function() {
    if (specialityLoopId) clearInterval(specialityLoopId);
  });

  specialityCarousel.addEventListener('mouseleave', function() {
    if (specialityLoopId) clearInterval(specialityLoopId);
    specialityLoopId = setInterval(tickSpecialityCarousel, 16);
  });

  window.addEventListener('resize', function() {
    specialityStep = firstGroup.offsetWidth || 0;
    if (specialityStep > 0 && specialityOffset >= specialityStep) {
      specialityOffset = 0;
    }
  });
}

var specialityModal = document.getElementById('specialty-modal');
var specialityModalBody = document.getElementById('specialty-modal-body');
var specialityModalClose = document.getElementById('specialty-modal-close');

var specialityBenefits = {
  'Rehabilitación oral': [
    'Recupera sonrisa y funcionalidad',
    'Mejora la estética de una forma armoniosa',
    'Personaliza el tratamiento a cada caso'
  ],
  'Estética dental': [
    'Mejora la armonía visual de la sonrisa',
    'Aumenta la confianza al sonreír',
    'Ofrece resultados naturales y personalizados'
  ],
  'Implantes dentales': [
    'Restauran la función masticatoria',
    'Mantienen la estética y la sonrisa',
    'Ayudan a preservar el hueso y el contorno facial'
  ],
  'Periodoncia': [
    'Cuida la base de tus dientes',
    'Previene pérdida dental',
    'Mantiene la salud general oral'
  ],
  'Endodoncia': [
    'Alivia dolor e infección',
    'Conserva el diente natural',
    'Recupera función y confort'
  ],
  'Ortodoncia': [
    'Mejora la alineación y la mordida',
    'Fortalece la estética y función',
    'Favorece una mejor higiene oral'
  ],
  'Odontopediatría': [
    'Prevención temprana para evitar problemas futuros',
    'Atención amable y comprensiva para niños',
    'Hábitos saludables desde la infancia'
  ],
  'Cirugía oral': [
    'Resuelve condiciones complejas',
    'Reduce dolor y molestias',
    'Mejora la salud oral y la calidad de vida'
  ]
};

function getSpecialityBenefits(specialty) {
  return specialityBenefits[specialty] || [];
}

function getSpecialityCopy(specialty, fallbackItem) {
  var copyMap = {
    'Rehabilitación oral': {
      summary: 'Recuperamos dientes dañados, ausentes o desgastados para devolverles función, estética y armonía.',
      description: '<strong>Ideal para:</strong> coronas, puentes, incrustaciones, prótesis y rehabilitaciones integrales.'
    },
    'Estética dental': {
      summary: 'Mejoramos la apariencia de tu sonrisa respetando la naturalidad y las características de cada paciente.',
      description: '<strong>Ideal para:</strong> restauraciones estéticas, carillas, blanqueamiento y diseño de sonrisa.'
    },
    'Implantes dentales': {
      summary: 'Reemplazamos dientes ausentes mediante implantes dentales, buscando recuperar la función y la seguridad al sonreír y comer.',
      description: ''
    },
    'Periodoncia': {
      summary: 'Cuidamos las encías y los tejidos que sostienen tus dientes para prevenir y tratar problemas como gingivitis y periodontitis.',
      description: ''
    },
    'Endodoncia': {
      summary: 'Tratamos el interior del diente cuando la pulpa está afectada, buscando conservar el diente y evitar su extracción cuando es posible.',
      description: ''
    },
    'Ortodoncia': {
      summary: 'Corregimos la posición de los dientes y la mordida para conseguir una sonrisa más alineada y una función adecuada.',
      description: ''
    },
    'Odontopediatría': {
      summary: 'Cuidamos la salud dental de los niños desde sus primeros años, creando experiencias positivas y ayudándolos a desarrollar buenos hábitos.',
      description: ''
    },
    'Cirugía oral': {
      summary: 'Realizamos procedimientos quirúrgicos necesarios para resolver diferentes problemas de salud bucal, siempre con una evaluación previa y un manejo cuidadoso del paciente.',
      description: ''
    }
  };

  return copyMap[specialty] || {
    summary: fallbackItem && fallbackItem.summary ? fallbackItem.summary : '',
    description: fallbackItem && fallbackItem.description ? fallbackItem.description : ''
  };
}

function openSpecialityModal(item) {
  if (!specialityModal || !specialityModalBody || !item) return;

  var benefits = getSpecialityBenefits(item.specialty || '');
  var benefitsList = benefits.map(function(benefit) {
    return '<li>' + benefit + '</li>';
  }).join('');
  var specialtyCopy = getSpecialityCopy(item.specialty || '', item);
  var summaryText = specialtyCopy.summary || item.summary || '';
  var descriptionText = specialtyCopy.description || item.description || '';
  var benefitsLabel = benefits.length ? '<p class="specialty-benefits-title"><strong>Beneficios:</strong></p>' : '';

  specialityModalBody.innerHTML = `
    <div class="specialty-detail">
      <img class="specialty-detail-image" src="${item.image || ''}" alt="${item.specialty || 'Especialidad'}" loading="lazy">
      <div class="specialty-detail-content">
        <h3 id="specialty-modal-title">${item.specialty || 'Especialidad'}</h3>
        <p>${summaryText}</p>
        ${descriptionText ? '<p>' + descriptionText + '</p>' : ''}
        ${benefitsLabel}
        <ul class="specialty-benefits">${benefitsList}</ul>
        <div class="specialty-cta-row">
          <a href="https://wa.me/51969744485?text=${encodeURIComponent('Hola Dentomeri, me gustaría más información sobre la especialidad de ' + (item.specialty || ''))}" target="_blank" rel="noopener noreferrer">Conoce más</a>
        </div>
      </div>
    </div>
  `;

  specialityModal.classList.add('open');
  specialityModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeSpecialityModal() {
  if (!specialityModal) return;
  specialityModal.classList.remove('open');
  specialityModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.specialty-card').forEach(function(card) {
  card.addEventListener('click', function() {
    var item = {
      specialty: card.dataset.specialty,
      image: card.dataset.image,
      summary: '',
      description: ''
    };
    openSpecialityModal(item);
  });
});

if (specialityModalClose) {
  specialityModalClose.addEventListener('click', closeSpecialityModal);
}

if (specialityModal) {
  specialityModal.addEventListener('click', function(event) {
    if (event.target === specialityModal) closeSpecialityModal();
  });
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && specialityModal && specialityModal.classList.contains('open')) {
    closeSpecialityModal();
  }
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

function getLocalDateKey(date) {
  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2, '0');
  var day = String(date.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

function getBookingDayOptions() {
  var start = new Date();
  start.setHours(0, 0, 0, 0);

  return [0, 1, 2].map(function(offset) {
    var date = new Date(start);
    date.setDate(start.getDate() + offset);

    var label = offset === 0 ? 'Hoy' : offset === 1 ? 'Mañana' : 'Pasado mañana';
    var short = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short' }).format(date);

    return {
      value: getLocalDateKey(date),
      label: label,
      short: short
    };
  });
}

function getBookingTimeOptions() {
  var options = [];

  for (var hour = 8; hour <= 20; hour++) {
    var value = String(hour).padStart(2, '0') + ':00';
    var suffix = hour >= 12 ? 'p. m.' : 'a. m.';
    var displayHour = hour % 12 === 0 ? 12 : hour % 12;

    options.push({
      value: value,
      label: displayHour + ':00 ' + suffix
    });
  }

  return options;
}

function formatBookingDateDisplay(dateValue) {
  var option = getBookingDayOptions().find(function(day) {
    return day.value === dateValue;
  });

  return option ? option.label + ' · ' + option.short : dateValue;
}

function formatBookingTimeDisplay(timeValue) {
  var hourValue = Number(timeValue.split(':')[0]);
  var suffix = hourValue >= 12 ? 'p. m.' : 'a. m.';
  var displayHour = hourValue % 12 === 0 ? 12 : hourValue % 12;
  return displayHour + ':00 ' + suffix;
}

function renderBooking() {
  if (!bookingBack || !bookingProgress || !bookingContent) return;

  bookingBack.style.visibility = booking.step > 1 && booking.step < 5 ? 'visible' : 'hidden';
  bookingProgress.style.width = (booking.step === 5 ? 100 : booking.step * 25) + '%';

  if (booking.step === 1) bookingContent.innerHTML =
    '<div class="booking-step"><h3>¿Presentas dolor o molestia actualmente?</h3><button class="booking-choice" data-reason="Chequeo preventivo / Rutina"><strong>Chequeo preventivo / Rutina</strong><small>Sin dolor ni molestia actual</small></button><button class="booking-choice" data-reason="Sensibilidad o molestia leve"><strong>Sensibilidad o molestia leve</strong><small>Al frío, calor o masticar</small></button><button class="booking-choice" data-reason="Dolor agudo / Molestia evidente"><strong>Dolor agudo / Molestia evidente</strong><small>Atención prioritaria recomendada</small></button></div><div class="booking-footer"><button id="booking-next" type="button">Continuar →</button></div>';

  if (booking.step === 2) {
    var bookingDays = getBookingDayOptions();
    var bookingDayButtons = bookingDays.map(function(day) {
      return '<button class="booking-date" data-date="' + day.value + '"><strong>' + day.label + '</strong><small>' + day.short + '</small></button>';
    }).join('');

    var bookingTimes = getBookingTimeOptions();
    var bookingTimeButtons = bookingTimes.map(function(timeItem) {
      return '<button class="booking-time" data-time="' + timeItem.value + '">' + timeItem.label + '</button>';
    }).join('');

    bookingContent.innerHTML =
      '<div class="booking-step"><h3>Selecciona tu día preferido:</h3><p class="booking-note">Preferencias sujetas a coordinación; no hay calendario conectado.</p><div class="booking-dates">' + bookingDayButtons + '</div><h3 style="margin-top:1.2rem">Horario preferido:</h3><div class="booking-times">' + bookingTimeButtons + '</div></div><div class="booking-footer"><button id="booking-next" type="button">Continuar →</button></div>';
  }

  if (booking.step === 3) bookingContent.innerHTML =
    '<div class="booking-step"><h3>Tus datos para coordinar la cita:</h3><label class="booking-field">Nombre completo del paciente: *<input id="booking-name" required placeholder="Ej. Tu nombre completo"></label><label class="booking-field">Teléfono / WhatsApp: *<input id="booking-phone" required placeholder="Ej. +51 987 654 321"></label><label class="booking-field">Notas adicionales (opcional):<textarea id="booking-notes" placeholder="Cuéntanos algo que debamos considerar..."></textarea></label><p id="booking-error" class="booking-error" role="alert"></p></div><div class="booking-footer"><button id="booking-next" type="button">Continuar →</button></div>';

  if (booking.step === 4) bookingContent.innerHTML =
    '<div class="booking-step"><h3>Revisa tu solicitud</h3><div class="booking-summary"><strong>Motivo:</strong> '+booking.reason+'<br><strong>Día:</strong> '+formatBookingDateDisplay(booking.date)+'<br><strong>Horario:</strong> '+formatBookingTimeDisplay(booking.time)+'<br><strong>Nombre:</strong> '+booking.name+'<br><strong>Teléfono:</strong> '+booking.phone+'<br><strong>Notas:</strong> '+(booking.notes || 'Sin notas')+'</div><p class="booking-note" style="margin-top:1rem">Esto es una solicitud de coordinación, no una cita confirmada.</p></div><div class="booking-footer"><button id="booking-next" type="button">Confirmar y preparar WhatsApp →</button></div>';

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
          'Hola Dentomeri, vengo de tu página web y quiero agendar una cita.%0A*Motivo*: ' + encodeURIComponent(booking.reason) +
          '%0A*Fecha preferida*: ' + encodeURIComponent(formatBookingDateDisplay(booking.date)) +
          '%0A*Hora preferida*: ' + encodeURIComponent(formatBookingTimeDisplay(booking.time)) +
          '%0A*Nombre*: ' + encodeURIComponent(booking.name) +
          '%0A*Teléfono*: ' + encodeURIComponent(booking.phone) +
          '%0A*Notas*: ' + encodeURIComponent(booking.notes || 'Sin notas')+
          '%0AQuedo pendiente a tu confirmación, ¡gracias!';

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
