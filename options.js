import { matchingData } from "./main.js";
/// MAIN STYLE
export function mainStyle(spanActualMessage) {
  let style = `
           <div class="text-container">
               <div class="user-received-container voice-container">
                 <p class="voice-message">${spanActualMessage.innerHTML}</p>
                  <p class="user-received-timer">21:15 PM</p>
               </div>
               ${sendMessages()}
           </div>
           <div class="input-mic-container">
             <div class="input-container">
               <input class="input" type="textArea" placeholder="Message" />
               <div class="smile-icon">
                 <ion-icon class='happy-icon' name="happy-outline"></ion-icon>
               </div>
               <div class="link-camera">
                 <ion-icon name="link-outline"></ion-icon>
                 <ion-icon name="camera-outline"></ion-icon>
               </div>
             </div>
             <div class="mic-container">
               <ion-icon name="mic-outline"></ion-icon>
             </div>
           </div>`;
  return style;
}

/// ALTERNATIVE STYLE
export function newStyles(actualMessage) {
  if (actualMessage.classList.contains("removed-container")) {
    let removedMessage = `<div class="text-container">
           </div>
           <p class="removed-message">${actualMessage.innerHTML}</p>`;
    return removedMessage;
  } else {
    let voiceMessage = `
     <div class="text-container">
         <div class="user-received-container voice-container">
           <p class="voice-message">${actualMessage.innerHTML}</p>
            <p class="user-received-timer">21:15 PM</p>
         </div>;
         ${sendMessages()}
     </div>
      <div class="input-mic-container">
         <div class="input-container">
           <input class="input" type="textArea" placeholder="Message" />
           <div class="smile-icon">
             <ion-icon class='happy-icon' name="happy-outline"></ion-icon>
           </div>
           <div class="link-camera">
             <ion-icon name="link-outline"></ion-icon>
             <ion-icon name="camera-outline"></ion-icon>
           </div>
         </div>
         <div class="mic-container">
           <ion-icon name="mic-outline"></ion-icon>
         </div>
       </div>`;
    return voiceMessage;
  }
}
function sendMessages() {
  let html = "";
  matchingData.arrays.forEach((userMessage, values) => {
    html += `<div class="user-container">
    <p class="voice-message">${userMessage}</p>
     <p class="user-timer">${matchingData.time[values]}</p>
 </div>`;
  });
  return html;
}
