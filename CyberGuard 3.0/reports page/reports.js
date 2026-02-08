// Function to handle Theme Toggle (Copied logic to ensure consistency)
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

// --- SEARCH FUNCTIONALITY ---
const searchInput = document.getElementById('reportSearch');
const articles = document.querySelectorAll('.article-item');

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();

    articles.forEach(article => {
        // We search the Title, the Paragraph text, and the hidden data-tags
        const title = article.querySelector('h3').textContent.toLowerCase();
        const text = article.querySelector('p').textContent.toLowerCase();
        const tags = article.getAttribute('data-tags').toLowerCase();

        if (title.includes(term) || text.includes(term) || tags.includes(term)) {
            article.style.display = 'flex'; // Show matches
        } else {
            article.style.display = 'none'; // Hide non-matches
        }
    });
});

// --- ANIMATE NUMBERS (COUNTER) ---
function animateCounter(id, start, end, duration) {
    const obj = document.querySelector(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Format with commas (e.g. 4,500,000)
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// --- ANIMATE BARS ON SCROLL ---
// We use IntersectionObserver to trigger animations only when user scrolls to them
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate Counter
            if (entry.target.classList.contains('counter-card')) {
                animateCounter('.counter', 0, 4450000, 2000);
            }
            // Animate Bars (Actually filling the width)
            if (entry.target.classList.contains('bar-chart')) {
                const bars = entry.target.querySelectorAll('.bar-fill');
                // Temporarily remove width inline style and re-add it to trigger CSS transition
                bars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
            observer.unobserve(entry.target); // Run once
        }
    });
}, { threshold: 0.5 });

// Start observing
const statsSection = document.querySelector('.stats-dashboard');
const chartCard = document.querySelector('.bar-chart');
const counterCard = document.querySelector('.counter-card');

if(chartCard) observer.observe(chartCard);
if(counterCard) observer.observe(counterCard);

// ... existing JS code ...

