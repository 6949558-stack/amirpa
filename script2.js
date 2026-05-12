const toggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (toggle && mobileNav) {
  toggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });
}

const track = document.getElementById('reviewsTrack');
const next = document.getElementById('nextReview');
const prev = document.getElementById('prevReview');

let reviewIndex = 0;

function cardsPerView() {
  if (window.innerWidth <= 640) return 1;
  if (window.innerWidth <= 980) return 2;
  return 3;
}

function moveReviews() {
  if (!track) return;

  const cards = track.querySelectorAll('.review-card');
  if (!cards.length) return;

  const maxIndex = Math.max(0, cards.length - cardsPerView());
  reviewIndex = Math.max(0, Math.min(reviewIndex, maxIndex));

  const cardWidth = cards[0].getBoundingClientRect().width + 18;
  track.style.transform = `translateX(${reviewIndex * cardWidth}px)`;
}

if (next && prev && track) {
  next.addEventListener('click', () => {
    reviewIndex++;
    moveReviews();
  });

  prev.addEventListener('click', () => {
    reviewIndex--;
    moveReviews();
  });

  window.addEventListener('resize', moveReviews);

  setInterval(() => {
    const cards = track.querySelectorAll('.review-card');
    const maxIndex = Math.max(0, cards.length - cardsPerView());

    reviewIndex = reviewIndex >= maxIndex ? 0 : reviewIndex + 1;
    moveReviews();
  }, 5500);

  moveReviews();
}
