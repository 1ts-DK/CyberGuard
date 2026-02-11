// --- STATE ---
let currentMode = 'pass';
let currentLang = 'en';
let privacyTimer;
let currentUser = null;
let historyDebounce;

// --- TRANSLATIONS (Full Content with FIXED Images) ---
const translations = {
    en: {
        brand: "CYBERGUARD",
        langName: "English",
        heroTitle: "CyberGuard Security Auditor",
        heroSub: "A robust suite for modern security integrity scans and phishing threat detection.",
        modePass: "Password",
        modeUrl: "URL Scanner",
        placeholderPass: "Enter password (eg. Student@2026)...",
        placeholderUrl: "Enter URL (eg. https://site.com)...",
        badgeIdle: "WAITING FOR INPUT",
        badgeSafe: "SECURE",
        badgeWarn: "CAUTION",
        badgeDanger: "DANGEROUS",
        genBtn: "Secure Generate",
        footerText: "Project done by UR truly DK, Joyce, Zippy, Karanja & Nissi",
        
        stat1Label: "SCANS TODAY",
        stat1Title: "Too Many",
        stat2Label: "THREATS BLOCKED",
        stat2Title: "A Lot",
        stat3Label: "ACCURACY RATE",
        stat4Label: "NETWORK UPTIME",
        infoTitle: "SECURITY INTELLIGENCE",
        infoSub: "Stay ahead of evolving cyber threats with our research.",
        viewAll: "View All Reports",
        
        // Card Summaries
        card1Title: "Brute Force Reality",
        card1Desc: "An 8-character password can be cracked in 5 minutes. A 12-character password takes 200 years.",
        link1: "Learn more",
        card2Title: "Security Best Practices",
        link2: "Security Checklist",
        card3Title: "Spotting Phishing",
        card3Desc: "Check the domain ending. Scammers love .xyz, .top, and .live because they are cheap to buy.",
        link3: "See list",

        // Audit Messages
        msgSecure: "No immediate threats detected.",
        errLength: "Minimum 12 Characters Needed",
        errCaps: "Add Uppercase Letters",
        errNum: "Include Numbers",
        errSym: "Add Special Symbols",
        errHttps: "Missing HTTPS Encryption",
        errDomain: "High-risk domain extension",
        titleLength: "Too Short",
        titleComplex: "Complexity",
        titleNum: "Numbers",
        titleSym: "Symbols",
        titleInsecure: "Not Secure",
        titleSuspicious: "Suspicious",

        // --- NEW ARTICLE CONTENT (Added Images) ---
        articles: {
            card1: {
                title: "The Math Behind Brute Force",
                img: "brute force.webp", 
                body: `<p>Brute force attacks work by trying every possible combination of characters until the correct one is found. The math is simple: it's about entropy.</p>
                       <p>A standard 8-character password using only lowercase letters has about 200 billion combinations. A modern GPU can guess this in minutes.</p>
                       <p><strong>The Solution:</strong> By adding just 4 characters (making it 12) and mixing numbers and symbols, the combinations rise to the quadrillions, taking standard computers centuries to crack.</p>`
            },
            card2: {
                title: "Essential Security Checklist",
                img: "security practices.jpg",
                body: `<p>To keep your digital life secure, follow these non-negotiable rules:</p>
                       <ul>
                           <li><strong>Passphrases over Passwords:</strong> Use 3 random words like "Horse-Battery-Staple".</li>
                           <li><strong>Enable 2FA:</strong> Two-Factor Authentication stops 99% of automated attacks.</li>
                           <li><strong>Update Software:</strong> Updates contain patches for security holes hackers use.</li>
                           <li><strong>Manager Usage:</strong> Use a password manager so you never have to remember complex codes.</li>
                       </ul>`
            },
            card3: {
                title: "Common Phishing Indicators",
                img: "Phishing.jpg",
                body: `<p>Phishing attempts are getting smarter, but they always leave clues. Watch out for:</p>
                       <p><strong>1. Urgency:</strong> "Act now or your account will be deleted!" is a classic panic tactic.</p>
                       <p><strong>2. The Domain:</strong> Look closely. 'google.com' is safe, but 'goog1e.com' or 'google-security-team.xyz' is a scam.</p>
                       <p><strong>3. Generic Greetings:</strong> "Dear Customer" instead of your actual name is a red flag.</p>`
            }
        }
    },
    es: {
        // ... (Existing Translations) ...
        brand: "CIBERGUARDIA",
        langName: "Español",
        heroTitle: "Auditor de Seguridad CyberGuard",
        heroSub: "Una suite robusta para escaneos de integridad y detección de phishing.",
        modePass: "Contraseña",
        modeUrl: "Escáner URL",
        placeholderPass: "Introduce contraseña (ej. Estudiante@2026)...",
        placeholderUrl: "Introduce URL (ej. https://sitio.com)...",
        badgeIdle: "ESPERANDO",
        badgeSafe: "SEGURO",
        badgeWarn: "PRECAUCIÓN",
        badgeDanger: "PELIGROSO",
        genBtn: "Generar Seguro",
        footerText: "Proyecto realizado por DK, Joyce, Zippy, Karanja y Nissi",
        stat1Label: "ESCANEOS HOY",
        stat1Title: "Muchos",
        stat2Label: "AMENAZAS BLOQUEADAS",
        stat2Title: "Montones",
        stat3Label: "PRECISIÓN",
        stat4Label: "TIEMPO DE ACTIVIDAD",
        infoTitle: "INTELIGENCIA DE SEGURIDAD",
        infoSub: "Manténgase por delante de las ciberamenazas.",
        viewAll: "Ver Reportes",
        card1Title: "Realidad de Fuerza Bruta",
        card1Desc: "Una contraseña de 8 caracteres se descifra en 5 minutos. Una de 12 toma 200 años.",
        link1: "Aprender más",
        card2Title: "Mejores Prácticas",
        link2: "Lista de Verificación",
        card3Title: "Detectar Phishing",
        card3Desc: "Revise el dominio. Los estafadores aman .xyz, .top y .live porque son baratos.",
        link3: "Ver lista",
        msgSecure: "No se detectaron amenazas.",
        errLength: "Mínimo 12 caracteres necesarios",
        errCaps: "Añadir letras mayúsculas",
        errNum: "Incluir números",
        errSym: "Añadir símbolos especiales",
        errHttps: "Falta encriptación HTTPS",
        errDomain: "Extensión de dominio arriesgada",
        titleLength: "Muy Corto",
        titleComplex: "Complejidad",
        titleNum: "Números",
        titleSym: "Símbolos",
        titleInsecure: "No Seguro",
        titleSuspicious: "Sospechoso",

        // --- NEW ARTICLE CONTENT (Spanish) ---
        articles: {
            card1: {
                title: "Matemáticas de Fuerza Bruta",
                img: "brute force.webp",
                body: `<p>Los ataques de fuerza bruta prueban todas las combinaciones posibles. Es un juego de números.</p>
                       <p>Una contraseña de 8 letras minúsculas tiene 200 mil millones de combinaciones. Una GPU moderna adivina esto en minutos.</p>
                       <p><strong>La Solución:</strong> Al agregar solo 4 caracteres (total 12) y mezclar números, las combinaciones suben a cuatrillones, tomando siglos descifrarlas.</p>`
            },
            card2: {
                title: "Lista de Seguridad Esencial",
                img: "security practices.jpg",
                body: `<p>Para mantener segura su vida digital, siga estas reglas:</p>
                       <ul>
                           <li><strong>Frases de contraseña:</strong> Use 3 palabras al azar como "Caballo-Batería-Grapa".</li>
                           <li><strong>Active 2FA:</strong> La autenticación de dos factores detiene el 99% de los ataques.</li>
                           <li><strong>Actualice Software:</strong> Las actualizaciones contienen parches de seguridad vitales.</li>
                       </ul>`
            },
            card3: {
                title: "Indicadores de Phishing",
                img: "Phishing.jpg",
                body: `<p>Los intentos de phishing son cada vez más inteligentes, pero dejan pistas:</p>
                       <p><strong>1. Urgencia:</strong> "¡Actúe ahora o su cuenta será eliminada!" es una táctica de pánico clásica.</p>
                       <p><strong>2. El Dominio:</strong> Mire de cerca. 'google.com' es seguro, pero 'goog1e.com' o 'soporte-banco.xyz' es una estafa.</p>`
            }
        }
    },
    fr: {
        // ... (Existing Translations) ...
        brand: "CYBERGUARD",
        langName: "Français",
        heroTitle: "Auditeur de Sécurité CyberGuard",
        heroSub: "Une suite robuste pour l'intégrité de la sécurité et la détection du phishing.",
        modePass: "Mot de Passe",
        modeUrl: "Scanner URL",
        placeholderPass: "Entrez le mot de passe...",
        placeholderUrl: "Entrez l'URL (ex. https://site.com)...",
        badgeIdle: "EN ATTENTE",
        badgeSafe: "SÉCURISÉ",
        badgeWarn: "ATTENTION",
        badgeDanger: "DANGEREUX",
        genBtn: "Générer Sécurisé",
        footerText: "Projet réalisé par DK, Joyce, Zippy, Karanja & Nissi",
        stat1Label: "SCANS AUJOURD'HUI",
        stat1Title: "Beaucoup",
        stat2Label: "MENACES BLOQUÉES",
        stat2Title: "Énormément",
        stat3Label: "PRÉCISION",
        stat4Label: "TEMPS DE FONCTIONNEMENT",
        infoTitle: "RENSEIGNEMENT SÉCURITÉ",
        infoSub: "Gardez une longueur d'avance sur les cybermenaces.",
        viewAll: "Voir les rapports",
        card1Title: "Réalité Force Brute",
        card1Desc: "Un mot de passe de 8 caractères est piraté en 5 min. 12 caractères prennent 200 ans.",
        link1: "En savoir plus",
        card2Title: "Meilleures Pratiques",
        link2: "Liste de contrôle",
        card3Title: "Repérer l'Hameçonnage",
        card3Desc: "Vérifiez le domaine. Les escrocs aiment .xyz, .top et .live car ils sont bon marché.",
        link3: "Voir la liste",
        msgSecure: "Aucune menace détectée.",
        errLength: "Minimum 12 caractères requis",
        errCaps: "Ajouter des majuscules",
        errNum: "Inclure des chiffres",
        errSym: "Ajouter des symboles",
        errHttps: "Cryptage HTTPS manquant",
        errDomain: "Extension de domaine risquée",
        titleLength: "Trop Court",
        titleComplex: "Complexité",
        titleNum: "Chiffres",
        titleSym: "Symboles",
        titleInsecure: "Non Sécurisé",
        titleSuspicious: "Suspect",

        // --- NEW ARTICLE CONTENT (French) ---
        articles: {
            card1: {
                title: "Mathématiques de Force Brute",
                img: "brute force.webp",
                body: `<p>Les attaques par force brute essaient toutes les combinaisons possibles.</p>
                       <p>Un mot de passe standard de 8 caractères a environ 200 milliards de combinaisons. Un GPU moderne devine cela en quelques minutes.</p>
                       <p><strong>La Solution:</strong> En ajoutant juste 4 caractères (pour 12) et en mélangeant les chiffres, cela prend des siècles à craquer.</p>`
            },
            card2: {
                title: "Liste de contrôle de sécurité",
                img: "security practices.jpg",
                body: `<p>Pour sécuriser votre vie numérique, suivez ces règles :</p>
                       <ul>
                           <li><strong>Phrases secrètes :</strong> Utilisez 3 mots aléatoires.</li>
                           <li><strong>Activez la 2FA :</strong> L'authentification à deux facteurs arrête 99% des attaques.</li>
                           <li><strong>Mises à jour :</strong> Les mises à jour contiennent des correctifs vitaux.</li>
                       </ul>`
            },
            card3: {
                title: "Indicateurs d'hameçonnage",
                img: "Phishing.jpg",
                body: `<p>Les tentatives d'hameçonnage laissent toujours des indices :</p>
                       <p><strong>1. Urgence :</strong> "Agissez maintenant ou votre compte sera supprimé !" est une tactique de panique.</p>
                       <p><strong>2. Le Domaine :</strong> Regardez de près. 'google.com' est sûr, mais 'goog1e.com' est une arnaque.</p>`
            }
        }
    }
};

