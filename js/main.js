import { checkAuth } from './check-auth.js'
import { BASE_URL, LOADER_COUNT } from './constants.js'
import { cardContainerEl, cardLoaderEl, cardSkeletonLoaderEl, infoModalEl, loginLogoutButtonEl, selectCategoryEl, selectCountryEl } from './html-selection.js'
import { ui } from './ui.js'

if(checkAuth()) {
	loginLogoutButtonEl.innerText = '⬅Tizimdan chiqish'
} else {
	loginLogoutButtonEl.innerText = 'Tizimga kirish➡'
}

function init() {
	loader(true)
	
	fetch(BASE_URL + "/cars")
	.then((res)=> {
		return res.json()
	})
	.then((res)=> {
		ui(res.data);
	} )
	.catch(()=> {})
	.finally(()=> {
		loader(false)
	})
}


function loader(bool) {
	
	if(bool) {
		cardLoaderEl.innerHTML = ''
		cardLoaderEl.classList.remove('hidden')
		let i = 0
		while (true) {
			if(i===LOADER_COUNT) break
			const clone = cardSkeletonLoaderEl.cloneNode(true).content 
			cardLoaderEl.append(clone)
			i++
		}
	} else {
		cardLoaderEl.classList.add('hidden')
	}
}


// CRUD
document.addEventListener("click", (evt)=> {
	// Delete
	if(evt.target.classList.contains("js-delete")) {
		if(checkAuth()) {

		} else {
			infoModalEl.showModal()
		}
	}
	// Edit
	if(evt.target.classList.contains("js-edit")) {
		if(checkAuth()) {

		} else {
			infoModalEl.showModal()
		}
	}
})

loginLogoutButtonEl.addEventListener("click", ()=> {
	if(checkAuth()) {
		localStorage.removeItem('token')
		location.reload()
	} else {
		location.reload()

		location.href = '../pages/register.html'
	}

})


selectCountryEl.onchange = function (event) {
	const selectCountry = event.target.value; 
	cardContainerEl.innerHTML = ''; 
	loader(true);
	if(selectCountry !== 'all') {
		return fetch(BASE_URL + `/cars?country=${selectCountry}`)
			.then((res) => {
				return res.json()
			})
			.then((res) => {
				ui(res.data)
			})
			.catch(()=> {
				alert("Hatolik!!!")
			})
			.finally(() => {
				loader(false)
			})
	}
	fetch(BASE_URL + "/cars")
		.then((res) => {
			return res.json()
		})
		.then((res) => {
			ui(res.data)
		})
		.catch(()=> {
			alert("Hatolik!!!")
		})
		.finally(() => {
			loader(false)
		})
}


selectCategoryEl.onchange = function (event) {
	const selectCategory = event.target.value; 
	cardContainerEl.innerHTML = ''; 
	loader(true);
	if(selectCategory !== 'all') {
		return fetch(BASE_URL + `/cars?category=${selectCategory}`)
			.then((res) => {
				return res.json()
			})
			.then((res) => {
				ui(res.data)
			})
			.catch(()=> {
				alert("Hatolik!!!")
			})
			.finally(() => {
				loader(false)
			})
	}
	fetch(BASE_URL + "/cars")
		.then((res) => {
			return res.json()
		})
		.then((res) => {
			ui(res.data)
		})
		.catch(()=> {
			alert("Hatolik!!!")
		})
		.finally(() => {
			loader(false)
		})
}

// Start
init()