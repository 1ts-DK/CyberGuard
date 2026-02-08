// --- STATE ---
let currentMode = 'pass';
let currentLang = 'en';
let privacyTimer;

const translations = {
    en: {
        title: "CyberGuard Security Auditor",
        sub: "A robust suite for modern security integrity scans and phishing threat detection.",
        pass: "Password",
        url: "URL Scanner",
        placeholderPass: "Enter password (eg. Student@2026)...",
        placeholderUrl: "Enter URL (eg. https://site.com)...",
        gen: "Secure Generate",
        idle: "WAITING FOR INPUT",
        safe: "SECURE",
        warn: "CAUTION",
        danger: "DANGEROUS",
        timeout: "Session Cleared (Timeout)",
        stat1: "SCANS TODAY",
        stat2: "THREATS BLOCKED",
        stat3: "ACCURACY RATE",
        stat4: "NETWORK UPTIME",
        infoTitle: "SECURITY INTELLIGENCE",
        infoSub: "Stay ahead of evolving cyber threats with our research.",
        viewAll: "View All Reports",
        card1Title: "Brute Force Reality",
        card1Desc: "An 8-character password can be cracked in 5 minutes. A 12-character password takes 200 years.",
        card2Title: "Security Best Practices",
        card3Title: "Spotting Phishing",
        card3Desc: "Check the domain ending. Scammers love .xyz, .top, and .live because they are cheap to buy.",
        link1: "Learn more",
        link2: "Security Checklist",
        link3: "See list"
    },
    es: {
        title: "Auditor de Seguridad CyberGuard",
        sub: "Una suite robusta para escaneos de integridad y detección de amenazas.",
        pass: "Contraseña",
        url: "Escáner URL",
        placeholderPass: "Introducir contraseña...",
        placeholderUrl: "Introducir URL...",
        gen: "Generar Seguro",
        idle: "ESPERANDO ENTRADA",
        safe: "SEGURO",
        warn: "PRECAUCIÓN",
        danger: "PELIGROSO",
        timeout: "Sesión borrada (Tiempo)",
        stat1: "ESCANEOS HOY",
        stat2: "AMENAZAS BLOQUEADAS",
        stat3: "TASA DE PRECISIÓN",
        stat4: "TIEMPO DE ACTIVIDAD",
        infoTitle: "INTELIGENCIA DE SEGURIDAD",
        infoSub: "Manténgase a la vanguardia de las amenazas cibernéticas.",
        viewAll: "Ver Reportes",
        card1Title: "Realidad de Fuerza Bruta",
        card1Desc: "Una contraseña de 8 caracteres se descifra en 5 minutos. Una de 12 tarda 200 años.",
        card2Title: "Mejores Prácticas",
        card3Title: "Detectar Phishing",
        card3Desc: "Revise el dominio. Los estafadores aman .xyz, .top y .live porque son baratos.",
        link1: "Aprende más",
        link2: "Lista de seguridad",
        link3: "Ver lista"
    },
    fr: {
        title: "Auditeur de Sécurité CyberGuard",
        sub: "Une suite robuste pour l'analyse d'intégrité et la détection d'hameçonnage.",
        pass: "Mot de passe",
        url: "Scanner d'URL",
        placeholderPass: "Entrez le mot de passe...",
        placeholderUrl: "Entrez l'URL...",
        gen: "Générer Sécurisé",
        idle: "EN ATTENTE",
        safe: "SÉCURISÉ",
        warn: "ATTENTION",
        danger: "DANGEREUX",
        timeout: "Session effacée (Délai)",
        stat1: "SCANS AUJOURD'HUI",
        stat2: "MENACES BLOQUÉES",
        stat3: "TAUX DE PRÉCISION",
        stat4: "TEMPS DE DISPONIBILITÉ",
        infoTitle: "INTELLIGENCE DE SÉCURITÉ",
        infoSub: "Gardez une longueur d'avance sur les cybermenaces.",
        viewAll: "Voir les rapports",
        card1Title: "Réalité Brute Force",
        card1Desc: "Un mot de passe de 8 caractères est piraté en 5 minutes. 12 caractères prennent 200 ans.",
        card2Title: "Bonnes Pratiques",
        card3Title: "Repérer le Phishing",
        card3Desc: "Vérifiez le domaine. Les escrocs adorent .xyz, .top et .live car ils sont bon marché.",
        link1: "En savoir plus",
        link2: "Liste de sécurité",
        link3: "Voir la liste"
    }
};

const mainInput = document.getElementById('mainInput');
const resultsGrid = document.getElementById('resultsGrid');
const badge = document.getElementById('badge');
const generateBtn = document.getElementById('generateBtn');
const safeMessage = document.getElementById('safeMessage');

document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('themeIcon');
    const isDark = document.body.classList.contains('dark-mode');
    icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    lucide.createIcons();
});

window.onclick = (e) => {
    if (!e.target.closest('.dropdown')) {
        document.getElementById('langMenu').classList.remove('show');
    }
};

