lucide.createIcons();

// --- STATE MANAGEMENT ---
let currentUser = JSON.parse(localStorage.getItem('cyberGuardUser')) || null;
const history = JSON.parse(localStorage.getItem('scanHistory')) || [];

// --- INITIALIZATION ---
window.onload = () => {
    // 1. Auth Guard
    if (!currentUser) {
        alert("Access Denied. Please Sign In.");
        window.location.href = "/main page/index.htm";
        return;
    }

    // 2. Load User Data
    loadUserProfile();
    
    // 3. Load Stats & Gamification
    calculateStats();
    loadBadges();
    
    // 4. Load History Table
    renderHistory();
    
    // 5. Daily Briefing (Notification)
    checkDailyBriefing();
    
    // 6. Settings toggles
    loadSettings();
};

function loadUserProfile() {
    document.getElementById('navUserName').textContent = currentUser.name;
    document.getElementById('display-name').textContent = currentUser.name;
    document.getElementById('display-tier').textContent = currentUser.tier.toUpperCase();
    document.getElementById('welcome-name').textContent = currentUser.name.split(' ')[0];
    document.getElementById('monitored-email').textContent = currentUser.email;

    // Daily Tip Generator
    const tips = [
        "90% of data breaches start with a phishing email.",
        "Enable 2FA on your email to stop 99% of automated attacks.",
        "Update your browser! Old versions have known security holes.",
        "Avoid public Wi-Fi for banking without a VPN."
    ];
    document.getElementById('daily-tip-text').textContent = tips[Math.floor(Math.random() * tips.length)];
}

// --- TABS LOGIC ---
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    
    // Highlight sidebar item (Simple loop match)
    const buttons = document.querySelectorAll('.nav-item');
    if(tabId === 'overview') buttons[0].classList.add('active');
    if(tabId === 'history') buttons[1].classList.add('active');
    if(tabId === 'subscription') buttons[2].classList.add('active');
    if(tabId === 'settings') buttons[3].classList.add('active');
}

// --- GAMIFICATION & ANALYTICS ---
function calculateStats() {
    // Mock Streak Logic (Random for demo, or based on dates in real app)
    const streak = Math.floor(Math.random() * 15) + 1; 
    document.getElementById('streak-count').textContent = streak;

    // Usage Logic
    const scanCount = history.length;
    document.getElementById('scan-count').textContent = scanCount;
    
    const limit = currentUser.tier === 'Standard Guard' ? 50 : 1000; // Visual limit
    const percentage = Math.min((scanCount / limit) * 100, 100);
    document.getElementById('usage-fill').style.width = percentage + "%";
}

function loadBadges() {
    const container = document.getElementById('badges-container');
    const scanCount = history.length;
    
    const badges = [
        { id: 'rookie', name: 'Rookie Guard', icon: '🛡️', condition: scanCount >= 1 },
        { id: 'wall', name: 'The Wall', icon: '🧱', condition: scanCount >= 10 },
        { id: 'ghost', name: 'Ghost Mode', icon: '👻', condition: localStorage.getItem('incognito') === 'true' },
        { id: 'elite', name: 'Elite Member', icon: '👑', condition: currentUser.tier === 'Elite Guard' }
    ];

    container.innerHTML = badges.map(b => `
        <div class="badge-item ${b.condition ? 'unlocked' : ''}">
            <span class="badge-icon">${b.icon}</span>
            <div class="badge-name">${b.name}</div>
        </div>
    `).join('');
}

// --- HISTORY & ACTIONS ---
function renderHistory() {
    const tbody = document.getElementById('profile-history-body');
    if(history.length === 0) {
        tbody.innerHTML = "<tr><td colspan='5' style='text-align:center; opacity:0.5;'>No scans found. Start scanning!</td></tr>";
        return;
    }
    
    tbody.innerHTML = history.map(h => `
        <tr>
            <td>${h.time}</td>
            <td>${h.type.toUpperCase()}</td>
            <td>${h.val}</td>
            <td><span class="status-badge ${h.risk === 'safe' ? 'safe' : 'danger'}">${h.risk.toUpperCase()}</span></td>
            <td><button class="action-btn-small" onclick="deleteHistoryItem('${h.time}')"><i data-lucide="trash-2" style="width:14px;"></i></button></td>
        </tr>
    `).join('');
    lucide.createIcons();
}

function deleteHistoryItem(timeStr) {
    const newHistory = history.filter(h => h.time !== timeStr);
    localStorage.setItem('scanHistory', JSON.stringify(newHistory));
    window.location.reload();
}

// Mock PDF Export
function exportPDF() {
    const btn = document.querySelector('.outline-btn');
    const origText = btn.innerHTML;
    btn.innerHTML = `<i data-lucide="loader"></i> Generating PDF...`;
    lucide.createIcons();
    
    setTimeout(() => {
        alert("Security Report Generated! (In a real app, this would download 'CyberGuard_Report.pdf')");
        btn.innerHTML = origText;
        lucide.createIcons();
    }, 1500);
}

// Mock Incognito
document.getElementById('incognitoToggle').addEventListener('change', (e) => {
    localStorage.setItem('incognito', e.target.checked);
    loadBadges(); // Refresh for 'Ghost' badge
});

// --- SETTINGS & WATCHLIST ---
function loadSettings() {
    const auto = localStorage.getItem('autoDestruct') === 'true';
    document.getElementById('autoDestruct').checked = auto;
    
    document.getElementById('autoDestruct').addEventListener('change', (e) => {
        localStorage.setItem('autoDestruct', e.target.checked);
        if(e.target.checked) alert("Auto-Destruct Enabled: History will clear at midnight.");
    });
}

function panicClear() {
    if(confirm("ARE YOU SURE? This will wipe your account, history, and settings from this device.")) {
        localStorage.clear();
        alert("System Wiped. Redirecting...");
        window.location.href = "/main page/index.htm";
    }
}

function addToWatchlist() {
    const email = prompt("Enter email to monitor:");
    if(email && email.includes('@')) {
        const div = document.createElement('div');
        div.style.marginTop = "10px";
        div.innerHTML = `✅ <b>${email}</b> is currently safe.`;
        document.getElementById('breach-watchlist').appendChild(div);
    }
}

// --- SUBSCRIPTION ---
function changePlan(newTier) {
    if(currentUser.tier === newTier) return alert("You are already on this plan.");
    
    if(confirm(`Switch plan to ${newTier}?`)) {
        currentUser.tier = newTier;
        localStorage.setItem('cyberGuardUser', JSON.stringify(currentUser));
        alert("Plan updated successfully!");
        window.location.reload();
    }
}

// --- DAILY BRIEFING TOAST ---
function checkDailyBriefing() {
    const lastSeen = localStorage.getItem('lastBriefing');
    const today = new Date().toDateString();
    
    if(lastSeen !== today) {
        showToast("Daily Security Briefing", "3 new Ransomware strains detected in East Africa today. Stay vigilant.");
        localStorage.setItem('lastBriefing', today);
    }
}

function showToast(title, msg) {
    const t = document.getElementById('toast');
    document.getElementById('toast-title').innerText = title;
    document.getElementById('toast-msg').innerText = msg;
    t.classList.remove('hidden');
    lucide.createIcons();
}
function closeToast() { document.getElementById('toast').classList.add('hidden'); }
function logout() { localStorage.removeItem('cyberGuardUser'); window.location.href = "/main page/index.htm"; }

// Theme Toggle (Copied from Index logic)
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    document.getElementById('themeIcon').setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    lucide.createIcons();
});

