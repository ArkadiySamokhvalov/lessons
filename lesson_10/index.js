/*
1)Восстановить порядок книг.
2)Заменить картинку заднего фона на другую из папки image
3)Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
4)Удалить рекламу со страницы
5)Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
6)в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
*/

//1)
let arrBook = document.querySelectorAll('.book');
console.log('arrBook: ', arrBook);
let container = document.querySelector('.books');

container.appendChild(arrBook[1]); //1
container.appendChild(arrBook[0]); //2
container.appendChild(arrBook[4]); //3
container.appendChild(arrBook[3]); //4
container.appendChild(arrBook[5]); //5
container.appendChild(arrBook[2]); //6

//2)
document.body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

//3)
arrBook[4].querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';

//4)
let adv = document.querySelector('.adv');
adv.remove();

//5)
let li = arrBook[0].getElementsByTagName('li');
li[3].after(li[6]);
li[4].after(li[8]);
li[9].after(li[2]);

li = arrBook[5].getElementsByTagName('li');
li[1].after(li[9]);
li[2].after(li[4]);
li[3].after(li[5]);
li[8].after(li[6]);

//6)
let liElem = document.createElement('li');
liElem.textContent = 'Глава 8: За пределами ES6';
li = arrBook[2].getElementsByTagName('li');
li[8].insertAdjacentElement('afterend', liElem);