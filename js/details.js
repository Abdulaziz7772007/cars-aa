import { BASE_URL } from './constants.js'
import { detailsAccelerationEl, detailsCategoryEl, detailsCityEl, detailsColorEl, detailsColorNameEl, detailsCombinedEl, detailsCountryEl, detailsDescriptionEl, detailsDoorCountEl, detailsEngineEl, detailsFuelTypeEl, detailsGenerationEl, detailsHighwayEl, detailsHorsePowerEl, detailsLoadingEl, detailsMaxSpeedEl, detailsSeatCountEl, detailsTitleEl, detailsTrimEl, detailsWrapperEl, detailsyearEl } from './html-selection.js'

let title;

function init() {
	loading(true)
	const id = new URLSearchParams(location.search).get('id')
	fetch(BASE_URL + '/cars' + `/${id}`)
	.then((res) => {
		return res.json()
	})
	.then((res) => {
		displayDetails(res)
		
	})
	.catch(() => {})
	.finally(() => {
		loading(false)
	})
}

function loading(bool) {
	if(bool) {
		document.title = "Yuklanmoqda..."
		detailsLoadingEl.classList.remove('hidden')
	} else {
		document.title = title
		detailsWrapperEl.classList.remove('scale-0')
		detailsLoadingEl.classList.add('hidden')
	}
}


function displayDetails(carData) {

	title = carData.name
	detailsTitleEl.innerText = carData.name 
	detailsDescriptionEl.innerText = carData.description
	detailsTrimEl.innerText = carData.trim
	detailsGenerationEl.innerText = carData.generation
	detailsyearEl.innerText = carData.year
	detailsColorEl.style.backgroundColor = carData.color
	detailsColorNameEl.innerText = carData.colorName
	detailsCategoryEl.innerText = carData.category
	detailsDoorCountEl.innerText = carData.doorCount
	detailsSeatCountEl.innerText = carData.seatCount
	detailsMaxSpeedEl.innerText = carData.maxSpeed
	detailsAccelerationEl.innerText = carData.acceleration
	detailsEngineEl.innerText = carData.engine
	detailsHorsePowerEl.innerText = carData.horsepower
	detailsFuelTypeEl.innerText = carData.fuelType
	detailsCountryEl.innerText = carData.country
	detailsCityEl.innerText = carData?.fuelConsumption?.city
	detailsHighwayEl.innerText = carData?.fuelConsumption?.highway
	detailsCombinedEl.innerText = carData?.fuelConsumption?.combined

	
}

init()