// --- NAVIGATION & LANGUAGE ---
function changeLang(lang) {
    currentLang = lang;
    const t = translations[lang] || translations['en'];
    document.querySelectorAll('.brand').forEach(b => b.textContent = t.brand);
    document.getElementById('heroTitle').textContent = t.heroTitle;
    document.getElementById('heroSub').textContent = t.heroSub;
    document.getElementById('modePassText').textContent = t.modePass;
    document.getElementById('modeUrlText').textContent = t.modeUrl;
    document.getElementById('genBtnText').textContent = t.genBtn;
    document.getElementById('infoTitle').textContent = t.infoTitle;
    document.getElementById('infoSub').textContent = t.infoSub;
    document.getElementById('viewAllBtn').textContent = t.viewAll;
    setMode(currentMode);
    lucide.createIcons();
}

function setMode(mode) {
    currentMode = mode;
    const t = translations[currentLang] || translations['en'];
    document.getElementById('passModeBtn').classList.toggle('active', mode === 'pass');
    document.getElementById('urlModeBtn').classList.toggle('active', mode === 'url');
    document.getElementById('mainInput').placeholder = (mode === 'pass') ? t.placeholderPass : t.placeholderUrl;
    document.getElementById('mainInput').value = "";
    document.getElementById('resultsGrid').innerHTML = "";
    document.getElementById('safeMessage').classList.add('hidden');
    document.getElementById('generateBtn').classList.toggle('hidden', mode === 'url');
    document.getElementById('badge').innerText = t.badgeIdle;
    document.getElementById('badge').className = "badge idle";
}

