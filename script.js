const sendChatBtn = document.querySelector(".chat-input span");
const chatInput = document.querySelector(".chat-input textarea");
const Chatbox = document.querySelector(".chatbox");

let userMessage;
const API_KEY = "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"; // Enter API Key HERE

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chaContent =
    className === "outgoing"
      ? `<p>${message}</p>`
      : `<span>
      <img src="images/washington-state-cougars-1.svg" style="height: 32px; width: 32px; border-radius: 4px;">
    </span><p>${message}</p>`;
  chatLi.innerHTML = chaContent;
  return chatLi;
};

const generateResponse = (incomingChatLi) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = incomingChatLi.querySelector("p");

  // Propaties for API
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{role:"system", content:"You are a counselor who help students have issues with mental health"},
      { role: "user", content: userMessage },
      {role: "assistant", content: userMessage},],
    }),
  };

  // POST to API
  fetch(API_URL, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      messageElement.textContent = data.choices[0].message.content;
    })
    .catch((error) => {
      messageElement.textContent = "Fatal Error! Please try again later :)";
    })
    .finally(() => Chatbox.scrollTo(0, Chatbox.scrollHeight));
};

const handleChat = () => {
  userMessage = chatInput.value.trim();
  // console.log(userMessage);

  if (!userMessage) return;

  Chatbox.appendChild(createChatLi(userMessage, "outgoing")); // Show message from the user
  chatInput.value = ""; // Erase a message
  Chatbox.scrollTo(0, Chatbox.scrollHeight); // Scroll

  setTimeout(() => {
    const incomingChatLi = createChatLi("...", "incoming");
    Chatbox.appendChild(incomingChatLi);
    Chatbox.scrollTo(0, Chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
};

sendChatBtn.addEventListener("click", handleChat);
