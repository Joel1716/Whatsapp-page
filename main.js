import { mainStyle, newStyles } from "/options.js";
import { firstArray } from "/data.js";
/// VARIABLES
const overallContainer = document.querySelector(".overall-container");
const container = document.querySelector(".container");
const containerStyles = overallContainer.innerHTML;
const mainContainer = document.getElementById("js-messages");
const happyIcon = document.querySelector(".happy-icon");
const headerEl = document.getElementById("header");

export let matchingData;
mainContainer.addEventListener("click", containers);
function containers(event) {
  let clickedElement = event.target;
  while (clickedElement !== mainContainer) {
    if (clickedElement.classList.contains("messages")) {
      const elementData = clickedElement.dataset.profileId;
      firstArray.forEach((data) => {
        if (elementData == data.id) {
          matchingData = data;
        }
      });
      const imageElement = clickedElement.querySelector("img");
      imageElement.classList.add("clicked-image");
      const titleElement = clickedElement.querySelector(".title");
      const actualMessage = clickedElement.querySelector(".actual-message");
      const spanActualMessage =
        clickedElement.querySelector("#js-span-message");
      const defaultCondition =
        spanActualMessage === null
          ? newStyles(actualMessage)
          : mainStyle(spanActualMessage);
      overallContainer.innerHTML = `
      <div class="new-container">
        <header class="new-clicked-header">
          <div class="arrow-pic-name">
            <ion-icon name="arrow-back-outline" class="new-icons arrow-back"></ion-icon>
            ${imageElement.outerHTML}
            <p>${titleElement.innerHTML}</p>
          </div>
          <div class="new-icons-container">
            <ion-icon name="videocam-outline" class="new-icons"></ion-icon>
            <ion-icon name="call-outline" class="new-icons"></ion-icon>
            <ion-icon
              name="ellipsis-vertical-outline"
              class="new-icons"
            ></ion-icon>
          </div>
        </header>
        <section class="message-send-container">
        <h2 class='new-container-message'>New Message</h2>
          ${defaultCondition}
        </section>
      </div>
        `;
      createMessages(actualMessage);
      // STYLE FOR CONTAINER
      // overallContainer.style.overflow = "auto";
      headerEl.style.padding = "0";
      removeMessage();
      break;
    }
    clickedElement = clickedElement.parentElement;
  }
}

function createMessages(actualMessage) {
  const inputEl = document.querySelector(".input");
  const textContainer = document.querySelector(".text-container");
  if (actualMessage.classList.contains("removed-container")) {
    return;
  } else {
    inputEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const currentTime = new Date().toLocaleString("en-Us", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        const newMessageContainer = document.createElement("div");
        newMessageContainer.classList.add("user-container");
        newMessageContainer.style.marginBottom = "1rem";
        const newMessageText = document.createElement("p");
        newMessageText.innerHTML = inputEl.value;
        const newMessageTime = document.createElement("p");
        newMessageTime.classList.add("user-timer");
        newMessageTime.innerHTML = `${currentTime} <ion-icon name="checkmark-done-outline"></ion-icon>`;
        newMessageContainer.append(newMessageText, newMessageTime);
        textContainer.append(newMessageContainer);
        sendTextToArray(inputEl);
        inputEl.value = "";
      }
    });
  }
}

function removeMessage() {
  document.querySelector(".arrow-back").addEventListener("click", () => {
    overallContainer.innerHTML = containerStyles;
    const mainContainer = document.getElementById("js-messages");
    mainContainer.addEventListener("click", containers);
  });
}
function sendTextToArray(inputEl) {
  matchingData.arrays.push(inputEl.value);
}
