// <!-- Initialize Swiper -->


// slider

var swiper = new Swiper(".slider-wrapper", {
  slidesPerView: 4,
  spaceBetween: 20,
  autoplay: {
    delay: 2500,
    reverseDirection: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


// project image functionality

function changeImage(url, idx) {
  let img = document.querySelector("#projectimage");
  img.setAttribute("src", url);

  //get index of element
  let currElement;
  let elements = document.querySelectorAll(".project-content");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove("selected");
    if (i + 1 == idx) currElement = elements[i];
  }

  currElement.classList.add("selected");
}

// modal functionality

const showPopUp = document.querySelector(".show-popup");
const popUpontainer = document.querySelector(".popup-container");
const getBody = document.querySelector(".body");
const getIntro = document.querySelector(".intro");
const closePopUp = document.querySelector("#closeFormBtn");

showPopUp.onclick = () => {
  popUpontainer.classList.add("active");
  console.log(getBody, "get");
  getBody.classList.add("no-scroll");
  getIntro.classList.add("active");
};

closePopUp.addEventListener("click", function () {
  popUpontainer.classList.remove("active");
  getIntro.classList.remove("active");
  document.body.classList.remove("no-scroll");
});


// submit form details functionality

document.addEventListener('DOMContentLoaded', function () {
  const formGroups = document.querySelectorAll('.form-group');

  formGroups.forEach(formGroup => {
      const input = formGroup.querySelector('input');

      input.addEventListener('blur', function () {
          const inputValue = this.value.trim();
          const label = formGroup.querySelector('label');

          console.log('Input value:', inputValue);
          console.log('Label:', label);

          if (inputValue !== '') {
              label.classList.add('filled');
          } else {
              label.classList.remove('filled');
          }
      });
  });


document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  console.log(form)
  console.log(formData)

  fetch("https://getform.io/f/bxojykva", {
      method: "POST",
      body: formData,
      headers: {
          "Accept": "application/json",
      },
  })
      .then(response => {
          if (response.ok) {
              alert('Form submitted successfully!');
              form.reset();

              popUpontainer.classList.remove("active");
              getIntro.classList.remove("active");
              document.body.classList.remove('no-scroll');
          } else {
              alert('Form submission failed. Please try again.');
          }
      })
      .catch(error => {
          console.error('Form submission error:', error);
          alert('An error occurred. Please try again.');
      });
});
})

