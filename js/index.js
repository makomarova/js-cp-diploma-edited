let days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
let nowDate = new Date();
nowDate.setHours(0, 0, 0);
let timestamp = Math.trunc( (new Date(nowDate.getTime()))/1000);
window.localStorage.setItem('currentTimestemp', timestamp);
let dayOfWeek = days[nowDate.getDay()];
const daysOfWeek = document.querySelectorAll('.page-nav__day-week');
const allDay = document.querySelectorAll('.page-nav__day');
let i = 0;

allDay.forEach((d, number) =>
{
	const dayNumber = d.querySelector('.page-nav__day-number');
	const dayOfWeek = d.querySelector('.page-nav__day-week');
	nowDate.setDate(nowDate.getDate() + i);
	dayOfWeek.textContent = days[(nowDate.getDay()) % 7];
	i = 1;
	dayNumber.textContent = nowDate.getDate();
	d.dataset.timestamp = timestamp;
	timestamp += 86400;
	if (dayOfWeek.textContent === 'Сб' || dayOfWeek.textContent === 'Вс')
	{
		d.classList.add('page-nav__day_weekend');
	}
});

allDay.forEach((d) =>
	d.addEventListener("click", (event) =>
	{
		event.preventDefault();
		document.querySelector(".page-nav__day_chosen").classList.remove("page-nav__day_chosen");
		d.classList.add("page-nav__day_chosen");
		window.localStorage.setItem('timestemp', d.dataset.timestamp);
		const movieSeancesTimeNotActive = document.querySelectorAll('.movie-seances__time');

		movieSeancesTimeNotActive.forEach(m =>
		{
			if (d.classList.contains('page-nav__day_today'))
			{
				const date = new Date();
				const minutes = date.getHours() * 60 + date.getMinutes();

				if (minutes > (Number(m.dataset.seanceStart)))
				{
					m.classList.add('movie-seances__time_not_active');
				}

			}
			else
			{
				m.classList.remove('movie-seances__time_not_active');
			}
		});
	})
);

document.querySelector(".page-nav__day_today").click();
let cinema = {};

function getHallsFilmsSeanses(data)
{
	cinema.halls = data.halls.result;
	cinema.films = data.films.result;
	cinema.seances = data.seances.result;
	cinema.halls = cinema.halls.filter(hall => hall.hall_open === '1');
	let main = document.querySelector('main');
	cinema.films.forEach((film) =>
	{
		let seancesHTML = '';
		let filmId = film.film_id;

		cinema.halls.forEach((hall) =>
		{
			let seances = cinema.seances.filter(seance => ((seance.seance_hallid == hall.hall_id) && (seance.seance_filmid == filmId)));
			if (seances.length > 0)
			{
				seancesHTML += `
                   <div class="movie-seances__hall">
                     <h3 class="movie-seances__hall-title">${hall.hall_name}</h3>
                     <ul class="movie-seances__list">`
				seances.forEach(seance =>
				{
					let curTimestamp = window.localStorage.getItem('currentTimestemp');
					const date = new Date();
					const minutes = date.getHours() * 60 + date.getMinutes();
					if (minutes > (Number(seance.seance_start)))
					{
						seancesHTML += `<li class="movie-seances__time-block"><a class="movie-seances__time movie-seances__time_not_active"  href="hall.html" data-film-name="${film.film_name}" data-film-id="${film.film_id}" data-hall-id="${hall.hall_id}" data-hall-name="${hall.hall_name}" data-price-vip="${hall.hall_price_vip}" data-price-standart="${hall.hall_price_standart}" data-seance-id="${seance.seance_id}" 
                        data-seance-start="${seance.seance_start}" data-seance-time="${seance.seance_time}">${seance.seance_time}</a></li>`

					}
					else
					{
						seancesHTML += `<li class="movie-seances__time-block"><a class="movie-seances__time"   href="hall.html" data-film-name="${film.film_name}" data-film-id="${film.film_id}" data-hall-id="${hall.hall_id}" data-hall-name="${hall.hall_name}" data-price-vip="${hall.hall_price_vip}" data-price-standart="${hall.hall_price_standart}" data-seance-id="${seance.seance_id}" 
                     data-seance-start="${seance.seance_start}" data-seance-time="${seance.seance_time}">${seance.seance_time}</a></li>`
					}
				});
				seancesHTML += `
                   </ul>
                   </div>`
			};
		});

		if (seancesHTML)
		{
			main.innerHTML += `
                 <section class="movie">
                   <div class="movie__info">
                     <div class="movie__poster">
                       <img class="movie__poster-image" alt="${film.film_name} постер" src="${film.film_poster}">
                     </div>
                     <div class="movie__description">
                       <h2 class="movie__title">${film.film_name}</h2>
                       <p class="movie__synopsis">${film.film_description}</p>
                       <p class="movie__data">
                         <span class="movie__data-duration">${film.film_duration} мин.</span>
                         <span class="movie__data-origin">${film.film_origin}</span>
                       </p>
                     </div>
                   </div>
                   ${seancesHTML}
                 </section>`
		};

	});

	let movieSeances = document.querySelectorAll('.movie-seances__time');
	movieSeances.forEach((s) =>
		s.addEventListener("click", (event) =>
		{
			event.preventDefault();
			let currentTimestemp = s.dataset.seanceStart * 60 + Number(window.localStorage.getItem('timestemp'));
			window.localStorage.setItem('hallId', s.dataset.hallId);
			window.localStorage.setItem('filmName', s.dataset.filmName);
			window.localStorage.setItem('hallName', s.dataset.hallName);
			window.localStorage.setItem('seanceTime', s.dataset.seanceTime);
			window.localStorage.setItem('seanceId', s.dataset.seanceId);
			window.localStorage.setItem('currentTimestemp', currentTimestemp);
			window.localStorage.setItem('priceVip', s.dataset.priceVip);
			window.localStorage.setItem('priceStandart', s.dataset.priceStandart);
			let hallConfig = cinema.halls.find(h => h.hall_id === s.dataset.hallId).hall_config;
			window.localStorage.setItem('hallConfig', hallConfig);
			location = 'hall.html';
		})
	);
}

requestApi('event=update', getHallsFilmsSeanses);