// --- MODALS (UPDATED TO USE IMAGES) ---
function openModal(cardKey) {
    const article = translations[currentLang].articles[cardKey];
    document.getElementById('modalTitle').textContent = article.title;
    document.getElementById('modalBody').innerHTML = article.body;
    // This line now works because we added "img" to the translations object above
    document.getElementById('modalImg').src = article.img;
    document.getElementById('modalOverlay').classList.remove('hidden');
}
function closeModal() { document.getElementById('modalOverlay').classList.add('hidden'); }

// --- AUTH & SUBSCRIPTIONS ---
function checkLoginStatus() {
    const stored = localStorage.getItem('cyberGuardUser');
    if (stored) {
        currentUser = JSON.parse(stored);
        updateAuthUI(true);
        loadHistory();
    } else {
        updateAuthUI(false);
    }
}

function updateAuthUI(loggedIn) {
    const profile = document.getElementById('userProfile');
    const signin = document.getElementById('signInBtn');
    if (loggedIn) {
        signin.classList.add('hidden');
        profile.classList.remove('hidden');
        document.getElementById('navUserName').textContent = currentUser.name;
        document.getElementById('menuUserName').textContent = currentUser.name;
        document.getElementById('menuUserEmail').textContent = currentUser.email;
        document.getElementById('menuUserTier').textContent = currentUser.tier.toUpperCase();
        document.getElementById('historySection').classList.remove('hidden');
        
        // HIDE UPGRADE BUTTON ONLY FOR ELITE
        document.getElementById('upgradeBtn').style.display = (currentUser.tier === 'Elite Guard') ? 'none' : 'flex';
    } else {
        signin.classList.remove('hidden');
        profile.classList.add('hidden');
        document.getElementById('historySection').classList.add('hidden');
    }
}

