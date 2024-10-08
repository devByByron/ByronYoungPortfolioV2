const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phone");
const subject = document.getElementById("subject");
const msg = document.getElementById("message");

// Toggle icon navbar

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
	menuIcon.classList.toggle("bx-x");
	navbar.classList.toggle("active");
};

// Scroll sections
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
	sections.forEach((sec) => {
		let top = window.scrollY;
		let offset = sec.offsetTop - 100;
		let height = sec.offsetHeight;
		let id = sec.getAttribute("id");

		if (top >= offset && top < offset + height) {
			navLinks.forEach((links) => {
				links.classList.remove("active");
				document
					.querySelector(`header nav a[href*="${id}"]`)
					.classList.add("active");
			});
			// active sections for animation on scroll
			sec.classList.add("show-animate");
		} else {
			sec.classList.remove("show-animate");
		}
	});

	// Sticky header
	let header = document.querySelector("header");
	header.classList.toggle("sticky", window.scrollY > 100);

	// Remove toggle icon and navbar when click navbar links (scroll)

	menuIcon.classList.remove("bx-x");
	navbar.classList.remove("active");

	let footer = document.querySelector("footer");

	footer.classList.toggle(
		"show-animate",
		this.innerHeight + this.scrollY >=
			document.scrollingElement.scrollHeight
	);
};

function sendEmail() {
	const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Phone Number: ${phone.value}<br> Message: ${msg.value}`;
	Email.send({
		SecureToken: "5a9e3591-4f0d-4e92-898d-2d68e15c8a03",
		To: "youngbk0308@gmail.com",
		From: "youngbk0308@gmail.com",
		Subject: subject.value,
		Body: bodyMessage,
	}).then((message) => {
		if (message == "OK") {
			Swal.fire({
				title: "Success",
				text: "Message sent successfully",
				icon: "success",
			});
		}
	});
}

function checkInputs() {
	const items = document.querySelectorAll(".item");

	for (const item of items) {
		if (item.value == "") {
			item.classList.add("error");
			item.parentElement.classList.add("error");
		}

		if (items[1].value != "") {
			checkEmail();
		}

		items[1].addEventListener("keyup", () => {
			checkEmail();
		});
		item.addEventListener("keyup", () => {
			if (item.value != "") {
				item.classList.remove("error");
				item.parentElement.classList.remove("error");
			} else {
				item.classList.add("error");
				item.parentElement.classList.add("error");
			}
		});
	}
}

function checkEmail() {
	const emailRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	const errorTxtEmail = document.querySelector(".error-txt.email");

	if (email.value != "") {
		errorTxtEmail.innerHTML = "Enter a valid email address";
	} else {
		errorTxtEmail.innerHTML = "Email Address can't be blank";
	}

	if (!email.value.match(emailRegex)) {
		email.classList.add("error");
		email.parentElement.classList.add("error");
	} else {
		email.classList.remove("error");
		email.parentElement.classList.remove("error");
	}
}

form.addEventListener("submit", (e) => {
	e.preventDefault();

	checkInputs();

	if (
		!fullName.classList.contains("error") &&
		!email.classList.contains("error") &&
		!phoneNumber.classList.contains("error") &&
		!subject.classList.contains("error") &&
		!msg.classList.contains("error")
	) {
		sendEmail();
		form.reset();
		return false;
	}
});
