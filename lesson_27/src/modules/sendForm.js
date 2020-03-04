export default function sendForm() {
  const errorMessage = '../images/icons/cross.png',
    loadMessage = '../images/icons/refresh.png',
    successMessage = '../images/icons/tick.png';

  const forms = document.querySelectorAll('form');
  const statusMessage = document.createElement('img');

  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  };

  let i = 0,
    animation = '';
  const rotateAnimate = () => {
    if (statusMessage.classList.contains('rotate')) {
      i += 1;
      statusMessage.style.transform = `rotate(${i}deg)`;
      requestAnimationFrame(rotateAnimate);
    } else {
      statusMessage.style.transform = 'rotate(0deg)';
    }
  };

  forms.forEach((item) => {
    item.addEventListener('submit', (event) => {
      console.log('item: ', item);
      event.preventDefault();

      item.appendChild(statusMessage);
      statusMessage.src = loadMessage;
      statusMessage.classList.add('rotate');
      animation = requestAnimationFrame(rotateAnimate);

      const formData = new FormData(item);
      let body = {};

      formData.forEach((value, key) => {
        body[key] = value;
      });

      postData(body)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('status network is not 200');
          }
          console.log(response);
          statusMessage.classList.remove('rotate');
          statusMessage.src = successMessage;
          item.querySelectorAll('input').forEach((input) => {
            input.value = '';
          });
        })
        .catch((error) => {
          statusMessage.classList.remove('rotate');
          statusMessage.src = errorMessage;
          console.log(error);
        });
    });
  });
}
