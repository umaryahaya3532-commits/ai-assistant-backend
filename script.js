async function sendMessage() {

  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const message = input.value;

  if (message === "") return;

  chatBox.innerHTML += `<p><b>You:</b> ${message}</p>`;

  input.value = "";

  try {

    const response = await fetch(
      "https://ai-assistant-backend-z9si.onrender.com/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: message
        })
      }
    );

    const data = await response.json();

    chatBox.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;

  } catch (error) {

    chatBox.innerHTML += `<p><b>AI:</b> An samu matsala wajen haɗawa da server.</p>`;

  }

}
