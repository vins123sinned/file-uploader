const shareButtons = document.querySelectorAll(".share-button");
const shareForm = document.querySelector(".share-form");
const shareFormError = document.querySelector(".share-form-error");
const shareFormSubmit = document.querySelector(".form-share-button");
const deleteButtons = document.querySelectorAll(".delete-button");
const deleteForm = document.querySelector(".delete-form");
const linkContainer = document.querySelector(".link-container");
const linkPara = document.querySelector(".link-para");

deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener("click", () => {
    const actionLink = `/${deleteButton.dataset.subject}/delete/${deleteButton.dataset.id}`;

    if (
      deleteForm.getAttribute("action") !== actionLink ||
      deleteForm.classList.contains("hidden")
    ) {
      deleteForm.setAttribute("action", actionLink);
      deleteForm.classList.remove("hidden");
    } else {
      deleteForm.setAttribute("action", "");
      deleteForm.classList.add("hidden");
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
    } else {
      shareForm.setAttribute("action", "");
      shareForm.classList.add("hidden");
    }
  });
});

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
    showShareLink(result);
  } catch (err) {
    shareFormError.textContent = `An error has occurred. Please try again.`;
    console.error(err.message);
  }
});

function showShareLink(result) {
  shareForm.classList.add("hidden");
  shareForm.setAttribute("action", "");

  linkContainer.classList.remove("hidden");
  linkPara.textContent = `${window.location.origin}/share/${result.name}`;
}
