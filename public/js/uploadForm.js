const fileInput = document.querySelector("#images");
const fileCountSpan = document.querySelector(".file-count");

const updateFileCount = () => {
  const fileCount = fileInput.files.length;

  if (fileCount > 8) {
    fileCountSpan.classList.add("invalid");
  } else {
    fileCountSpan.classList.remove("invalid");
  }
  fileCountSpan.textContent = fileCount;
};

fileInput.addEventListener("change", updateFileCount);

// initial file count for page refreshes
updateFileCount();
