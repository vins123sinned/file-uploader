const fileInput = document.querySelector("#images");
const fileCountSpan = document.querySelector(".file-count");

fileInput.addEventListener("change", (event) => {
  const fileCount = fileInput.files.length;

  if (fileCount > 8) {
    fileCountSpan.classList.add("invalid");
  } else {
    fileCountSpan.classList.remove("invalid");
  }
  fileCountSpan.textContent = fileCount;
});
