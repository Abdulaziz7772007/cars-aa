import { BASE_URL } from './constants.js'
import { loginFormEl, registerFormEl } from './html-selection.js'


function register(user) {
	fetch(BASE_URL + '/auth/register', {
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
		location.href = './login.js'
		// location.reload()
	})
	.catch(() => {
		alert("Hatolik yuz berdi!!!")		
	})
	.finally(() => {

	})
}
registerFormEl.addEventListener('submit', (e) => {
	e.preventDefault()
	const formData = new FormData(e.target)
	const result = {}

	formData.forEach((value, key) => {
		result[key] = value
	})
	register(result);	
})



/*  import { BASE_URL } from './constants.js';

const registerFormEl = document.getElementById('registerForm');

registerFormEl.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const result = {};

  formData.forEach((value, key) => {
    result[key] = value;
  });

  console.log("Yuborilayotgan ma'lumot:", result);

  fetch(BASE_URL + '/auth/register', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(result)
  })
  .then(res => res.json())
  .then(data => {
    console.log("Server javobi:", data);
  })
  .catch(err => console.error("Xatolik:", err));
});
 */