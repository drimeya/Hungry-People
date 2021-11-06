'use strict';

document.addEventListener('DOMContentLoaded', function () {
  function scroll() {
    const links = document.querySelectorAll('a[href*="#"]');

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.getAttribute('href');
        document.querySelector(`${id}`).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

      });
    });
  }
  scroll();

  function scrollUp(selector, height) {
    const up = document.querySelector(selector);

    document.addEventListener('scroll', () => {
      if (document.documentElement.scrollTop > height) {
        up.style.display = 'block';
      } else {
        up.style.display = 'none';
      }
    });
  }
  scrollUp('.down_up', 1000);

  function hamburger() {
    const hamburger = document.querySelector('.hamburger'),
          nav = document.querySelector('.nav'),
          ul = nav.querySelector('ul'),
          navItems = nav.querySelectorAll('.nav__item');

    hamburger.addEventListener('click', () => {
      nav.classList.toggle('nav_active');
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        nav.classList.remove('nav_active');
      });
    });

    document.addEventListener('click', (e) => {
      if (e.target != ul && e.target != hamburger) {
        nav.classList.remove('nav_active');
      }
    });
  }
  hamburger();

  function showSocial() {
    const trigger = document.querySelector('.social__arrow'),
          social = document.querySelector('.social');

    trigger.addEventListener('click', () => {
      social.classList.toggle('social_active');
    });

    document.addEventListener('click', (e) => {
      if (e.target != social && e.target != trigger) {
        social.classList.remove('social_active');
      }
    });
  }
  showSocial();

  

 
  function menu() {
    fetch('menu/menu.json', {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(data => data.text())
    .then(data => JSON.parse(data))
    .then(data => {
      const tabParent = document.querySelector('.tabs'),
            tab = document.querySelectorAll('.tab'),
            tabContent = document.querySelector ('.menu__tab');
      
      function createMenuItems(key) {
        let currentTab = data[key];

        currentTab.forEach (item => {
          const menuItem = document.createElement('div');
          menuItem.classList.add('menu__item');

          menuItem.innerHTML = `
            <h3 class="menu__item-name">${item.name}</h3>
            <p class="menu__item-descr">${item.descr}</p>
            <div class="menu__item-price">${item.price}</div>
          `;
          tabContent.append(menuItem);
        });
      }
      createMenuItems('soupe');
      
      tabParent.addEventListener('click', (event) => {
        if (!event.target.classList.contains('.tab')) {
          tab.forEach(item => {
            item.classList.remove('tab_active');
          });
          event.target.classList.add('tab_active');

          tabContent.innerHTML = '';
          for (let key in data) {
            if (key == event.target.innerHTML) {
              createMenuItems(key);
            }
          }
        }
      });
    });
  }
  menu();

  function slider() {
    const sliderItems = document.querySelectorAll('.slider__item'),
          sliderWrap = document.querySelector('.slider'),
          dotsCreate = document.createElement('div');
    let dots;

    function createDots() {
      dotsCreate.classList.add('slider__dot-wrapper');

      sliderWrap.append(dotsCreate);
      for (let i = 0; i < sliderItems.length; i++) {
        let dot = document.createElement('div');
        dotsCreate.append(dot);
        dot.classList.add('slider__dot');
        if (i === 0) {
          dot.classList.add('slider__dot_active');
        }
      }
    }

    function sliderSwitch(i) {
      sliderItems.forEach(item => {
        item.classList.remove('slider__item_active');
      });

      sliderItems[i].classList.add('slider__item_active');
    }

    function dotsSwitch(item) {
      dots.forEach(x => {
        x.classList.remove('slider__dot_active');
      });

      item.classList.add('slider__dot_active');
    }

    function switcher() {
      dots = document.querySelectorAll('.slider__dot');

      dots.forEach((item, i) => {
        item.addEventListener('click', () => {
          dotsSwitch(item);

          sliderSwitch(i);
        });
      });
    }

    function sliderAutoplay() {
      let i = 0;

      let timer = setInterval(() => {
        if (i === sliderItems.length) {
          i = 0;
        }
        dotsSwitch(dots[i]);
        sliderSwitch(i);
        i++;
      }, 5000);

      dots.forEach(item => {
        item.addEventListener('click', () => {
          clearInterval(timer);

          timer = setInterval(() => {
            if (i === sliderItems.length) {
              i = 0;
            }
            dotsSwitch(dots[i]);
            sliderSwitch(i);
            i++;
          }, 5000);
        });
      });
    }
    createDots();
    switcher();
    sliderAutoplay();
  }
  slider();

  function gallery() {
    const galleryWrap = document.querySelector('.gallery'),
          galleryItems = galleryWrap.querySelectorAll('img'),
          overlay = document.querySelector('.overlay'),
          modalContent = document.querySelector('.modal__content'),
          close = document.querySelector('.modal__close');


    function showHint() {
      const overlayImg = document.createElement('div');

      overlayImg.classList.add('overlay-img');

      galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
          item.before(overlayImg);
        });
      });
  
      galleryItems.forEach(item => {
        item.addEventListener('mouseleave', () => {
          overlayImg.remove();
        });
      });
    }
    //при клике будет появляться оверлей и окно с картинкой и стрелочками по краям, галерея зациклена
    function showGallery() {
      galleryItems.forEach((item, i) => {
        item.addEventListener('click', () => {
          overlay.classList.add('active');

          if (i >= 4) {
            i = i - 4;
            modalContent.innerHTML = `<picture><source srcset="img/gallery/carousel/gallery-big-${i + 1}.webp" type="image/webp"><img src="img/gallery/carousel/gallery-big-${i + 1}.jpg" alt="${i + 1}"></picture>`;
          } else {
            modalContent.innerHTML = `<picture><source srcset="img/gallery/carousel/gallery-big-${i + 1}.webp" type="image/webp"><img src="img/gallery/carousel/gallery-big-${i + 1}.jpg" alt="${i + 1}"></picture>`;
          }

          document.body.style.height = '100nh';
          document.body.style.overflow = 'hidden';
        });
      });
    }

    function closeGallery() {
      function closeModal(closeTrigger, overlayLayer) {
        closeTrigger.addEventListener('click', () => {
          overlayLayer.classList.remove('active');
          document.body.style.height = '';
          document.body.style.overflow = '';
          modalContent.innerHTML = '';
        });
      }

      closeModal(close, overlay);
      closeModal(overlay, overlay);
    }
  
    showHint();
    showGallery();
    closeGallery();
  }
  gallery();

  function sentForm() {
    const forms = document.querySelectorAll('form'),
        overlay = document.querySelector('.overlay'),
        modal = document.querySelector('.modal'),
        content = modal.querySelector('.modal__content'),
        messages = {
          success: 'Thank you! We will contact you during the day',
          loading: 'Loading...',
          error: 'Something went wrong'
        };

    function createModal() {
      overlay.classList.add('active');
      modal.classList.add('modal_form');
    }

    function modalTimeOut() {
      setTimeout(() => {
        overlay.classList.add('overlay_slideOut');
      }, 3000);
      setTimeout(() => {
        overlay.classList.remove('active');
        overlay.classList.remove('overlay_slideOut');
        modal.classList.remove('modal_form');
        content.innerHTML = '';
      }, 3280);
    }
    forms.forEach( form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(form);

        let  obj = {};
        formData.forEach( (value, key) => {
          obj[key] = value;
        });

        fetch('server.php', {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            'Content-type': 'application/json'
          }
        })
        .then(data => data.text())
        .then(data => {
          console.log(data);
          createModal();
          content.innerHTML = messages.loading;
        })
        .then(() => {
          content.innerHTML = messages.success;
        })
        .catch( () => {
          content.innerHTML = messages.error;
        })
        .finally(() => {
          form.reset();
          modalTimeOut();
        });
      });
    });
  }
  sentForm();
});