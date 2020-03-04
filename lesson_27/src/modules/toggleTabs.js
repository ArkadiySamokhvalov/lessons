export default function toggleTabs() {
  const tabHeader = document.querySelector('.service-header'),
    tabs = tabHeader.querySelectorAll('.service-header-tab'),
    tabContent = document.querySelectorAll('.service-tab');

  const toggleTabContent = (index) => {
    for (let i = 0; i < tabContent.length; i++) {
      if (index === i) {
        tabs[i].classList.add('active');
        tabContent[i].classList.remove('d-none');
      } else {
        tabs[i].classList.remove('active');
        tabContent[i].classList.add('d-none');
      }
    }
  };

  tabHeader.addEventListener('click', (event) => {
    let target = event.target.closest('.service-header-tab');

    if (target) {
      tabs.forEach((item, index) => {
        if (item === target) {
          toggleTabContent(index);
        }
      });
    }
  });
}
