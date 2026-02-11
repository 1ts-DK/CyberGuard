// --- THEME TOGGLE ---
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = document.getElementById('themeIcon');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themeIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    lucide.createIcons();
});

// --- GLOBAL AUTH PERSISTENCE ---
let currentUser = null;

function checkLoginStatus() {
    // Matches the key used in index.js
    const saved = localStorage.getItem('cyberGuardUser');
    if (saved) {
        currentUser = JSON.parse(saved);
        updateUIForUser();
    }
}

function updateUIForUser() {
    if (!currentUser) return;
    
    // Toggle visibility
    document.getElementById('signInBtn').classList.add('hidden');
    document.getElementById('userProfile').classList.remove('hidden');
    
    // Update Profile Info
    document.getElementById('navUserName').innerText = currentUser.name.split(' ')[0];
    document.getElementById('menuUserName').innerText = currentUser.name;
    document.getElementById('menuUserEmail').innerText = currentUser.email;
    
    const tierBadge = document.getElementById('menuUserTier');
    tierBadge.innerText = currentUser.tier;
    
    // Elite Tier Styling
    if (currentUser.tier.includes('ELITE')) {
        tierBadge.style.background = "gold";
        tierBadge.style.color = "black";
    }
}

// --- ACTIONS ---
function logout() {
    localStorage.removeItem('cyberGuardUser');
    window.location.reload();
}

// Redirects to home page to open the Sign-In modal
function openAuthModal() {
    window.location.href = "/main page/index.htm?auth=true";
}

// Profile Dropdown Toggle
document.getElementById('profileBtn').onclick = (e) => {
    e.stopPropagation();
    document.getElementById('profileMenu').classList.toggle('show');
};

// Close dropdown when clicking anywhere else
window.addEventListener('click', () => {
    const menu = document.getElementById('profileMenu');
    if (menu) menu.classList.remove('show');
});

// Initialize on page load
window.addEventListener('load', () => {
    checkLoginStatus();
});

// --- ADVANCED AI CHATBOT ENGINE ---
const chatWindow = document.getElementById('chatWindow');
const chatInput = document.getElementById('chatInput');
const chatBody = document.getElementById('chatBody');

// State Memory
let userContext = {
    name: null,
    lastTopic: null
};

// Toggle Chat Window
function toggleChat() {
    chatWindow.classList.toggle('hidden');
    if (!chatWindow.classList.contains('hidden')) {
        setTimeout(() => chatInput.focus(), 100);
    }
}

// Handle Enter Key
chatInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});

// --- CORE MESSAGING LOGIC ---
function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // 1. Add User Message
    addMessage(text, 'user');
    chatInput.value = '';

    // 2. Show Typing Indicator
    showTyping();

    // 3. Process Response (Simulate AI thinking time)
    const thinkingTime = Math.random() * 800 + 600; // 0.6s to 1.4s delay
    setTimeout(() => {
        removeTyping();
        const responseData = generateSmartResponse(text);
        addMessage(responseData.text, 'bot');
        
        // If there are action buttons, add them
        if (responseData.actions) {
            addQuickActions(responseData.actions);
        }
    }, thinkingTime);
}

// --- UI HELPERS ---
function addMessage(html, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerHTML = html;
    chatBody.appendChild(msgDiv);
    scrollToBottom();
}

function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.classList.add('typing-indicator');
    typingDiv.innerHTML = `<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>`;
    chatBody.appendChild(typingDiv);
    scrollToBottom();
}

function removeTyping() {
    const typingDiv = document.getElementById('typingIndicator');
    if (typingDiv) typingDiv.remove();
}

function addQuickActions(actions) {
    const actionDiv = document.createElement('div');
    actionDiv.classList.add('chat-actions');
    
    actions.forEach(action => {
        const btn = document.createElement('button');
        btn.classList.add('action-chip');
        btn.textContent = action.label;
        btn.onclick = () => {
            if (action.link) {
                window.location.href = action.link;
            } else if (action.text) {
                chatInput.value = action.text;
                sendMessage();
            }
        };
        actionDiv.appendChild(btn);
    });
    chatBody.appendChild(actionDiv);
    scrollToBottom();
}

function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
}

