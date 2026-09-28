/**
 * JavaScript natif pour le Portfolio de Fatim Ngom
 * Navigation, filtres, lightbox et menu mobile
 */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------------------
     1. Filtrage générique (projets sur index + designs)
     Le conteneur .projects-filter utilise data-target pour
     cibler la grille à filtrer.
  ----------------------------------------------------------- */
  const filterGroups = document.querySelectorAll('.projects-filter');

  filterGroups.forEach(group => {
    const buttons = group.querySelectorAll('.filter-btn');
    const targetSelector = group.getAttribute('data-target') || '.project-card';
    const cards = document.querySelectorAll(targetSelector);

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        cards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  });

  /* -----------------------------------------------------------
     2. Navigation active au défilement (uniquement sur index)
  ----------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const isHomePage = !document.querySelector('.nav-link[href="designs.html"].active');

  if (sections.length && isHomePage) {
    window.addEventListener('scroll', () => {
      let current = '';
      const scrollPosition = window.pageYOffset + 150;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}` || href === `index.html#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }

  /* -----------------------------------------------------------
     3. Menu Mobile Toggle
  ----------------------------------------------------------- */
  const burgerBtn = document.getElementById('burgerBtn');
  const navLinksContainer = document.getElementById('navLinks');

  if (burgerBtn && navLinksContainer) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = navLinksContainer.classList.toggle('mobile-open');
      if (isOpen) {
        navLinksContainer.style.display = 'flex';
        navLinksContainer.style.flexDirection = 'column';
        navLinksContainer.style.position = 'absolute';
        navLinksContainer.style.top = '100%';
        navLinksContainer.style.left = '0';
        navLinksContainer.style.right = '0';
        navLinksContainer.style.background = '#FCFAF8';
        navLinksContainer.style.padding = '1.5rem';
        navLinksContainer.style.borderBottom = '1px solid #E8E1DC';
        navLinksContainer.style.gap = '1rem';
      } else {
        navLinksContainer.style.display = '';
      }
    });
  }

  /* -----------------------------------------------------------
     4. Lightbox pour la galerie Designs
  ----------------------------------------------------------- */
  const designItems = document.querySelectorAll('.design-item');
  const lightbox = document.getElementById('lightbox');

  if (lightbox && designItems.length) {
    const lbImg = lightbox.querySelector('img');
    const lbTitle = lightbox.querySelector('h4');
    const lbDesc = lightbox.querySelector('p');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    const openLightbox = (item) => {
      const img = item.querySelector('img');
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbTitle.textContent = item.dataset.title || '';
      lbDesc.textContent = item.dataset.desc || '';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    designItems.forEach(item => {
      item.addEventListener('click', () => openLightbox(item));
    });

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });
  }
});
