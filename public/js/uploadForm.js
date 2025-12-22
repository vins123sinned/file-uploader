const fileInput = document.querySelector("#images");
const fileInputError = document.querySelector(".file-input-error");
const fileCountSpan = document.querySelector(".file-count");
const imagesPreviews = document.querySelector(".images-previews");

let files = [];

function fileChange() {
  checkFileSize();
  showImagesPreviews();
  updateFileCount();
}

function showImagesPreviews() {
  Array.from(fileInput.files).forEach((file) => {
    const previewContainer = document.createElement("div");
    const image = document.createElement("img");
    image.alt = `Preview image of ${file.name}`;
    image.height = "200";
    image.src = URL.createObjectURL(file);
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.setAttribute("aria-label", "Delete image");
    const deleteIcon = document.createElement("span");
    deleteIcon.classList.add("material-symbols-outlined");
    deleteIcon.textContent = "delete";

    deleteButton.appendChild(deleteIcon);
    previewContainer.appendChild(image);
    previewContainer.appendChild(deleteButton);

    imagesPreviews.appendChild(previewContainer);
    files.push(file);

    deleteButton.addEventListener("click", () => {
      imagesPreviews.removeChild(previewContainer);
      files = files.filter((item) => item !== file);

      updateFileCount();
    });
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
  const fileCount = files.length;

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
