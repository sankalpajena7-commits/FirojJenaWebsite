// ============================================================
// FIROJ JENA — Portfolio Site — Main JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // ---- Mobile menu toggle ----
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px,5px)' : '';
      spans[1].style.opacity = navLinks.classList.contains('open') ? '0' : '1';
      spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px,-5px)' : '';
    });
  }

  // ---- Active nav link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Scroll reveal (AOS-like) ----
  const animateEl = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => entry.target.classList.add('aos-animate'), parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  animateEl.forEach(el => observer.observe(el));

  // ---- Counter animation ----
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    let count = 0;
    const speed = Math.max(1, Math.ceil(target / 60));
    const update = () => {
      count = Math.min(count + speed, target);
      counter.textContent = count + (counter.getAttribute('data-suffix') || '');
      if (count < target) requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { update(); io.disconnect(); }
    });
    io.observe(counter);
  });

  // ---- Hero cursor glow ----
  const hero = document.querySelector('.hero');
  const glow = document.querySelector('.hero__glow');
  if (hero && glow && window.matchMedia('(pointer:fine)').matches) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      glow.style.left = (e.clientX - rect.left) + 'px';
      glow.style.top = (e.clientY - rect.top) + 'px';
    });
  }

  // ---- Contact form submission (FormSubmit.co — emails firoj.jena@clancy-global.com) ----
  const form = document.getElementById('contactForm');
  if (form) {
    const originalBtnText = form.querySelector('button[type="submit"]').textContent;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData
        });

        if (response.ok) {
          btn.textContent = '✓ Message Sent!';
          btn.style.background = '#1f6f5c';
          btn.style.color = '#fff';
          form.reset();
        } else {
          btn.textContent = '✗ Failed — Try Again';
          btn.style.background = '#b3423c';
          btn.style.color = '#fff';
        }
      } catch (error) {
        console.error('Contact form submission failed:', error);
        btn.textContent = '✗ Failed — Try Again';
        btn.style.background = '#b3423c';
        btn.style.color = '#fff';
      }

      setTimeout(() => {
        btn.textContent = originalBtnText;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.color = '';
      }, 3000);
    });
  }
});
