const ticketTitle = document.querySelector('.ticket__title');
const ticketChairs = document.querySelector('.ticket__chairs');
const ticketHall = document.querySelector('.ticket__hall');
const ticketStart = document.querySelector('.ticket__start');
const ticketCost = document.querySelector('.ticket__cost');
let listOfChairs = JSON.parse(window.localStorage.getItem('listOfChairs'));
ticketTitle.textContent = window.localStorage.getItem('filmName');
ticketHall.textContent = window.localStorage.getItem('hallName');
ticketStart.textContent = window.localStorage.getItem('seanceTime');;
ticketChairs.textContent = listOfChairs[0].row + '/' + listOfChairs[0].place;
let coast = Number(listOfChairs[0].type === "standart" ? window.localStorage.getItem('priceStandart') : window.localStorage.getItem('priceVip'));

for (let i = 1; i < listOfChairs.length; i++)
{
    ticketChairs.textContent += ', ' + listOfChairs[i].row + '/' + listOfChairs[i].place;
    coast += Number(listOfChairs[i].type === "standart" ? window.localStorage.getItem('priceStandart') : window.localStorage.getItem('priceVip'));
}
ticketCost.textContent = coast;

const acceptinButtonTicket = document.querySelector('.ticket__info-wrapper').querySelector('.acceptin-button');

function result(data)
{
    console.log(data);
}

acceptinButtonTicket.addEventListener("click", (event) =>
{
    event.preventDefault();
    let hallConfig = window.localStorage.getItem('hallConfig');
    let textreq = `event=sale_add&timestamp=${window.localStorage.getItem('currentTimestemp')}&hallId=${window.localStorage.getItem('hallId')}&seanceId=${window.localStorage.getItem('seanceId')}&hallConfiguration=${hallConfig}`;
    requestApi(textreq, result);
    location = 'ticket.html';
});