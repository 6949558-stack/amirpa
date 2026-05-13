const body = document.body;
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeMenu');
const menu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');

function openMenu() {
  menu.classList.add('open');
  overlay.classList.add('show');
  body.classList.add('menu-open');
}
function closeMenu() {
  menu.classList.remove('open');
  overlay.classList.remove('show');
  body.classList.remove('menu-open');
}
menuBtn?.addEventListener('click', openMenu);
closeBtn?.addEventListener('click', closeMenu);
overlay?.addEventListener('click', closeMenu);
document.querySelectorAll('.mobile-menu a').forEach(link => link.addEventListener('click', closeMenu));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

async function loadUpdates() {
  const list = document.getElementById('updatesList');
  if (!list) return;
  try {
    const response = await fetch('updates.json', { cache: 'no-store' });
    const data = await response.json();
    list.innerHTML = data.map(item => `
      <article class="update-card">
        <div class="update-icon"><i class="${item.icon || 'fa-solid fa-bell'}"></i></div>
        <div>
          <span class="update-tag">${item.tag || 'עדכון'}</span>
          <h3>${item.title || ''}</h3>
          <p>${item.text || ''}</p>
        </div>
        <time>${item.date || ''}</time>
      </article>
    `).join('');
  } catch (error) {
    list.innerHTML = `<article class="update-card"><div class="update-icon"><i class="fa-solid fa-bell"></i></div><div><span class="update-tag">עדכון</span><h3>כאן יופיעו עדכונים להורים</h3><p>אפשר לערוך את קובץ updates.json ולהוסיף הודעות חדשות.</p></div><time></time></article>`;
  }
}
loadUpdates();