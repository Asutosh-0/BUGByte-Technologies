(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }));
  }

  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[data-page]').forEach(link => {
    if (link.dataset.page === currentPage) link.classList.add('active');
  });

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  } else revealEls.forEach(el => el.classList.add('visible'));

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  const form = document.querySelector('#project-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const service = (data.get('service') || 'Not specified').toString();
      const budget = (data.get('budget') || 'Not specified').toString();
      const message = (data.get('message') || '').toString().trim();
      const subject = encodeURIComponent(`Project enquiry from ${name || 'Website visitor'}`);
      const body = encodeURIComponent(
        `Hello BUTByte Technologys,\n\nI'd like to discuss a project.\n\nName: ${name}\nEmail: ${email}\nPhone: ${data.get('phone') || 'Not provided'}\nService: ${service}\nEstimated budget: ${budget}\n\nProject details:\n${message}\n\nSent from the BUTByte Technologys website.`
      );
      // Replace this address with your real business email before publishing.
      window.location.href = `mailto:hello@butbytetechnologys.com?subject=${subject}&body=${body}`;
      const status = document.querySelector('#form-status');
      if (status) status.textContent = 'Your email app should open with the enquiry pre-filled. If it does not, email us directly.';
    });
  }
})();
