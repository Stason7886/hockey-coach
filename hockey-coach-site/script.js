/*
  Настройки перед публикацией:
  1) замените contactEmail на рабочую почту тренера;
  2) поменяйте название, цены, город, телефон и контакты в index.html;
  3) форма формирует письмо через почтовое приложение пользователя.
  Для автоматического приёма заявок без открытия почты подключите CRM или сервис обработки форм.
*/
const siteConfig = {
  contactEmail: 'hello@example.com',
  projectName: 'Hockey Coach'
};

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

function closeMenu() {
  if (!menuToggle || !mainNav) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  mainNav.classList.remove('is-open');
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    mainNav.classList.toggle('is-open', !isExpanded);
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', (event) => {
    if (
      menuToggle.getAttribute('aria-expanded') === 'true' &&
      !mainNav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });
}

// Выбранный тариф автоматически подставляется в поле цели — без создания повторных option.
document.querySelectorAll('[data-plan]').forEach((link) => {
  link.addEventListener('click', () => {
    const goal = document.querySelector('#goal-select');
    if (goal) goal.value = link.dataset.plan;
  });
});

const leadForm = document.querySelector('#lead-form');
const feedback = document.querySelector('#form-feedback');

if (leadForm && feedback) {
  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!leadForm.reportValidity()) return;

    if (!siteConfig.contactEmail || siteConfig.contactEmail === 'hello@example.com') {
      feedback.textContent = 'Демо-режим: укажите рабочую почту тренера в файле script.js перед публикацией.';
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
    ].join('\\n'));

    feedback.textContent = 'Открываем почтовое приложение с подготовленной заявкой.';
    feedback.style.color = '#267451';
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
