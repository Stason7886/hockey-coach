/*
  Настройки перед публикацией:
  1) замените contactEmail на почту, куда должны приходить заявки;
  2) при необходимости поменяйте название, цены, город, телефон и контакты в index.html;
  3) форма открывает почтовое приложение пользователя и формирует готовое письмо.
*/
const siteConfig = {
  contactEmail: 'hello@example.com',
  projectName: 'Hockey Coach'
};

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('is-open', !expanded);
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('is-open');
    });
  });
}

// Предзаполняем цель в форме, если посетитель выбрал пакет на карточке стоимости.
document.querySelectorAll('[data-plan]').forEach((link) => {
  link.addEventListener('click', () => {
    const goal = document.querySelector('#goal-select');
    if (goal) {
      const option = document.createElement('option');
      option.value = link.dataset.plan;
      option.textContent = link.dataset.plan;
      option.selected = true;
      goal.append(option);
    }
  });
});

const leadForm = document.querySelector('#lead-form');
const feedback = document.querySelector('#form-feedback');

if (leadForm) {
  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!leadForm.reportValidity()) return;

    if (!siteConfig.contactEmail || siteConfig.contactEmail === 'hello@example.com') {
      feedback.textContent = 'Форма готова. Перед публикацией укажите рабочий адрес в файле script.js (contactEmail).';
      feedback.style.color = '#a15e2e';
      return;
    }

    const data = new FormData(leadForm);
    const subject = encodeURIComponent(`Заявка на тренировку — ${data.get('name')}`);
    const body = encodeURIComponent([
      `Имя: ${data.get('name')}`,
      `Контакт: ${data.get('contact')}`,
      `Цель: ${data.get('goal')}`,
      `Комментарий: ${data.get('message') || '—'}`
    ].join('\n'));

    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
    feedback.textContent = 'Открываем почтовое приложение с подготовленной заявкой.';
    feedback.style.color = '#267451';
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
