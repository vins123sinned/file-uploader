const menuIcon = document.querySelector(".menu-icon");
const profilePicture = document.querySelector(".profile-picture");
const postFolderLinks = document.querySelector(".post-folder-links");
const userLinks = document.querySelector(".user-links");
const foodEmojisList = document.querySelector(".food-emojis-li");

window.addEventListener("click", (event) => {
  if (
    !event.target.classList.contains("menu-icon") &&
    !event.target.classList.contains("post-folder-links")
  ) {
    postFolderLinks.classList.add("hidden");
  }
  if (
    !event.target.classList.contains("profile-picture") &&
    !event.target.classList.contains("user-links")
  ) {
    userLinks.classList.add("hidden");
  }
});

menuIcon.addEventListener("click", () => {
  if (postFolderLinks.classList.contains("hidden")) {
    postFolderLinks.classList.remove("hidden");
  } else {
    postFolderLinks.classList.add("hidden");
  }
});

profilePicture.addEventListener("click", () => {
  if (userLinks.classList.contains("hidden")) {
    userLinks.classList.remove("hidden");
  } else {
    userLinks.classList.add("hidden");
  }
});
