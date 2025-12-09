const deleteButtons = document.querySelectorAll(".delete-button");
const deleteForm = document.querySelector(".delete-form");

deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener("click", () => {
    if (deleteForm.classList.contains("hidden")) {
      const actionLink = `/${deleteButton.dataset.subject}/delete/${deleteButton.dataset.id}`;

      deleteForm.setAttribute("action", actionLink);
      deleteForm.classList.remove("hidden");
    } else {
      deleteForm.setAttribute("action", "");
      deleteForm.classList.add("hidden");
    }
  });
});
