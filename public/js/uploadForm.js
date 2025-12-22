const fileInput = document.querySelector("#images");
const fileInputError = document.querySelector(".file-input-error");
const fileCountSpan = document.querySelector(".file-count");
const imagesPreviews = document.querySelector(".images-previews");

const files = [];

function fileChange() {
  checkFileSize();
  showImagesPreviews();
  updateFileCount();
  console.log(files);
}

function showImagesPreviews() {
  Array.from(fileInput.files).forEach((file) => {
    const image = document.createElement("img");
    image.alt = `Preview image of ${file.name}`;
    image.height = "200";
    image.src = URL.createObjectURL(file);

    imagesPreviews.appendChild(image);
    files.push(file);
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
      files.length = 0;

      return;
    }
  }

  fileInputError.classList.remove("invalid");
  fileInputError.textContent = "";
}

function updateFileCount() {
  const fileCount = fileInput.files.length;

  if (fileCount > 8) {
    fileCountSpan.classList.add("invalid");
  } else {
    fileCountSpan.classList.remove("invalid");
  }
  fileCountSpan.textContent = fileCount;
}

fileInput.addEventListener("change", fileChange);

// initial file count for page refreshes
showImagesPreviews();
updateFileCount();
