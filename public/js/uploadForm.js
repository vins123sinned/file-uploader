const main = document.querySelector("main");
const fileInput = document.querySelector("#images");
const fileInputError = document.querySelector(".file-input-error");
const fileCountSpan = document.querySelector(".file-count");
const imagesPreviews = document.querySelector(".images-previews");
const imagesContainer = document.querySelector(".images-container");
const imagesOptions = document.querySelector(".images-options");
const arrowBack = document.querySelector(".arrow-back-button");
const arrowForward = document.querySelector(".arrow-forward-button");

let images = undefined;
let position = 0;

async function fileChange() {
  imagesContainer.replaceChildren();
  // start with no errors. If there is an error, it will be written!
  fileInputError.classList.remove("invalid");
  fileInputError.textContent = "";

  checkFileSize();
  showImagesPreviews();
  updateFileCount();
  updateImages();
}

function showImagesPreviews() {
  imagesPreviews.classList.remove("hidden");

  Array.from(fileInput.files).forEach((file, index) => {
    const image = document.createElement("img");
    image.alt = `Preview image of ${file.name}`;
    image.height = "200";
    image.src = URL.createObjectURL(file);
    if (index !== 0) image.classList.add("hidden");
    imagesContainer.appendChild(image);
  });
}

function checkFileSize() {
  for (const file of Array.from(fileInput.files)) {
    // 1000000 bytes is a megabyte!
    if (file.size >= 1000000) {
      fileInput.value = "";
      fileInputError.classList.add("invalid");
      fileInputError.textContent = "Files must not exceed 1 MB";

      imagesPreviews.classList.add("hidden");
      imagesContainer.replaceChildren();

      return;
    }
  }
}

function updateFileCount() {
  const fileCount = fileInput.files.length;

  if (fileCount === 0) {
    imagesPreviews.classList.add("hidden");
  } else if (fileCount > 8) {
    fileInput.value = "";
    fileInputError.classList.add("invalid");
    fileInputError.textContent =
      "There must not be more than 8 images selected ";

    imagesPreviews.classList.add("hidden");
    imagesContainer.replaceChildren();
    fileCountSpan.textContent = "0";

    return;
  }
  fileCountSpan.textContent = fileCount;
}

function updateImages() {
  images = main.querySelectorAll("img");
  position = 0;

  if (images.length === 1) {
    // only one image, so disable image slider
    arrowBack.setAttribute("disabled", "disabled");
    arrowForward.setAttribute("disabled", "disabled");
  } else {
    arrowBack.removeAttribute("disabled");
    arrowForward.removeAttribute("disabled");
  }
}

fileInput.addEventListener("change", fileChange);

// image slideshow
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

// initial file count for page refreshes
showImagesPreviews();
updateFileCount();
