import { mainStyle, newStyles } from "./options.js";
import { firstArray } from "./data.js";
import { createProfileLayout, profileData } from "./profile.js";
import dayjs from "https://unpkg.com/dayjs@1.8.9/esm/index.js";

createProfileLayout();
/// VARIABLES
const overallContainer = document.querySelector(".overall-container");
const messagesContainer = document.getElementById("js-messages");
const main = document.getElementById("js-main");
const headerEl = document.getElementById("header");

const time = dayjs();
export let matchingData;
messagesContainer.addEventListener("click", containers);
function containers(event) {
  let clickedElement = event.target;
  while (clickedElement !== messagesContainer) {
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
      //// Saving the original HTML
      const actualMessage = clickedElement.querySelector(".actual-message");
      const spanActualMessage =
        clickedElement.querySelector("#js-span-message");
      let defaultCondition = "";
      defaultCondition = profileData[elementData - 1].sender
        ? mainStyle(profileData[elementData - 1].receivedMessage)
        : newStyles(
            actualMessage,
            profileData[elementData - 1].receivedMessage
          );
      const containerStyles = overallContainer.innerHTML;
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
      headerEl.style.padding = "0";
      removeMessage(containerStyles);
      break;
    }
    clickedElement = clickedElement.parentElement;
  }
}

function createMessages(actualMessage) {
  const sendContainer = document.querySelector(".send-container");
  const inputEl = document.querySelector(".input");
  if (actualMessage.classList.contains("removed-container")) {
    return;
  } else {
      sendContainer.addEventListener("click", () => {
      if (inputEl.value !== "" && inputEl.value !== "\n") {
        sendingMessages(inputEl);
      }
    });
  }
}
function sendingMessages(inputEl) {
  const textContainer = document.querySelector(".text-container");
  /////
  const timeMeridianFormat = time.format("HH:mm A");
  const timeFormat = time.format("HH:mm");
  const newMessageContainer = document.createElement("div");
  newMessageContainer.classList.add("user-container");
  newMessageContainer.style.marginBottom = "1rem";
  const newMessageText = document.createElement("p");
  newMessageText.innerHTML = inputEl.value;
  const newMessageTime = document.createElement("p");
  newMessageTime.classList.add("user-timer");
  newMessageTime.innerHTML = `${timeMeridianFormat} <ion-icon name="checkmark-done-outline"></ion-icon>`;
  newMessageContainer.append(newMessageText, newMessageTime);
  textContainer.append(newMessageContainer);
  sendTextToArray(inputEl,timeMeridianFormat, timeFormat);
  inputEl.value = "";
}

function removeMessage(containerStyles) {
  document.querySelector(".arrow-back").addEventListener("click", () => {
    createProfileLayout();
    const messagesContainer = document.getElementById("js-messages");
    messagesContainer.addEventListener("click", containers);
  });
  window.addEventListener("popstate", function (event) {
    if (event.state) {
      createProfileLayout();
      const messagesContainer = document.getElementById("js-messages");
      messagesContainer.addEventListener("click", containers);
    } else {
      return;
    }
  });
}

function sendTextToArray(inputEl,timeMeridianFormat, timeFormat) {
  matchingData.arrays.push(inputEl.value);
  matchingData.timeMeridian.push(timeMeridianFormat);
  matchingData.time.push(timeFormat);
  localStorage.setItem("messages", JSON.stringify(firstArray));
}
