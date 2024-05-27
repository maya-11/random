document.getElementById('chat-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const inputField = document.getElementById('chat-input');
    const userMessage = inputField.value.trim();

    if (userMessage !== '') {
        addMessage(userMessage, 'user');
        getBotResponse(userMessage);
        inputField.value = '';
    }
});

function addMessage(message, sender) {
    const chatContainer = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender);

    const bubbleDiv = document.createElement('div');
    bubbleDiv.classList.add('chat-bubble', sender);
    bubbleDiv.innerText = message;

    messageDiv.appendChild(bubbleDiv);
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function getBotResponse(message) {
    // Simple hardcoded responses for demonstration
    let response = '';

    if (message.toLowerCase().includes('hello')) {
        response = 'Hello! How can I help you today?';
    } else if (message.toLowerCase().includes('help')) {
        response = 'Sure, I am here to help. What do you need assistance with?';
    } else {
        response = 'I am not sure how to respond to that. Can you please rephrase your question?';
    }

    setTimeout(() => addMessage(response, 'bot'), 500);
}
