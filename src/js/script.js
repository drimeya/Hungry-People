document.addEventListener('DOMContentLoaded', function () {
    // инициализация слайдера
  new SimpleAdaptiveSlider('.slider', {
    loop: true,
    autoplay: true,
    interval: 5000,
    swipe: true,
  });

  const tabParent = document.querySelector('.tabs'),
        tab = document.querySelectorAll('.tab'),
        tabContent = document.querySelectorAll('.menu__tab');

  function toggleTabs (i) {
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
          toggleTabs (i);
        }
      });
    }
  });
});