function logout() { localStorage.removeItem('cyberGuardUser'); location.reload(); }

function startAuthProcess() {
    const email = document.getElementById('authEmail').value;
    if(!email.includes('@')) return alert("Enter valid email");
    document.getElementById('authStep1').classList.add('hidden');
    document.getElementById('authStep2').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('authStep2').classList.add('hidden');
        document.getElementById('authStep3').classList.remove('hidden');
        currentUser = { email: email, name: email.split('@')[0], tier: 'Standard Guard' };
    }, 1500);
}

function goToPlanSelection() {
    document.getElementById('authStep3').classList.add('hidden');
    document.getElementById('authStep4').classList.remove('hidden');
}

function selectPlan(tier) {
    currentUser.tier = tier;
    currentUser.name = currentUser.name.charAt(0).toUpperCase() + currentUser.name.slice(1);
    localStorage.setItem('cyberGuardUser', JSON.stringify(currentUser));
    location.reload();
}

function confirmUpgrade(tier) {
    currentUser.tier = tier;
    localStorage.setItem('cyberGuardUser', JSON.stringify(currentUser));
    updateAuthUI(true);
    closeSubModal();
}

// --- SCANNER ENGINE ---
document.getElementById('generateBtn').onclick = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let pass = "";
    const array = new Uint32Array(16);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < 16; i++) pass += chars[array[i] % chars.length];
    document.getElementById('mainInput').value = pass;
    document.getElementById('generateBtn').classList.add('hidden');
    runAudit();
    resetPrivacyTimer();
};

