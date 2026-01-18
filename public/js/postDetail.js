const main = document.querySelector("main");
const heading = main.querySelector("h1");
const images = main.querySelectorAll("img");
const arrowBack = document.querySelector(".arrow-back-button");
const arrowForward = document.querySelector(".arrow-forward-button");
const downloadLink = document.querySelector(".download-link");

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
    updateDownloadLink();
  });
  arrowForward.addEventListener("click", () => {
    images[position].classList.add("hidden");

    position++;
    if (position > images.length - 1) position = 0;

    images[position].classList.remove("hidden");
    updateDownloadLink();
  });
}

async function updateDownloadLink() {
  downloadLink.classList.add("disabled");
  const filename = images[position].dataset.filename;
  const url = `${window.location.origin}/files/download/${filename}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const blob = await response.blob();
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = crypto.randomUUID();
    downloadLink.classList.remove("disabled");
  } catch (err) {
    console.error(err.message);
  }
}

updateDownloadLink();
