// CHATBOT ELEMENTS
      const aiChatButton = document.getElementById("aiChatButton");
      const aiChatWindow = document.getElementById("aiChatWindow");
      const aiCloseButton = document.getElementById("aiCloseButton");

      const aiChatForm = document.getElementById("aiChatForm");
      const aiMessageInput = document.getElementById("aiMessageInput");
      const aiChatMessages = document.getElementById("aiChatMessages");

      // OPEN CHAT
      aiChatButton.addEventListener("click", function () {
        aiChatWindow.classList.add("active");
        aiChatButton.style.display = "none";
      });

      // CLOSE CHAT
      aiCloseButton.addEventListener("click", function () {
        aiChatWindow.classList.remove("active");
        aiChatButton.style.display = "flex";
      });

      // SEND MESSAGE

      // SEND MESSAGE TO AI
      aiChatForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const message = aiMessageInput.value.trim();

        if (message === "") return;

        // Display customer's message
        const userMessage = document.createElement("div");

        userMessage.className = "ai-message user-message";
        userMessage.textContent = message;

        aiChatMessages.appendChild(userMessage);

        // Clear input
        aiMessageInput.value = "";

        // Display loading message
        const loadingMessage = document.createElement("div");

        loadingMessage.className = "ai-message bot-message";
        loadingMessage.textContent = "SiyAfika AI is typing...";

        aiChatMessages.appendChild(loadingMessage);

        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;

        try {
          // Send message to backend
          const response = await fetch("http://localhost:3000/api/chat", {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              message: message,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Unable to get a response.");
          }

          // Display AI response
          loadingMessage.textContent = data.reply;
        } catch (error) {
          console.error("Chatbot error:", error);

          loadingMessage.textContent =
            "Sorry, I couldn't connect right now. Please try again.";
        }

        // Scroll to latest message
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
      });

      // MOBILE NAVIGATION
      const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const icon = menuToggle.querySelector('i');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');

  if (mobileMenu.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Close menu when clicking any link
document.querySelectorAll('.mobile-link, .mobile-btn').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});