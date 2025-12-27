const fileInput = document.querySelector("#add-images");
const fileInputError = document.querySelector(".file-input-error");
const imagesInput = document.querySelector("#image-links");
const fileCountSpan = document.querySelector(".file-count");
const imagesPreviews = document.querySelector(".images-previews");

let filesData = [];

async function fileChange() {
  // start with no errors. If there is an error, it will be written!
  fileInputError.classList.remove("invalid");
  fileInputError.textContent = "";

  checkFileSize();
  const fileNames = await uploadFiles();
  showImagesPreviews(fileNames);
  updateFileCount();
}

async function uploadFiles() {
  const formData = new FormData();
  Array.from(fileInput.files).forEach((file) => {
    formData.append("images", file);
  });
  const url = `${document.location.origin}/files/upload`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const result = await response.json();
    filesData.push(...result);
    imagesInput.value = JSON.stringify(filesData);

    return filesData.map((file) => file.name);
  } catch (err) {
    fileInput.value = "";
    imagesInput.value = "";
    fileInputError.classList.add("invalid");
    fileInputError.textContent =
      "There was an error uploading your images. Please try again.";

    imagesPreviews.replaceChildren();
    filesData.length = 0;
    imagesInput.value = JSON.stringify(filesData);
  } finally {
    updateFileCount();
  }
}

function showImagesPreviews(fileNames) {
  if (!fileNames) return;

  for (let i = 0; i < fileInput.files.length; i++) {
    const file = fileInput.files[i];

    const previewContainer = document.createElement("div");
    const image = document.createElement("img");
    image.alt = `Preview image of ${file.name}`;
    image.height = "200";
    image.dataset.name = fileNames[i];
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

    deleteButton.addEventListener("click", async () => {
      const url = `${document.location.origin}/files/delete-supabase/${image.dataset.name}`;

      try {
        const response = await fetch(url, {
          method: "POST",
        });
        if (!response.ok)
          throw new Error(`Response status: ${response.status}`);

        imagesPreviews.removeChild(previewContainer);
        filesData = filesData.filter(
          (item) => item.name !== image.dataset.name,
        );
        imagesInput.value = JSON.stringify(filesData);
      } catch (err) {
        fileInput.value = "";
        imagesInput.value = "";
        fileInputError.classList.add("invalid");
        fileInputError.textContent =
          "There was an error deleting your image. Please try again.";

        imagesPreviews.replaceChildren();
        filesData.length = 0;
        imagesInput.value = JSON.stringify(filesData);
      } finally {
        updateFileCount();
      }
    });
  }
}

function checkFileSize() {
  for (const file of Array.from(fileInput.files)) {
    // 1000000 bytes is a megabyte!
    if (file.size >= 1000000) {
      fileInput.value = "";
      imagesInput.value = "";
      fileInputError.classList.add("invalid");
      fileInputError.textContent = "Files must not exceed 1 MB";

      imagesPreviews.replaceChildren();
      filesData.length = 0;
      imagesInput.value = JSON.stringify(filesData);

      return;
    }
  }
}

function updateFileCount() {
  const fileCount = filesData.length;

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
