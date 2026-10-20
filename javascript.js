const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu-principal');
const contactToggle = document.querySelector('#contact-toggle');
const contactOptions = document.querySelector('#contact-options');

const closeContactOptions = () => {
  if (!contactToggle || !contactOptions) return;
  contactOptions.hidden = true;
  contactToggle.setAttribute('aria-expanded', 'false');
};

if (contactToggle && contactOptions) {
  contactToggle.addEventListener('click', () => {
    const isOpen = contactToggle.getAttribute('aria-expanded') === 'true';
    contactToggle.setAttribute('aria-expanded', String(!isOpen));
    contactOptions.hidden = isOpen;
  });

  contactOptions.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeContactOptions);
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.contact-menu')) closeContactOptions();
  });
}

if (menuButton && menu) {
  const closeMenu = () => {
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('.sr-only').textContent = 'Abrir menu';
    closeContactOptions();
  };

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menu.classList.toggle('is-open', !isOpen);
    menuButton.querySelector('.sr-only').textContent = isOpen ? 'Abrir menu' : 'Fechar menu';
  });

  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const contactOpen = contactToggle?.getAttribute('aria-expanded') === 'true';
      if (contactOpen) {
        closeContactOptions();
        contactToggle.focus();
      } else {
        closeMenu();
        menuButton.focus();
      }
    }
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
