document.addEventListener('DOMContentLoaded', function () {
  function scroll() {
    const links = document.querySelectorAll('a[href*="#"]');

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.getAttribute('href');
        document.querySelector(`${id}`).scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      });
    });
  }
  scroll();

  function Tabs() {
    const tabParent = document.querySelector('.tabs'),
          tab = document.querySelectorAll('.tab'),
          tabContent = document.querySelectorAll('.menu__tab');

    function changeTabs(i) {
      tabContent.forEach(item => {
        item.classList.remove('menu__tab_active');
        tabContent[i].classList.add('menu__tab_active');
      });
    }

    tabParent.addEventListener('click', (event) => {
      if (!event.target.classList.contains('.tab')) {
        tab.forEach((item, i) => {
          item.classList.remove('tab_active');
          if (event.target == item) {
            event.target.classList.add('tab_active');
            changeTabs(i);
          }
        });
      }
    });
  }
  Tabs();

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
            modalContent.innerHTML = `<img src="img/gallery/carousel/gallery-big-${i + 1}.jpg" alt="${i + 1}">`;
          } else {
            modalContent.innerHTML = `<img src="img/gallery/carousel/gallery-big-${i + 1}.jpg" alt="${i + 1}">`;
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

  function modalForm() {
    const btn = document.querySelectorAll('.button_form'),
          overlay = document.querySelector('.overlay'),
          modal = document.querySelector('.modal');

    btn.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        
        overlay.classList.add('active');
        modal.classList.add('modal_form');
        setTimeout(() => {
          overlay.classList.add('overlay_slideOut');
        }, 3000);
        setTimeout(() => {
          overlay.classList.remove('active');
          overlay.classList.remove('overlay_slideOut');
          modal.classList.remove('modal_form');
        }, 3280);
      });
    });

    
  }
  modalForm();

});