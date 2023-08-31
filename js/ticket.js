let listOfChairs = JSON.parse(window.localStorage.getItem('listOfChairs'));
let places = listOfChairs[0].row + '/' + listOfChairs[0].place;

for (let i = 1; i < listOfChairs.length; i++)
{
	places += ', ' + listOfChairs[i].row + '/' + listOfChairs[i].place;
}

document.querySelector(".ticket__title").textContent = window.localStorage.getItem('filmName');
document.querySelector(".ticket__chairs").textContent = places;
document.querySelector(".ticket__hall").textContent = window.localStorage.getItem('hallName');
document.querySelector(".ticket__start").textContent = window.localStorage.getItem('seanceTime');

let date = new Date();
date.setDate(date.getDate() + Number(window.localStorage.getItem('timestemp')) / 86400);

let dateStr = date.toLocaleDateString("ru-RU",
{
	day: "2-digit",
	month: "2-digit",
	year: "numeric"
});

let textQR = `
Фильм: ${window.localStorage.getItem('filmName')}
Зал: ${window.localStorage.getItem('hallName')}
Ряд/Место ${places}
Дата: ${dateStr}
Начало сеанса: ${window.localStorage.getItem('seanceTime')}
Билет действителен строго на свой сеанс`;

let qrcod = QRCreator(textQR,
{
	image: "SVG"
});

document.querySelector(".ticket__info-qr").append(qrcod.result);