'use strict';

export default function changePhoto() {
  const container = document.getElementById('command');

  function exchangeSrcData(item) {
    let temp;
    temp = item.src;
    item.src = item.dataset.img;
    item.dataset.img = temp;
  }

  container.addEventListener('mouseover', (event) => {
    let target = event.target;
    if (target.matches('.command__photo')) {
      exchangeSrcData(target);
    }
  });

  container.addEventListener('mouseout', (event) => {
    let target = event.target;
    if (target.matches('.command__photo')) {
      exchangeSrcData(target);
    }
  });
}
