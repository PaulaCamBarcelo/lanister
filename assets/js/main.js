// Small interactive behaviors: menu toggle, reveal on scroll, simple form handling

document.addEventListener('DOMContentLoaded', function(){
  // Year in footer
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  // Nav toggle
  const navToggle = document.getElementById('navToggle');
  const menu = document.getElementById('menu');
  navToggle && navToggle.addEventListener('click', function(){
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('show');
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
        // close menu on mobile
        if(menu.classList.contains('show')) menu.classList.remove('show');
      }
    });
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal, .flag, .portfolio-item');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  },{threshold:0.12});
  reveals.forEach(el=>io.observe(el));

  // Simple form handler (placeholder behavior)
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();
      if(!name || !email || !message){
        alert('Por favor completa todos los campos.');
        return;
      }
      // Simular envío
      const btn = form.querySelector('button[type=submit]');
      btn.disabled = true; btn.textContent = 'Enviando...';
      setTimeout(()=>{
        btn.disabled = false; btn.textContent = 'Enviar';
        alert('Gracias — tu mensaje fue recibido. Nos contactaremos pronto.');
        form.reset();
      }, 900);
    });
  }
});