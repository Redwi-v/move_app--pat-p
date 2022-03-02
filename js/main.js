window.onload = function () {
	const Api_key = 'e0bc91ba-fc3b-49c4-9a3b-52eaa9bc691e';
	const ApiURL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=2';
	const form = document.querySelector('.header__search-wraper');
	const search = document.querySelector('.header__search');

	async function getMoves(url) {
		const resp = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				'X-API-KEY': Api_key,
			},
		});

		renderCards((respData = await resp.json()));
		listick();
	}

	const films = getMoves(ApiURL);

	const moveList = document.querySelector('.movie-list');

	function renderCards(data) {
		moveList.innerHTML = '';
		data.films.forEach((film) => {
			const item = document.createElement('li');
			item.classList.add('movie-list__card');
			item.innerHTML = `
    <div class="movie-list__top">
    <div class="movie-list__ball"  style="border: 1.2px solid ${getRateColor(film.rating)}">
      <span>${film.rating}</span>
    </div>
    <img class="movie-list__poster" src="${film.posterUrl}" alt="poster-1" />
  </div>
  <div class="movie-list__bottom">
    <h3 class="movie-list__title">${film.nameEn}</h3>
    <ul class="movie-list__suport">
      ${film.genres.map((genre) => `  ${genre.genre}`)}
    </ul>
  </div>`;

			moveList.appendChild(item);
		});
	}

	function getRateColor(rate) {
		if (rate >= 7) {
			return 'rgb(91, 240, 111)';
		} else if (rate > 5) {
			return 'rgb(238, 158, 53)';
		}
		return 'rgb(235, 45, 45)';
	}

	// search

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		let movelist = listick();
		if (search.value) {
			movelist.forEach((name) => {
				if (search.value == name) {
					console.log('work');
					renderCards();
				}
			});
		}
	});

	function listick() {
		let list = document.querySelectorAll('.movie-list__card');
		let moveNames = [];
		list.forEach((el) => {
			moveNames.push(el.querySelector('.movie-list__title').innerHTML);
		});
		return moveNames;
	}
};