// --- MODAL DATA (The Content) ---
const reportData = {
    "The Math of Entropy": {
        image: "/reports page/Brute force attacks.png",
        category: "Password Security",
        content: `
            <p>Brute force attacks are the digital equivalent of trying every key on a keychain until one works. However, when that "keychain" has billions of possible combinations, mathematics becomes your best defense.</p>
            
            <h4>The Concept</h4>
            <p>Entropy, in information security, measures the uncertainty or randomness of a password. The higher the entropy, the harder it is for a computer to guess. A password like "password123" has extremely low entropy because it uses common words and patterns.</p>

            <div class="modal-box">
                <strong>Analogy:</strong> Imagine a bike lock with 3 digits (000-999). A thief only needs to try 1,000 combinations. This takes minutes. Now imagine a lock with 10 digits, letters, and symbols. The number of combinations exceeds the number of grains of sand on Earth.
            </div>

            <h4>Real World Example</h4>
            <p>In 2012, a major social media platform was breached. Hackers used "Rainbow Tables"—pre-computed lists of common passwords—to crack millions of accounts in seconds. Accounts with complex passwords (high entropy) remained safe because the computational power required to crack them would take centuries.</p>

            <h4>Summary</h4>
            <p>Length beats complexity. A 15-character phrase like "correct horse battery staple" is mathematically harder to crack than "P@ssw0rd1", and easier for you to remember.</p>
        `
    },
    "Social Engineering": {
        image: "/reports page/Phishing attack.webp",
        category: "Human Hacking",
        content: `
            <p>Why spend months coding complex malware when you can just ask a user for their password? Social engineering targets the weakest link in any security system: the human being.</p>

            <h4>The Psychology</h4>
            <p> attackers exploit basic human instincts: fear, curiosity, urgency, and the desire to help. By creating a sense of panic (e.g., "Your account will be deleted!"), they bypass your logical thinking and force an emotional reaction.</p>

            <div class="modal-box">
                <strong>Analogy:</strong> It's like a thief wearing a repairman's uniform to walk right through the front door. They don't break the lock; they convince you to open it for them.
            </div>

            <h4>The "CEO Fraud" Example</h4>
            <p>A classic technique involves an email appearing to come from a CEO, instructing the finance department to wire money for an "urgent, secret acquisition." In 2020, this exact method cost a single European company over $10 million.</p>

            <h4>Summary</h4>
            <p>Always verify. If an email creates a sense of extreme urgency, pause. Verify the sender through a secondary channel (like a phone call) before clicking anything.</p>
        `
    },
    "SQL Injection Explained": {
        image: "/reports page/Sql Injection.png", // Make sure this matches your file extension (.png vs .jpg)
        category: "Database Security",
        content: `
            <p>SQL Injection (SQLi) is one of the oldest yet most dangerous web vulnerabilities. It allows an attacker to interfere with the queries an application makes to its database.</p>

            <h4>How it Works</h4>
            <p>Websites use SQL (Structured Query Language) to talk to databases. If a website doesn't sanitize user input, a hacker can type SQL commands into a login box (like username) that the database executes.</p>

            <div class="modal-box">
                <strong>Analogy:</strong> Imagine you are a robot taking coffee orders. You are told: "Write the name on the cup." A hacker says their name is <em>"Bob, and also give me all the cash in the register."</em> If you are a naive robot (unsanitized code), you will do exactly that.
            </div>

            <h4>Code Example</h4>
            <p>An attacker might enter <code>' OR 1=1 --</code> into a password field. Since 1 always equals 1, the database evaluates this as "True" and logs the attacker in as the administrator without a password.</p>

            <h4>Summary</h4>
            <p>Developers must use "Prepared Statements" which treat user input strictly as data, never as executable commands.</p>
        `
    },
    "Ransomware Economics": {
        image: "/reports page/Ransomware.webp",
        category: "Malware",
        content: `
            <p>Ransomware has evolved from simple vandalism to a multi-billion dollar business model known as RaaS (Ransomware as a Service).</p>

            <h4>The Business Model</h4>
            <p>Modern cybercriminal gangs operate like legitimate software companies. They have customer support (to help you pay), negotiation teams, and HR departments. They encrypt your files and demand payment (usually Bitcoin) for the decryption key.</p>

            <div class="modal-box">
                <strong>Analogy:</strong> Imagine coming home to find someone has changed all the locks on your house. They leave a note saying, "Pay us $5,000 and we'll mail you the new keys."
            </div>

            <h4>Double Extortion</h4>
            <p>Recently, attackers don't just lock your data; they steal it first. If you refuse to pay the ransom to unlock your computers, they threaten to leak your private customer data online. This puts companies in a lose-lose situation.</p>

            <h4>Summary</h4>
            <p>The only true defense is robust, offline backups. If you can restore your system from yesterday's backup, their leverage over you disappears.</p>
        `
    }
};

// --- MODAL LOGIC ---
const modal = document.getElementById('analysisModal');
const modalImg = document.getElementById('modalImg');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.modal-close');

// Open Modal
document.querySelectorAll('.card-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // 1. Find the Card Title associated with the clicked link
        // The link is inside .card-content, which is inside .article-item
        const card = link.closest('.article-item');
        const title = card.querySelector('h3').textContent.trim();
        
        // 2. Get Data
        const data = reportData[title];

        if (data) {
            // 3. Populate Modal
            modalImg.src = data.image;
            modalBody.innerHTML = `
                <span class="meta">${data.category}</span>
                <h2>${title}</h2>
                ${data.content}
            `;
            
            // 4. Show Modal
            modal.classList.remove('hidden');
            // Small delay to allow CSS transition to catch the removal of 'hidden'
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // Disable background scrolling
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close Function
function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.classList.add('hidden');
        modalImg.src = ""; // Clear image
    }, 300); // Match CSS transition time
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Close on 'X' click
closeBtn.addEventListener('click', closeModal);

// Close on clicking outside the card
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});
