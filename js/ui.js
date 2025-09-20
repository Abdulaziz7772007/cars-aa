import { cardContainerEl, cardTemplateEl } from './html-selection.js'

export function ui(cars) {
	cardContainerEl.innerHTML = ''

	cars.forEach(car => {
		const clone = cardTemplateEl.cloneNode(true).content
		const nameEl = clone.getElementById('name')
		const descriptionEl = clone.getElementById('description')
		const countryEl = clone.getElementById('country')
		const categoryEl = clone.getElementById('category')
		const colorEl = clone.getElementById('color')
		const colorBadgeEl = clone.getElementById('colorBadge')
		const editEl = clone.querySelector('.js-edit')
		const deleteEl = clone.querySelector('.js-delete')
		const infoEl = clone.querySelector('.js-info')

		// Id
		infoEl.href = `../pages/details.html?id=${car.id}`
		editEl.id=car.id
		deleteEl.id = car.id
		infoEl.id = car.id
		
		


		// Content
		nameEl.innerText = car.name
		descriptionEl.innerText = car.description
		countryEl.innerText = car.country
		colorEl.innerText = car.colorName
		categoryEl.innerText = car.category
		colorBadgeEl.style.backgroundColor = car.color
		
		// Append
		cardContainerEl.appendChild(clone)
	});
}