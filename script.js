const sendChatButton = document.querySelector(".chat-input span");
const chatInput = document.querySelector(".chat-input textarea");
const Chatbox = document.querySelector(".chatbox");

let userMessage;
const API_KEY = "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"; // Enter API Key HERE

let conversationHistory = [
  {role: "system", content: "You are a counselor who help students have issues with mental health"}
];

const createChatList = (message, className) => {
  const chatList = document.createElement("li");
  chatList.classList.add("chat", className);
  let chatContent =
    className === "outgoing"
      ? `<p>${message}</p>`
      : `<span>
      <img src="images/washington-state-cougars-1.svg" style="height: 32px; width: 32px; border-radius: 4px;">
    </span><p>${message}</p>`;
  chatList.innerHTML = chatContent;
  return chatList;
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
      messages: conversationHistory,
    }),
  };

  // POST to API
  fetch(API_URL, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      const responseMessage = data.choices[0].message.content;
      messageElement.textContent = responseMessage;
      conversationHistory.push({role: "assistant", content: responseMessage});
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

  conversationHistory.push({role: "user", content: userMessage});

  Chatbox.appendChild(createChatList(userMessage, "outgoing")); // Show message from the user
  chatInput.value = ""; // Erase a message
  Chatbox.scrollTo(0, Chatbox.scrollHeight); // Scroll

  setTimeout(() => {
    const incomingChatLi = createChatList("...", "incoming");
    Chatbox.appendChild(incomingChatLi);
    Chatbox.scrollTo(0, Chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
};

sendChatButton.addEventListener("click", handleChat);
