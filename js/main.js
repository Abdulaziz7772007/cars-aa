 import { checkAuth } from './check-auth.js'
import { BASE_URL, LOADER_COUNT } from './constants.js'
import { filterData } from './filter.js'
import { cardContainerEl, cardLoaderEl, cardSkeletonLoaderEl, clearButtonEl, filterLoaderEl, filtersEl, filterSelectValueEl, filterTypenEl, infoModalEl, loginLogoutButtonEl, } from './html-selection.js'
import { ui } from './ui.js'

let selectedFilterType = null
let selectedFilterValue = null
let filterDatalist = null

if(checkAuth()) {
	loginLogoutButtonEl.innerText = '⬅Tizimdan chiqish'
} else {
	loginLogoutButtonEl.innerText = 'Tizimga kirish➡'
}

function init(query) {
	loader(true)
	
	fetch(BASE_URL + `/cars${query  ? query : ''}`)
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

function dataForFilter() {
	
	fetch(BASE_URL + "/cars")
	.then((res)=> {
		return res.json()
	})
	.then((res)=> {
		console.log(res.data);
		
	} )
	.catch(()=> {})
	.finally(()=> {
	})
}
dataForFilter()


// CRUD
document.addEventListener("click", (evt)=> {
	// Delete
	if(evt.target.classList.contains("js-delete")) {
		const token = localStorage.getItem("token")
		if(checkAuth()) {
			fetch(BASE_URL + `/cars/${evt.target.id}`, {
				method:"DELETE",
				headers : {
					Authorization : `Berarer ${token}`
				}
			}).then ((res) => {
				return res.text()
			}).then((res) => {
				alert(res)
				cardContainerEl.innerHTML = ''
				init()
			})
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



filterTypenEl.addEventListener('change', (e) => {
	if(filterDatalist) {
		selectedFilterType = e.target[e.target.selectedIndex].value
		displayFilterData(filterData(filterDatalist, selectedFilterType));
		filterSelectValueEl.classList.remove('hidden')
	}
})


filterSelectValueEl.addEventListener('change', (e) => {
	selectedFilterValue = e.target[e.target.selectedIndex].value
	cardContainerEl.innerHTML = ''
	init(`?${selectedFilterType}=${selectedFilterValue}`)
})
// Start
init()



// filter 

function dataFormFilter() {
	filtersEl.classList.add('hidden')
	filterLoaderEl.classList.remove('hidden')

	fetch(BASE_URL + '/cars').then((res) => {
		return res.json();
	})
	.then((res) => {
		filterDatalist =  res.data
	})
	.catch(() =>  {

	})
	.finally(() => {
	filterLoaderEl.classList.add('hidden')
	filtersEl.classList.remove('hidden')
	})
}
dataFormFilter()


clearButtonEl.addEventListener('click', ()=> {
	cardContainerEl.innerHTML = ''
	init()
})

function displayFilterData(array) {
	filterSelectValueEl.innerHTML = ''
	const option = document.createElement('option')
	option.disabled = true
	option.innerText = "All"
	filterSelectValueEl.append(option)
	filterSelectValueEl[0].selected = true
	array.forEach(element => {
		const option = document.createElement('option')
		option.innerText = element
		option.value = element
		filterSelectValueEl.appendChild(option)
	});
}

