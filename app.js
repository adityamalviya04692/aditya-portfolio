document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. THEME TOGGLER (Light / Dark Mode)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  // Cache check
  const cachedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  
  if (cachedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  themeToggleBtn.addEventListener('click', () => {
    let targetTheme = 'dark';
    if (document.documentElement.getAttribute('data-theme') !== 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      targetTheme = 'light';
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', targetTheme);
  });

  /* ==========================================================================
     2. MOBILE MENU DRAWER
     ========================================================================== */
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navLinksList = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle('open');
    navLinksList.classList.toggle('open');
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinksList.classList.contains('open')) {
          toggleMobileMenu();
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (navLinksList.classList.contains('open') && 
          !navLinksList.contains(e.target) && 
          !mobileMenuToggle.contains(e.target)) {
        toggleMobileMenu();
      }
    });
  }

  /* ==========================================================================
     3. INTERACTIVE PARTICLE NETWORK CANVAS
     ========================================================================== */
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };
    
    // Density calculation based on viewport width
    let particleCount = window.innerWidth > 768 ? 72 : 36;
    
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particleCount = window.innerWidth > 768 ? 72 : 36;
      initParticles();
    }
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.2; // Slow, smooth speeds
        this.vy = (Math.random() - 0.5) * 0.2;
        this.r = Math.random() * 1.6 + 0.4;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Boundaries bounce
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        // Soft blue particle style
        ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'light' 
          ? 'rgba(56, 189, 248, 0.4)' 
          : 'rgba(125, 211, 252, 0.5)';
        ctx.fill();
      }
    }
    
    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    
    function drawLines() {
      const connectDist = 140;
      const mouseDist = 160;
      
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        // Lines to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < connectDist) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Draw gradient style matching variables
            ctx.strokeStyle = document.documentElement.getAttribute('data-theme') === 'light'
              ? `rgba(14, 165, 233, ${(1 - dist/connectDist) * 0.15})`
              : `rgba(56, 189, 248, ${(1 - dist/connectDist) * 0.22})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        
        // Line to cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < mouseDist) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(20, 184, 166, ${(1 - dist/mouseDist) * 0.35})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      drawLines();
      requestAnimationFrame(animate);
    }
    
    // Mouse move listeners
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    
    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });
    
    window.addEventListener('resize', resizeCanvas);
    
    resizeCanvas();
    animate();
  }

  /* ==========================================================================
     3.5 PORTRAIT 3D TILT & PARALLAX EFFECT
     ========================================================================== */
  const portraitContainer = document.querySelector('.portrait-container');
  const portraitFrame = document.querySelector('.portrait-frame');
  const portraitImg = document.querySelector('.portrait-img');

  if (portraitContainer && portraitFrame && portraitImg) {
    const tiltXMax = 20; 
    const tiltYMax = 20;

    portraitContainer.addEventListener('mousemove', (e) => {
      const rect = portraitContainer.getBoundingClientRect();
      
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      portraitFrame.style.setProperty('--mouse-x', `${x}px`);
      portraitFrame.style.setProperty('--mouse-y', `${y}px`);
      
      const percentX = x / rect.width;
      const percentY = y / rect.height;
      
      const rotateY = (percentX - 0.5) * tiltXMax;
      const rotateX = (0.5 - percentY) * tiltYMax;
      
      portraitContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      portraitImg.style.transform = `translate3d(${(percentX - 0.5) * -16}px, ${(percentY - 0.5) * -16}px, 45px) scale(1.08)`;
    });

    portraitContainer.addEventListener('mouseleave', () => {
      portraitContainer.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      portraitContainer.style.transform = 'rotateX(0deg) rotateY(0deg)';
      
      portraitImg.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      portraitImg.style.transform = 'translate3d(0px, 0px, 30px) scale(1.02)';
    });

    portraitContainer.addEventListener('mouseenter', () => {
      portraitContainer.style.transition = 'none';
      portraitImg.style.transition = 'none';
    });
  }

  /* ==========================================================================
     4. APPLE-STYLE SCROLL REVEALS & ACTIVE STATE
     ========================================================================== */
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const sections = document.querySelectorAll('section');
  const header = document.getElementById('header');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px' // Reveal shortly before crossing viewport
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Header Scroll State
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Active Link Tracking
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    root: null,
    threshold: 0.35 // Active link changes when section occupies 35% viewport
  });

  sections.forEach(sec => {
    sectionObserver.observe(sec);
  });

  /* ==========================================================================
     5. STATS ANIMATED COUNT-UP
     ========================================================================== */
  const statValues = document.querySelectorAll('.stat-val, .metric-num');
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseFloat(el.getAttribute('data-target'));
        animateCountUp(el, targetVal);
        statsObserver.unobserve(el); // Only run once
      }
    });
  }, {
    root: null,
    threshold: 0.2
  });

  function animateCountUp(element, target) {
    let start = 0;
    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();
    const isDecimal = target % 1 !== 0;

    function updateNumber(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out cubic formula
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentVal = easeProgress * target;
      
      if (isDecimal) {
        element.textContent = currentVal.toFixed(1);
      } else {
        element.textContent = Math.floor(currentVal);
      }

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        element.textContent = isDecimal ? target.toFixed(1) : target;
      }
    }

    requestAnimationFrame(updateNumber);
  }

  statValues.forEach(val => {
    statsObserver.observe(val);
  });

  /* ==========================================================================
     6. FORM VALIDATION & UX
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const successFeedback = document.getElementById('form-success');
  const errorFeedback = document.getElementById('form-error');

  if (contactForm) {
    const fields = contactForm.querySelectorAll('input, textarea');
    
    fields.forEach(field => {
      // Trigger user validity check on exit
      field.addEventListener('blur', () => {
        field.checkValidity();
      });
      
      // Clean invalid classes immediately on edits
      field.addEventListener('input', () => {
        if (field.validity.valid) {
          field.classList.remove('invalid');
        }
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      fields.forEach(field => {
        if (!field.checkValidity()) {
          isValid = false;
          // Force blur triggers to reveal error announcements
          field.dispatchEvent(new Event('blur'));
        }
      });

      if (!isValid) {
        errorFeedback.textContent = "Please verify your input fields.";
        errorFeedback.style.display = 'block';
        successFeedback.style.display = 'none';
        return;
      }

      // Submission animation
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Establishing connection...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        successFeedback.textContent = "Message transmitted successfully! Thank you.";
        successFeedback.style.display = 'block';
        errorFeedback.style.display = 'none';
        contactForm.reset();
        
        setTimeout(() => {
          successFeedback.style.display = 'none';
        }, 5000);
      }, 1500);
    });
  }
});
