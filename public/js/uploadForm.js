const fileInput = document.querySelector("#images");
const fileInputError = document.querySelector(".file-input-error");
const fileCountSpan = document.querySelector(".file-count");
const imagesPreviews = document.querySelector(".images-previews");

async function fileChange() {
  imagesPreviews.replaceChildren();
  // start with no errors. If there is an error, it will be written!
  fileInputError.classList.remove("invalid");
  fileInputError.textContent = "";

  checkFileSize();
  showImagesPreviews();
  updateFileCount();
}

function showImagesPreviews() {
  Array.from(fileInput.files).forEach((file) => {
    const image = document.createElement("img");
    image.alt = `Preview image of ${file.name}`;
    image.height = "200";
    image.src = URL.createObjectURL(file);
    imagesPreviews.appendChild(image);
  });
}

function checkFileSize() {
  for (const file of Array.from(fileInput.files)) {
    // 1000000 bytes is a megabyte!
    if (file.size >= 1000000) {
      fileInput.value = "";
      fileInputError.classList.add("invalid");
      fileInputError.textContent = "Files must not exceed 1 MB";

      imagesPreviews.replaceChildren();

      return;
    }
  }
}

function updateFileCount() {
  const fileCount = fileInput.files.length;

  if (fileCount > 8) {
    fileCountSpan.classList.add("invalid");
    fileInputError.textContent =
      "There must not be more than 8 images selected ";
  }
  fileCountSpan.textContent = fileCount;
}

fileInput.addEventListener("change", fileChange);

// initial file count for page refreshes
showImagesPreviews();
updateFileCount();
