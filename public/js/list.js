const posts = document.querySelectorAll(".post-li");
const shareButtons = document.querySelectorAll(".share-button");
const shareForm = document.querySelector(".share-form");
const shareFormError = document.querySelector(".share-form-error");
const shareFormSubmit = document.querySelector(".form-share-button");
const deleteButtons = document.querySelectorAll(".delete-button");
const deleteForm = document.querySelector(".delete-form");
const linkContainer = document.querySelector(".link-container");
const linkPara = document.querySelector(".link-para");
const linkDismissButton = document.querySelector(".link-dismiss-button");
const formCancelButtons = document.querySelectorAll(".form-cancel-button");
const overlay = document.querySelector(".overlay");

let currentShareLi = undefined;

// arrow slideshow functionality for list posts view
posts.forEach((post) => {
  const images = post.querySelectorAll("img");
  const arrowBack = post.querySelector(".arrow-back-button");
  const arrowForward = post.querySelector(".arrow-forward-button");

  if (!arrowBack) return;

  if (images.length === 1) {
    // only one image, so disable image slider
    arrowBack.setAttribute("disabled", "disabled");
    arrowForward.setAttribute("disabled", "disabled");
  } else {
    let position = 0;

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
});

// handles and sets up the hidden forms
deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener("click", () => {
    const actionLink = `/${deleteButton.dataset.subject}/delete/${deleteButton.dataset.id}`;

    if (
      deleteForm.getAttribute("action") !== actionLink ||
      deleteForm.classList.contains("hidden")
    ) {
      deleteForm.setAttribute("action", actionLink);
      deleteForm.classList.remove("hidden");
      overlay.classList.remove("hidden");
    } else {
      deleteForm.setAttribute("action", "");
      deleteForm.classList.add("hidden");
      overlay.classList.add("hidden");
    }
  });
});

shareButtons.forEach((shareButton) => {
  const actionLink = `/share/${shareButton.dataset.id}`;

  shareButton.addEventListener("click", () => {
    if (
      shareForm.getAttribute("action") !== actionLink ||
      shareForm.classList.contains("hidden")
    ) {
      shareForm.setAttribute("action", actionLink);
      shareForm.classList.remove("hidden");
      overlay.classList.remove("hidden");
      currentShareLi = document.querySelector(
        `.post-li[data-id="${shareButton.dataset.id}"]`,
      );
    } else {
      shareForm.setAttribute("action", "");
      shareForm.classList.add("hidden");
      overlay.classList.add("hidden");
      currentShareLi = undefined;
    }
  });
});

// share form submit functionality
shareFormSubmit.addEventListener("click", async () => {
  if (shareForm.getAttribute("action") === "") return;

  const url = shareForm.action;
  const data = new FormData(shareForm);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: new URLSearchParams(data), // Turns FormData from multipart to url-encoded!
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    const shareCount = currentShareLi.querySelector(".share-count");
    showShareLink(result);
    shareCount.textContent = `${Number(shareCount.textContent) + 1}`;
  } catch (err) {
    shareFormError.textContent = `An error has occurred. Please try again.`;
    console.error(err.message);
  }
});

// buttons that hides the overlay and forms when clicked
formCancelButtons.forEach((cancelButton) => {
  cancelButton.addEventListener("click", hideForms);
});

linkDismissButton.addEventListener("click", hideForms);

overlay.addEventListener("click", hideForms);

function hideForms() {
  overlay.classList.add("hidden");
  shareForm.classList.add("hidden");
  shareForm.setAttribute("action", "");
  deleteForm.classList.add("hidden");
  deleteForm.setAttribute("action", "");
  linkContainer.classList.add("hidden");
  shareFormError.textContent = "";
  currentShareLi = undefined;
}

function showShareLink(result) {
  shareForm.classList.add("hidden");
  shareForm.setAttribute("action", "");

  linkContainer.classList.remove("hidden");
  linkPara.textContent = `${window.location.origin}/share/${result.name}`;
}