document.getElementById('langBtn').onclick = () => {
    document.getElementById('langMenu').classList.toggle('show');
};

function changeLang(lang) {
    currentLang = lang;
    const t = translations[lang];
    document.getElementById('currentLangText').innerText = lang === 'en' ? 'English' : lang === 'es' ? 'Español' : 'Français';
    
    document.getElementById('heroTitle').innerText = t.title;
    document.getElementById('heroSub').innerText = t.sub;
    document.getElementById('modePassText').innerText = t.pass;
    document.getElementById('modeUrlText').innerText = t.url;
    document.getElementById('genBtnText').innerText = t.gen;
    
    document.getElementById('stat1').innerText = t.stat1;
    document.getElementById('stat2').innerText = t.stat2;
    document.getElementById('stat3').innerText = t.stat3;
    document.getElementById('stat4').innerText = t.stat4;
    document.getElementById('infoTitle').innerText = t.infoTitle;
    document.getElementById('infoSub').innerText = t.infoSub;
    document.getElementById('viewAllBtn').innerText = t.viewAll;
    
    document.getElementById('card1Title').innerText = t.card1Title;
    document.getElementById('card1Desc').innerText = t.card1Desc;
    document.getElementById('card2Title').innerText = t.card2Title;
    document.getElementById('card3Title').innerText = t.card3Title;
    document.getElementById('card3Desc').innerText = t.card3Desc;
    document.getElementById('link1').innerText = t.link1;
    document.getElementById('link2').innerText = t.link2;
    document.getElementById('link3').innerText = t.link3;

    mainInput.placeholder = currentMode === 'pass' ? t.placeholderPass : t.placeholderUrl;
    runAudit();
}

function resetPrivacyTimer() {
    clearTimeout(privacyTimer);
    if (mainInput.value !== "") {
        privacyTimer = setTimeout(() => {
            mainInput.value = "";
            runAudit();
            badge.innerText = translations[currentLang].timeout;
            badge.className = "badge idle";
        }, 30000);
    }
}

function setMode(mode) {
    currentMode = mode;
    document.getElementById('passModeBtn').classList.toggle('active', mode === 'pass');
    document.getElementById('urlModeBtn').classList.toggle('active', mode === 'url');
    mainInput.placeholder = translations[currentLang][mode === 'pass' ? 'placeholderPass' : 'placeholderUrl'];
    mainInput.value = "";
    runAudit();
}

mainInput.addEventListener('input', () => {
    if (mainInput.value.length > 0) {
        generateBtn.classList.add('hidden');
    } else {
        if (currentMode === 'pass') generateBtn.classList.remove('hidden');
    }
    runAudit();
    resetPrivacyTimer();
});

function runAudit() {
    const val = mainInput.value;
    resultsGrid.innerHTML = "";
    
    if (!val) {
        badge.innerText = translations[currentLang].idle;
        badge.className = "badge idle";
        safeMessage.classList.add('hidden');
        if (currentMode === 'pass') generateBtn.classList.remove('hidden');
        return;
    }

    let results = [];
    let riskLevel = 'safe';

    if (currentMode === 'pass') {
        if (val.length < 12) {
            results.push({ title: "Length", msg: "Use at least 12 characters", type: "danger" });
            riskLevel = 'danger';
        }
        if (!/[A-Z]/.test(val)) {
            results.push({ title: "Complexity", msg: "Add uppercase letters", type: "warning" });
            if (riskLevel !== 'danger') riskLevel = 'warning';
        }
        if (!/[0-9]/.test(val)) {
            results.push({ title: "Numbers", msg: "Include numbers", type: "warning" });
        }
        if (!/[!@#$%^&*]/.test(val)) {
            results.push({ title: "Symbols", msg: "Add special symbols", type: "warning" });
        }
    } else {
        if (!val.startsWith('https')) {
            results.push({ title: "Insecure", msg: "No HTTPS detected", type: "danger" });
            riskLevel = 'danger';
        }
        if (/\.xyz|\.top|\.live/.test(val)) {
            results.push({ title: "Suspicious", msg: "High-risk domain extension", type: "warning" });
            if (riskLevel !== 'danger') riskLevel = 'warning';
        }
    }

    if (results.length > 0) {
        safeMessage.classList.add('hidden');
        results.forEach(res => {
            const card = document.createElement('div');
            card.className = `result-card ${res.type}`;
            card.innerHTML = `<h3>${res.title}</h3><p>${res.msg}</p>`;
            resultsGrid.appendChild(card);
        });
    } else {
        safeMessage.classList.remove('hidden');
    }

    badge.innerText = translations[currentLang][riskLevel === 'safe' ? 'safe' : riskLevel === 'warning' ? 'warn' : 'danger'];
    badge.className = `badge ${riskLevel}`;
}

generateBtn.onclick = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let pass = "";
    const array = new Uint32Array(16);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < 16; i++) {
        pass += chars[array[i] % chars.length];
    }
    mainInput.value = pass;
    generateBtn.classList.add('hidden');
    runAudit();
    resetPrivacyTimer();
};
