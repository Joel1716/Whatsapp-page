import { firstArray } from "./data.js";
export const profileData = [
  {
    id: 1,
    img: "<img src='img/Duck.jpg' alt='Duck Image' loading='lazy' />",
    title: "Room 52",
    actualTime: "20:47",
    receivedMessage: "Nope",
    sender: "Henry:",
    sentMessage: "",
  },
  {
    id: 2,
    img: "<img src='img/Chelsea.jpg' alt='Chelsea Logo' loading='lazy' />",
    title: "CHELSEA FANS",
    actualTime: "12:00",
    receivedMessage: "Happy New year to all Chelsea fans",
    sender: "John:",
    sentMessage: "",
  },
  {
    id: 3,
    img: "<img src='img/Computer.jpg' alt='Computer Image' loading='lazy' />",
    title: "CIT STUDENTS",
    actualTime: "8:00",
    receivedMessage: "Morning, lecturer said we have a test",
    sender: "Courserep:",
    sentMessage: "",
  },
  {
    id: 4,
    img: "<img src='img/Messi.jpg' alt='Messi Argenina jersey' loading='lazy' />",
    title: "MESSI FANS",
    actualTime: "Yesterday",
    receivedMessage: "Hope We are all Messi fans here",
    sender: "Chizzy:",
    sentMessage: "",
  },
  {
    id: 5,
    img: "<img src='img/Coding.jpg' alt='Bunch of code on a laptop Screen' loading='lazy' />",
    title: "DEVELOPERS",
    actualTime: "Yesterday",
    receivedMessage: "Wishing us a great year in our various tech careers",
    sender: "Ibeh:",
    sentMessage: "",
  },
  {
    id: 6,
    img: "<img src='img/Betting.jpg' alt='Bunch of code on a laptop Screen' loading='lazy' />",
    title: "Alabi",
    actualTime: "9/11/24",
    receivedMessage: "No it was more than 1",
    sentMessage: "",
  },
  {
    id: 7,
    img: "<img src='img/Dragonball.jpg' alt='Toy version of Dragonball' loading='lazy' />",
    title: "Nonso",
    actualTime: "8/11/24",
    receivedMessage:
      "<ion-icon name='call-outline' id='voice-icon'></ion-icon> Voice call",
    sentMessage: "",
  },
  {
    id: 8,
    img: "<img src='img/Tennis.jpg' alt='Picture of poker' loading='lazy' />",
    title: "Tactics",
    actualTime: "1/11/24",
    receivedMessage: "Daniell removed you",
    sentMessage: "",
  },
];
const overallContainer = document.querySelector(".overall-container");
function createProfileMessages() {
  let profileMessages = "";
  let messageData = "";
  profileData.forEach((profiles) => {
    firstArray.forEach((data) => {
      if (data.id === profiles.id) {
        messageData = data;
        profiles.sentMessage = messageData.arrays.at(-1);
        if (messageData.time.at(-1) === undefined) {
          return;
        } else {
          profiles.actualTime = messageData.time.at(-1);
        }
      }
    });
    const videoOrRemoved =
      profiles.id !== 8
        ? `<div>
            <p class="actual-message">
             ${profiles.receivedMessage}
            </p>
          </div>`
        : `<div>
            <p class="actual-message removed-container">
             ${profiles.receivedMessage}
            </p>
          </div>`;
    /// FOR NON-GROUPS
    const noSender =
      profiles.sender !== undefined
        ? `<p class="actual-message">
                    ${profiles.sender} <span id="js-span-message">${profiles.receivedMessage}</span>
                  </p>`
        : `${videoOrRemoved}`;
    //// Profiles that have a sent message
    const sendMessage =
      profiles.sentMessage === undefined
        ? `${noSender}`
        : `<div>
            <p class="actual-message">
          <ion-icon name="checkmark-done-outline"></ion-icon><span class='new-message'>${profiles.sentMessage}</span>
            </p>
          </div>`;
    /// Message LAYOUT
    profileMessages += `
    <div class="messages" data-profile-id="${profiles.id}">
              ${profiles.img}
              <div class="texts">
                <div class="texts-time">
                  <p class="title">${profiles.title}</p>
                  <p class="actual-time">
                    ${profiles.actualTime}
                  </p>
                </div>
                <div class="open-message">
                ${sendMessage}
                </div>
              </div>
            </div>`;
  });
  return profileMessages;
}
let profileLayout = "";
export function createProfileLayout() {
  profileLayout = `
    <div class="container">
        <header id="header">
          <div class="whatsapp">WhatsApp</div>
          <div class="icons">
            <a href="#"
              ><ion-icon class="header-icons" name="camera-outline"></ion-icon
            ></a>
            <a href="#"
              ><ion-icon class="header-icons" name="search-outline"></ion-icon
            ></a>
            <a href="#"
              ><ion-icon
                class="header-icons"
                name="ellipsis-vertical-outline"
              ></ion-icon
            ></a>
          </div>
        </header>
        <main id="js-main">
          <div class="icon-texts">
            <p class="chats">Chats</p>
            <p>Updates</p>
            <p>Calls</p>
          </div>
          <div class="archived-icon-container">
            <a class="icon" href="#"
              ><ion-icon class="archived-icon" name="archive-outline"></ion-icon
            ></a>
            <a class="archived" href="#">Archived</a>
          </div>
          <div class="messages-container" id="js-messages">${createProfileMessages()}</div>
        </main>
      </div>`;
  overallContainer.innerHTML = profileLayout;
}
