function openChat() {
    document.getElementById('chat-window').classList.remove('hidden');
}

function closeChat() {
    document.getElementById('chat-window').classList.add('hidden');
}

async function sendMessage() {
    const messageInput = document.getElementById('message');
    const messageText = messageInput.value;

    if (messageText.trim() === '') return;

    appendMessage(messageText, 'sent');

    const responseText = await getChatGPTResponse(messageText);
    appendMessage(responseText, 'received');

    messageInput.value = '';
}

function appendMessage(text, type) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message', type);
    messageContainer.innerHTML = `<p>${text}</p><span class="time">${new Date().toLocaleTimeString()}</span>`;
    document.getElementById('chat-body').appendChild(messageContainer);
    messageContainer.scrollIntoView();
}

async function getChatGPTResponse(message) {
    const response = await fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    });
    const data = await response.json();
    return data.response;
}