document.getElementById('mainInput').oninput = () => {
    if (document.getElementById('mainInput').value.length > 0) document.getElementById('generateBtn').classList.add('hidden');
    runAudit();
    resetPrivacyTimer();
};

function runAudit() {
    const val = document.getElementById('mainInput').value;
    const t = translations[currentLang];
    const grid = document.getElementById('resultsGrid');
    grid.innerHTML = "";
    if (!val) {
        document.getElementById('badge').innerText = t.badgeIdle;
        document.getElementById('badge').className = "badge idle";
        document.getElementById('safeMessage').classList.add('hidden');
        return;
    }
    let results = [];
    let risk = 'safe';
    if (currentMode === 'pass') {
        if (val.length < 12) { results.push({t:"Too Short", m:"12+ chars needed", s:"danger"}); risk='danger'; }
    } else {
        if (!val.startsWith('https')) { results.push({t:"Unsecured", m:"No HTTPS detected", s:"danger"}); risk='danger'; }
    }
    if (results.length > 0) {
        results.forEach(r => {
            const d = document.createElement('div');
            d.className = `result-card ${r.s}`;
            d.innerHTML = `<h3>${r.t}</h3><p>${r.m}</p>`;
            grid.appendChild(d);
        });
    } else {
        document.getElementById('safeMessage').classList.remove('hidden');
    }
    document.getElementById('badge').innerText = t[`badge${risk.charAt(0).toUpperCase() + risk.slice(1)}`];
    document.getElementById('badge').className = `badge ${risk}`;
    
    clearTimeout(historyDebounce);
    historyDebounce = setTimeout(() => {
        if(currentUser) saveToHistory(currentMode, val, risk);
    }, 1000);
}

function resetPrivacyTimer() {
    clearTimeout(privacyTimer);
    if (document.getElementById('mainInput').value !== "") {
        privacyTimer = setTimeout(() => {
            document.getElementById('mainInput').value = "";
            runAudit();
            document.getElementById('badge').innerText = "TIMEOUT";
        }, 30000);
    }
}

// --- HISTORY & UI HELPERS ---
function saveToHistory(type, val, risk) {
    let history = JSON.parse(localStorage.getItem('scanHistory') || "[]");
    history.unshift({type, val: val.substring(0,3)+"***", risk, time: new Date().toLocaleTimeString()});
    localStorage.setItem('scanHistory', JSON.stringify(history.slice(0,5)));
    loadHistory();
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('scanHistory') || "[]");
    const body = document.getElementById('historyTableBody');
    body.innerHTML = history.map(h => `<tr><td>${h.type}</td><td>${h.val}</td><td>${h.risk}</td><td>${h.time}</td></tr>`).join('');
}

function clearHistory() { localStorage.removeItem('scanHistory'); loadHistory(); }

document.getElementById('profileBtn').onclick = (e) => {
    e.stopPropagation();
    document.getElementById('profileMenu').classList.toggle('show');
};
window.onclick = () => document.getElementById('profileMenu').classList.remove('show');

function openAuthModal() { document.getElementById('authModal').classList.remove('hidden'); }
function closeAuthModal() { document.getElementById('authModal').classList.add('hidden'); }
function openSubModal() { document.getElementById('subModalOverlay').classList.remove('hidden'); }
function closeSubModal() { document.getElementById('subModalOverlay').classList.add('hidden'); }

window.onload = () => {
    checkLoginStatus();
    lucide.createIcons();
};

// --- FIXED THEME TOGGLE (Swaps Icon) ---
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Check if dark mode is active
    const isDark = document.body.classList.contains('dark-mode');
    
    // Get the icon element
    const themeIcon = document.getElementById('themeIcon');
    
    // Swap icon: sun if dark mode, moon if light mode
    themeIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    
    // Re-render the icon
    lucide.createIcons();
});

