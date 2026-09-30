// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  })
);

// Dark / light theme (remembers choice)
const themeBtn = document.getElementById('themeBtn');
const root = document.documentElement;
function setTheme(t) {
  root.setAttribute('data-theme', t);
  themeBtn.textContent = t === 'dark' ? 'Light' : 'Dark';
  themeBtn.setAttribute('aria-label', 'Switch to ' + (t === 'dark' ? 'light' : 'dark') + ' theme');
  try { localStorage.setItem('theme', t); } catch (e) {}
}
let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
setTheme(saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeBtn.addEventListener('click', () =>
  setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark')
);

// Contact form validation
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
function showError(field, msg) {
  form.querySelector('[data-for="' + field.id + '"]').textContent = msg;
  field.classList.toggle('invalid', !!msg);
}
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.name, email = form.email, message = form.message;
  let ok = true;
  showError(name, name.value.trim() ? '' : 'Enter your name.');
  showError(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) ? '' : 'Enter a valid email address.');
  showError(message, message.value.trim().length >= 10 ? '' : 'Write at least 10 characters.');
  ok = !form.querySelector('.invalid');
  if (!ok) { status.textContent = ''; return; }
  // Opens the visitor's email app. Replace the address with yours.
  const body = encodeURIComponent(message.value + '\n\n' + name.value + ' (' + email.value + ')');
  window.location.href = 'mailto:your-email@example.com?subject=' + encodeURIComponent('Portfolio message from ' + name.value) + '&body=' + body;
  status.textContent = 'Opening your email app...';
  form.reset();
});
