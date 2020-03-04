export default function toggleMenu() {
  const menu = document.querySelector('menu');

  document.body.addEventListener('click', () => {
    if (event.target.matches('menu > ul > li > a, .menu, .menu > img, .menu > small, .close-btn')) {
      menu.classList.toggle('active-menu');
    } else if (menu.classList.contains('active-menu') && !event.target.matches('menu')) {
      menu.classList.remove('active-menu');
    }

    if (event.target.matches('menu > ul > li > a, main > a > img')) {
      const blockID = event.target.closest('a').getAttribute('href').substr(1);
      event.preventDefault();
      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}
