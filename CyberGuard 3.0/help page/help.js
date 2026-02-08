// --- THEME TOGGLE (Standard Logic) ---
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = document.getElementById('themeIcon');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        themeIcon.setAttribute('data-lucide', 'sun');
    } else {
        themeIcon.setAttribute('data-lucide', 'moon');
    }
    lucide.createIcons();
});

// --- CHATBOT LOGIC ---
const chatWindow = document.getElementById('chatWindow');
const chatInput = document.getElementById('chatInput');
const chatBody = document.getElementById('chatBody');

function toggleChat() {
    chatWindow.classList.toggle('hidden');
    if (!chatWindow.classList.contains('hidden')) {
        setTimeout(() => chatInput.focus(), 100);
    }
}

function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // 1. Add User Message
    addMessage(text, 'user');
    chatInput.value = '';

    // 2. Simulate Bot Thinking & Response
    setTimeout(() => {
        const response = getBotResponse(text);
        addMessage(response, 'bot');
    }, 600); // 600ms delay to feel natural
}

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.textContent = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight; // Auto scroll to bottom
}

function getBotResponse(input) {
    const lower = input.toLowerCase();
    
    // Simple Keyword Matching Logic
    if (lower.includes('hello') || lower.includes('hi')) 
        return "Hi! I'm GuardBot. Ask me about scanning links or recent attacks.";
    
    if (lower.includes('scan') || lower.includes('check')) 
        return "To scan a link, go to the Home page and paste the URL in the main white box.";
    
    if (lower.includes('hack') || lower.includes('safe')) 
        return "If you think you are hacked: 1. Disconnect from WiFi. 2. Change your passwords from a different device.";
    
    if (lower.includes('report') || lower.includes('intel')) 
        return "Our Intelligence Reports page shows real-time data on the latest global threats.";

    return "I'm still learning! Try asking: 'How do I scan?' or 'Am I safe?'";
}

// Allow pressing "Enter" to send
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// --- MINI QUIZ LOGIC ---
const questions = [
    { 
        text: "You receive an email from 'NetflixSupport@gmail.com' asking for payment. Is it safe?", 
        isSafe: false,
        explanation: "Correct! Official companies never use @gmail addresses." 
    },
    { 
        text: "A website URL starts with 'https://' and has a lock icon. Is it 100% safe?", 
        isSafe: false, 
        explanation: "Correct! Phishing sites can also use HTTPS. Always check the domain name carefully." 
    },
    { 
        text: "Your boss emails you from their actual work email asking for a quick file. Is it safe?", 
        isSafe: true, 
        explanation: "Likely safe! If the address is correct and the request is normal, it's usually fine." 
    }
];

let currentQIndex = 0;
let score = 0;

function loadQuiz() {
    document.getElementById('qCurrent').textContent = currentQIndex + 1;
    document.getElementById('qTotal').textContent = questions.length;
    document.getElementById('qText').textContent = questions[currentQIndex].text;
}

function answerQuiz(userSaithSafe) {
    const q = questions[currentQIndex];
    // Check correctness (If user says Safe (true) == q.isSafe)
    if (userSaithSafe === q.isSafe) {
        score++;
    }

    if (currentQIndex < questions.length - 1) {
        currentQIndex++;
        loadQuiz();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    document.getElementById('quizQuestionBox').classList.add('hidden');
    document.getElementById('quizResultBox').classList.remove('hidden');
    
    const title = document.getElementById('resultTitle');
    const desc = document.getElementById('resultDesc');
    
    if (score === 3) {
        title.textContent = "Security Expert! 🏆";
        desc.textContent = "You got 3/3. You know how to spot a scam.";
    } else if (score >= 1) {
        title.textContent = "Not Bad! 👍";
        desc.textContent = `You got ${score}/3. Be careful with email domains.`;
    } else {
        title.textContent = "Stay Alert! ⚠️";
        desc.textContent = "You got 0/3. We recommend reading our Intelligence Reports.";
    }
}

function restartQuiz() {
    currentQIndex = 0;
    score = 0;
    document.getElementById('quizQuestionBox').classList.remove('hidden');
    document.getElementById('quizResultBox').classList.add('hidden');
    loadQuiz();
}

// Start Quiz on Load
loadQuiz();