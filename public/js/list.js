const shareButtons = document.querySelectorAll(".share-button");
const shareForm = document.querySelector(".share-form");
const deleteButtons = document.querySelectorAll(".delete-button");
const deleteForm = document.querySelector(".delete-form");

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
  const actionLink = `/${shareButton.dataset.subject}/share/${shareButton.dataset.id}`;

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
