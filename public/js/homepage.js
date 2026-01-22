const sidebarLeft = document.querySelector(".sidebar-left");
const images = sidebarLeft.querySelectorAll("img");
const arrowBack = document.querySelector(".arrow-back-button");
const arrowForward = document.querySelector(".arrow-forward-button");

let position = 0;

if (images.length === 1) {
  // only one image, so disable image slider
  arrowBack.setAttribute("disabled", "disabled");
  arrowForward.setAttribute("disabled", "disabled");
} else {
  arrowBack.addEventListener("click", () => {
    images[position].classList.add("hidden");

    position--;
    if (position === -1) position = images.length - 1;

    images[position].classList.remove("hidden");
  });
  arrowForward.addEventListener("click", () => {
    images[position].classList.add("hidden");

    position++;
    if (position > images.length - 1) position = 0;

    images[position].classList.remove("hidden");
  });
}
