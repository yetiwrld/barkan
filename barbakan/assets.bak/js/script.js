document.addEventListener('DOMContentLoaded', function() {
  var header = document.querySelector('.site-header');
  var navLinks = document.querySelectorAll('.site-nav a, .mobile-nav a');
  var mobileNav = document.querySelector('.mobile-nav');
  var mobileToggle = document.querySelector('.mobile-toggle');
  var menuTabs = document.querySelectorAll('.menu-tab');
  var menuContents = document.querySelectorAll('.menu-tab-content');
  var sectionObserver;
  if ('IntersectionObserver' in window) {
    sectionObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('section[id]').forEach(function(sec) {
      sectionObserver.observe(sec);
    });
  }
  window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function() {
      var isOpen = mobileNav.classList.toggle('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      mobileNav.querySelectorAll('a').forEach(function(a) {
        a.addEventListener('click', function() {
          mobileNav.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    });
  }
  menuTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      var target = tab.getAttribute('data-tab');
      menuTabs.forEach(function(t) { t.classList.remove('active'); });
      menuContents.forEach(function(c) { c.classList.remove('active'); });
      tab.classList.add('active');
      var targetEl = document.getElementById(target);
      if (targetEl) { targetEl.classList.add('active'); }
    });
  });
  var form = document.querySelector('.catering-form form');
  var formSuccess = document.querySelector('.form-success');
  if (form && formSuccess) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]');
      var email = form.querySelector('[name="email"]');
      var type = form.querySelector('[name="type"]');
      if (!name.value.trim()) { name.focus(); return; }
      if (!email.value.trim() || !email.value.includes('@')) { email.focus(); return; }
      form.style.display = 'none';
      formSuccess.classList.add('show');
    });
  }
  var contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = contactForm.querySelector('[name="name"]');
      var email = contactForm.querySelector('[name="email"]');
      if (!name.value.trim()) { name.focus(); return; }
      if (!email.value.trim() || !email.value.includes('@')) { email.focus(); return; }
      var btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Message Sent!';
      btn.disabled = true;
      setTimeout(function() {
        contactForm.reset();
        btn.textContent = 'Send Message';
        btn.disabled = false;
      }, 3000);
    });
  }
});