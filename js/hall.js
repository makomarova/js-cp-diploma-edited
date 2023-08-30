function getHallConfig(hallConfig) {
    if (!hallConfig) {
        hallConfig = window.localStorage.getItem('hallConfig');
    }
    const confStepWrapper = document.querySelector('.conf-step__wrapper');
    confStepWrapper.innerHTML += hallConfig;
    const chairList = confStepWrapper.querySelectorAll('.conf-step__chair');

    chairList.forEach((c) =>
        c.addEventListener("click", (event) => {
            event.preventDefault();
            if (!c.classList.contains('conf-step__chair_disabled') && !c.classList.contains('conf-step__chair_taken')) {
                c.classList.toggle('conf-step__chair_selected');
            }
            let chairsSelected = Array.from(document.querySelectorAll('.conf-step__row .conf-step__chair_selected'));
            if (chairsSelected.length > 0) {
                acceptinButton.removeAttribute("disabled");
            } else {
                acceptinButton.setAttribute("disabled", true);
            };

        }));

    const acceptinButton = document.querySelector('.acceptin-button');
    acceptinButton.setAttribute("disabled", true);

    acceptinButton.addEventListener("click", (event) => {
        let listOfChairs = [];
        let rows = Array.from(document.querySelectorAll(".conf-step__row"));
        for (let i = 0; i < rows.length; i++) {
            let spanPlaces = Array.from(rows[i].querySelectorAll(".conf-step__chair"));
            for (let j = 0; j < spanPlaces.length; j++) {
                if (spanPlaces[j].classList.contains("conf-step__chair_selected")) {
                    let typePlace = (spanPlaces[j].classList.contains("conf-step__chair_standart")) ? "standart" : "vip";
                    listOfChairs.push({
                        "row": i + 1,
                        "place": j + 1,
                        "type": typePlace,
                    });
                };
            };

            window.localStorage.setItem('listOfChairs', JSON.stringify(listOfChairs));
            const confStepWrapper = document.querySelector('.conf-step__wrapper');
            window.localStorage.setItem('hallConfig', confStepWrapper.innerHTML);
            location = 'payment.html';
        }
    });
}

Array.from(document.querySelectorAll('.conf-step__row .conf-step__chair_selected')).forEach(s => s.classList.remove('.conf-step__chair_selected'));

let timestamp = window.localStorage.getItem('currentTimestemp');
let hallId = window.localStorage.getItem('hallId');
let seanceId = window.localStorage.getItem('seanceId');
let filmName = window.localStorage.getItem('filmName');
let hallName = window.localStorage.getItem('hallName');
let seanceTime = window.localStorage.getItem('seanceTime');
const buyingInfoTitle = document.querySelector('.buying__info-title');
buyingInfoTitle.textContent = filmName;
const buyingInfoStart = document.querySelector('.buying__info-start');
buyingInfoStart.textContent = 'Начало сеанса ' + seanceTime;
const buyingInfoHall = document.querySelector('.buying__info-hall');
buyingInfoHall.textContent = hallName;
document.querySelector('.price-standart').textContent = window.localStorage.getItem('priceStandart');
document.querySelector('.price-vip').textContent = window.localStorage.getItem('priceVip');

requestApi(`event=get_hallConfig&timestamp=${timestamp}&hallId=${hallId}&seanceId=${seanceId}`, getHallConfig);