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

async function getRandomFoodEmojis() {
  const url = "https://api.emojisworld.fr/v1/random?categories=5&limit=5";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    const emojis = result.results;

    for (const emoji of emojis) {
      const span = document.createElement("span");
      span.classList.add("emoji");
      span.textContent = emoji.emoji;

      foodEmojisList.appendChild(span);
    }
  } catch (err) {
    console.error(err.message);
  }
}

getRandomFoodEmojis();
