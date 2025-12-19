const fileInput = document.querySelector("#images");
const fileInputError = document.querySelector(".file-input-error");
const fileCountSpan = document.querySelector(".file-count");

function fileChange() {
  checkFileSize();
  updateFileCount();
}

function checkFileSize() {
  for (const file of Array.from(fileInput.files)) {
    // 1000000 bytes is a megabyte!
    if (file.size >= 1000000) {
      fileInput.value = "";
      fileInputError.classList.add("invalid");
      fileInputError.textContent = "Files must not exceed 1 MB";
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
updateFileCount();
