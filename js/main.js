import { checkAuth } from './check-auth.js'
import { BASE_URL, LOADER_COUNT } from './constants.js'
import { cardLoaderEl, cardSkeletonLoaderEl, infoModalEl, loginLogoutButtonEl } from './html-selection.js'
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

// Start
init()