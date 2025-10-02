import { BASE_URL } from './constants.js'
import { loginFormEl } from './html-selection.js'
function login(user) {
	fetch(BASE_URL + '/auth/login', {
		method: "POST",
		headers:{
			"Content-Type": "application/json"
		},
		body : JSON.stringify(user),
	}).then((res) => {
		return res.json()
	})
	.then((res) => {
		localStorage.setItem("token", res.access_token)
		location.href = '../index.html'
		// location.reload()
	})
	.catch(() => {
		alert("Hatolik yuz berdi!!!")		
	})
	.finally(() => {

	})
}
loginFormEl.addEventListener('submit', (e) => {
	e.preventDefault()
	const formData = new FormData(e.target)
	const result = {}

	formData.forEach((value, key) => {
		result[key] = value
	})
	login(result);	
})