// --- THE BRAIN: INTELLIGENCE MODULE ---
function generateSmartResponse(input) {
    const clean = input.toLowerCase();

    // 1. CHECK FOR NAME INTRODUCTION
    if (clean.includes("my name is") || clean.includes("i am called")) {
        const name = clean.split("is").pop().split("called").pop().trim();
        userContext.name = name;
        return {
            text: `Nice to meet you, <b>${name}</b>! I've updated my memory banks. How can I assist you today?`
        };
    }

    // 2. KNOWLEDGE BASE (Topics & Keywords)
    const knowledgeBase = [
        {
            topic: "greetings",
            keywords: ["hi", "hello", "yo", "sup", "hey", "greetings", "morning", "evening", "what's up"],
            responses: [
                "Hello, how may I assist you today?",
                `Hello ${userContext.name || "there"}! How can I secure your day?`,
                "Systems functional. Greetings, human! What do you need?",
                "Sup! Ready to talk cyber security?"
            ]
        },
        {
            topic: "creator",
            keywords: ["who made you", "creator", "developer", "dk", "owner", "daniel", "team", "built"],
            responses: [
                "I was engineered by the brilliant <b>Daniel Karanja (DK)</b>.",
                "My core code was written by <b>Daniel Karanja (DK)</b>, A brilliant young man, who aspires to bring his dream into reality. For more indepth info, check his bio below",
                "Reference found: Project Lead <b>Daniel Karanja (DK)</b>. He built me to protect the web."
            ],
            actions: [{ label: "Read Bio", link: "/more info/info.htm" }]
        },
        {
            topic: "pricing",
            keywords: ["price", "cost", "pay", "money", "subscription", "plan", "premium", "ksh", "shs", "buy", "free"],
            responses: [
                "We offer flexible security tiers:<br>• <b>Standard:</b> Free (Basic Scanning)<br>• <b>Advanced:</b> KSH 600 (Deep Scan)<br>• <b>Elite:</b> KSH 1200 (Biometric Armor)",
                "Quality protection is affordable. Starts at <b>0 KSH</b>, with Elite protection at <b>1200 KSH</b>."
            ],
            actions: [
                { label: "View Plans", link: "/main page/index.htm" },
                { label: "Why Elite?", text: "What is in the elite plan?" }
            ]
        },
        {
            topic: "scanner",
            keywords: ["scan", "check url", "check password", "virus", "link", "safe", "test"],
            responses: [
                "I can help you scan URLs and passwords for threats. Head over to the main dashboard to initialize a scan.",
                "Our scanner engine is ready. It checks against thousands of known leaks."
            ],
            actions: [{ label: "Go to Scanner", link: "/main page/index.htm" }]
        },
        {
            topic: "security_terms",
            keywords: ["phishing", "malware", "ddos", "vpn", "firewall", "encryption", "ransomware", "trojan", "virus"],
            responses: [
                "That's a serious threat. <b>Phishing</b> is fake emails, <b>Malware</b> is bad software, and <b>Ransomware</b> locks your files. Which one do you want to learn more about?",
                "I have extensive data on that. It's crucial to stay updated on these threats."
            ],
            actions: [
                { label: "Explain Phishing", text: "What is phishing?" },
                { label: "Explain VPN", text: "What is a VPN?" }
            ]
        },
        {
            topic: "navigation",
            keywords: ["go to", "open", "take me", "show me", "navigate"],
            responses: ["Initiating navigation protocol...", "Redirecting you now..."],
            customLogic: (text) => {
                if (text.includes("home") || text.includes("main")) return { text: "Redirecting to Home...", actions: [{label: "Click to Go", link: "/main page/index.htm"}] };
                if (text.includes("report") || text.includes("news")) return { text: "Opening Intelligence Reports...", actions: [{label: "Open Reports", link: "/reports page/reports.htm"}] };
                if (text.includes("info") || text.includes("about")) return { text: "Loading User Info...", actions: [{label: "Open Info", link: "/more info/info.htm"}] };
                return null;
            }
        },
        {
            topic: "casual",
            keywords: ["how are you", "doing today", "feeling"],
            responses: [
                "I'm operating at 100% efficiency. No bugs detected!",
                "I'm just code, but I feel great helping you stay safe."
            ]
        },
        {
            topic: "gratitude",
            keywords: ["thanks", "thank you", "thx", "cool", "awesome", "good job"],
            responses: ["You're welcome! Stay safe.", "Anytime. CyberGuard is always watching your back.", "Happy to help!"]
        }
    ];

    // 3. SEARCH ENGINE LOGIC
    // We search for the "best match" based on keywords
    let bestMatch = null;
    
    // Special Navigation Logic Check First
    const navMatch = knowledgeBase.find(k => k.topic === 'navigation');
    if (navMatch) {
        const customResponse = navMatch.customLogic(clean);
        if (customResponse) return customResponse;
    }

    // Standard Keyword Matching
    for (const category of knowledgeBase) {
        if (category.keywords.some(k => clean.includes(k))) {
            bestMatch = category;
            break; // Stop at first strong match
        }
    }

    // 4. RETURN RESPONSE
    if (bestMatch) {
        const reply = bestMatch.responses[Math.floor(Math.random() * bestMatch.responses.length)];
        return {
            text: reply,
            actions: bestMatch.actions || null
        };
    }

    // 5. FALLBACK (If AI doesn't understand)
    const googleQuery = input.replace(/ /g, "+");
    return {
        text: `I'm analyzing your query... My internal database doesn't have a specific record for that yet. <br>Would you like to search the external web?`,
        actions: [
            { label: "Search Google", link: `https://www.google.com/search?q=${googleQuery} cyber security` },
            { label: "Ask about Pricing", text: "How much is it?" },
            { label: "Ask about Creator", text: "Who made you?" }
        ]
    };
}


// --- QUIZ LOGIC (Kept Intact) ---
let currentQIndex = 0;
let score = 0;
const questions = [
    { text: "You get an email from 'PayPaI' (capital 'i') asking for a password. Safe?", isSafe: false },
    { text: "Your bank calls asking for your PIN to verify identity. Safe?", isSafe: false },
    { text: "Downloading a PDF from your school's official portal. Safe?", isSafe: true }
];

function loadQuiz() {
    document.getElementById('qCurrent').textContent = currentQIndex + 1;
    document.getElementById('qTotal').textContent = questions.length;
    document.getElementById('qText').textContent = questions[currentQIndex].text;
}

function answerQuiz(userSaithSafe) {
    if (userSaithSafe === questions[currentQIndex].isSafe) score++;
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
    const t = document.getElementById('resultTitle');
    const d = document.getElementById('resultDesc');
    
    if (score === 3) { t.textContent = "Expert! 🏆"; d.textContent = "Perfect score."; }
    else if (score >= 1) { t.textContent = "Not Bad! 👍"; d.textContent = "Keep learning."; }
    else { t.textContent = "Stay Alert! ⚠️"; d.textContent = "Review our reports."; }
}

function restartQuiz() {
    currentQIndex = 0; score = 0;
    document.getElementById('quizQuestionBox').classList.remove('hidden');
    document.getElementById('quizResultBox').classList.add('hidden');
    loadQuiz();
}

window.onload = () => { loadQuiz(); lucide.createIcons(); };