// --- STATE ---
let currentMode = 'pass';
let currentLang = 'en';
let privacyTimer;

// --- TRANSLATIONS SOURCE OF TRUTH ---
const translations = {
    en: {
        // ... (Existing translations keep same) ...
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

        // --- NEW ARTICLE CONTENT ---
        articles: {
            card1: {
                title: "The Math Behind Brute Force",
                body: `<p>Brute force attacks work by trying every possible combination of characters until the correct one is found. The math is simple: it's about entropy.</p>
                       <p>A standard 8-character password using only lowercase letters has about 200 billion combinations. A modern GPU can guess this in minutes.</p>
                       <p><strong>The Solution:</strong> By adding just 4 characters (making it 12) and mixing numbers and symbols, the combinations rise to the quadrillions, taking standard computers centuries to crack.</p>`
            },
            card2: {
                title: "Essential Security Checklist",
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
                body: `<p>Los ataques de fuerza bruta prueban todas las combinaciones posibles. Es un juego de números.</p>
                       <p>Una contraseña de 8 letras minúsculas tiene 200 mil millones de combinaciones. Una GPU moderna adivina esto en minutos.</p>
                       <p><strong>La Solución:</strong> Al agregar solo 4 caracteres (total 12) y mezclar números, las combinaciones suben a cuatrillones, tomando siglos descifrarlas.</p>`
            },
            card2: {
                title: "Lista de Seguridad Esencial",
                body: `<p>Para mantener segura su vida digital, siga estas reglas:</p>
                       <ul>
                           <li><strong>Frases de contraseña:</strong> Use 3 palabras al azar como "Caballo-Batería-Grapa".</li>
                           <li><strong>Active 2FA:</strong> La autenticación de dos factores detiene el 99% de los ataques.</li>
                           <li><strong>Actualice Software:</strong> Las actualizaciones contienen parches de seguridad vitales.</li>
                       </ul>`
            },
            card3: {
                title: "Indicadores de Phishing",
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
                body: `<p>Les attaques par force brute essaient toutes les combinaisons possibles.</p>
                       <p>Un mot de passe standard de 8 caractères a environ 200 milliards de combinaisons. Un GPU moderne devine cela en quelques minutes.</p>
                       <p><strong>La Solution:</strong> En ajoutant juste 4 caractères (pour 12) et en mélangeant les chiffres, cela prend des siècles à craquer.</p>`
            },
            card2: {
                title: "Liste de contrôle de sécurité",
                body: `<p>Pour sécuriser votre vie numérique, suivez ces règles :</p>
                       <ul>
                           <li><strong>Phrases secrètes :</strong> Utilisez 3 mots aléatoires.</li>
                           <li><strong>Activez la 2FA :</strong> L'authentification à deux facteurs arrête 99% des attaques.</li>
                           <li><strong>Mises à jour :</strong> Les mises à jour contiennent des correctifs vitaux.</li>
                       </ul>`
            },
            card3: {
                title: "Indicateurs d'hameçonnage",
                body: `<p>Les tentatives d'hameçonnage laissent toujours des indices :</p>
                       <p><strong>1. Urgence :</strong> "Agissez maintenant ou votre compte sera supprimé !" est une tactique de panique.</p>
                       <p><strong>2. Le Domaine :</strong> Regardez de près. 'google.com' est sûr, mais 'goog1e.com' est une arnaque.</p>`
            }
        }
    }
};

// --- DOM ELEMENTS ---
const mainInput = document.getElementById('mainInput');
const resultsGrid = document.getElementById('resultsGrid');
const badge = document.getElementById('badge');
const generateBtn = document.getElementById('generateBtn');
const safeMessage = document.getElementById('safeMessage');

// --- THEME LOGIC ---
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('themeIcon');
    const isDark = document.body.classList.contains('dark-mode');
    icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    lucide.createIcons();
});

// --- DROPDOWN LOGIC ---
window.onclick = (e) => {
    // Also close modal if clicking background
    const modal = document.getElementById('modalOverlay');
    if (e.target === modal) {
        closeModal();
    }
    
    if (!e.target.closest('.dropdown')) {
        document.getElementById('langMenu').classList.remove('show');
    }
};

document.getElementById('langBtn').onclick = () => {
    document.getElementById('langMenu').classList.toggle('show');
};

// --- MODAL LOGIC (NEW) ---
function openModal(cardKey) {
    const t = translations[currentLang];
    const article = t.articles[cardKey];
    const modal = document.getElementById('modalOverlay');
    
    // Set Image based on card
    let imgSrc = "";
    if(cardKey === 'card1') imgSrc = "brute force.webp";
    if(cardKey === 'card2') imgSrc = "security practices.jpg";
    if(cardKey === 'card3') imgSrc = "Phishing.jpg";
    
    document.getElementById('modalImg').src = imgSrc;
    document.getElementById('modalTitle').innerText = article.title;
    document.getElementById('modalBody').innerHTML = article.body;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
}

function closeModal() {
    document.getElementById('modalOverlay').classList.add('hidden');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// --- LANGUAGE SWITCHER ---
function changeLang(lang) {
    currentLang = lang;
    const t = translations[lang];

    // 1. Update Dropdown Text
    document.getElementById('currentLangText').innerText = t.langName;
    document.getElementById('langMenu').classList.remove('show');

    // 2. Update Static Text Elements
    document.getElementById('heroTitle').innerText = t.heroTitle;
    document.getElementById('heroSub').innerText = t.heroSub;
    
    document.getElementById('modePassText').innerText = t.modePass;
    document.getElementById('modeUrlText').innerText = t.modeUrl;
    
    document.getElementById('genBtnText').innerText = t.genBtn;
    
    // Stats
    document.getElementById('stat1').innerText = t.stat1Label;
    document.querySelector('.stat-item:nth-child(1) h2').innerText = t.stat1Title;
    document.getElementById('stat2').innerText = t.stat2Label;
    document.querySelector('.stat-item:nth-child(2) h2').innerText = t.stat2Title;
    document.getElementById('stat3').innerText = t.stat3Label;
    document.getElementById('stat4').innerText = t.stat4Label;

    // Info Section
    document.getElementById('infoTitle').innerText = t.infoTitle;
    document.getElementById('infoSub').innerText = t.infoSub;
    document.getElementById('viewAllBtn').innerText = t.viewAll;

    // Cards
    document.getElementById('card1Title').innerText = t.card1Title;
    document.getElementById('card1Desc').innerText = t.card1Desc;
    document.getElementById('link1').innerText = t.link1;

    document.getElementById('card2Title').innerText = t.card2Title;
    document.getElementById('link2').innerText = t.link2;

    document.getElementById('card3Title').innerText = t.card3Title;
    document.getElementById('card3Desc').innerText = t.card3Desc;
    document.getElementById('link3').innerText = t.link3;

    // Footer
    document.querySelector('.footer-container p').innerText = t.footerText;

    // 3. Update Input Placeholder & Re-run Audit
    setMode(currentMode);
    runAudit();
}

// --- TIMER ---
function resetPrivacyTimer() {
    clearTimeout(privacyTimer);
    if (mainInput.value !== "") {
        privacyTimer = setTimeout(() => {
            mainInput.value = "";
            runAudit();
            badge.innerText = "TIMEOUT"; 
            badge.className = "badge idle";
        }, 30000);
    }
}

// --- MODE SWITCHING ---
function setMode(mode) {
    currentMode = mode;
    const t = translations[currentLang];

    document.getElementById('passModeBtn').classList.toggle('active', mode === 'pass');
    document.getElementById('urlModeBtn').classList.toggle('active', mode === 'url');
    
    mainInput.placeholder = (mode === 'pass') ? t.placeholderPass : t.placeholderUrl;
    
    mainInput.value = "";
    resultsGrid.innerHTML = "";
    safeMessage.classList.add('hidden');
    generateBtn.classList.remove('hidden');
    
    badge.innerText = t.badgeIdle;
    badge.className = "badge idle";
}

// --- INPUT LISTENER ---
mainInput.addEventListener('input', () => {
    if (mainInput.value.length > 0) {
        generateBtn.classList.add('hidden');
    } else {
        if (currentMode === 'pass') generateBtn.classList.remove('hidden');
    }
    runAudit();
    resetPrivacyTimer();
});

// --- AUDIT LOGIC ---
function runAudit() {
    const val = mainInput.value;
    const t = translations[currentLang]; 
    resultsGrid.innerHTML = "";
    
    if (!val) {
        badge.innerText = t.badgeIdle;
        badge.className = "badge idle";
        safeMessage.classList.add('hidden');
        if (currentMode === 'pass') generateBtn.classList.remove('hidden');
        return;
    }

    let results = [];
    let riskLevel = 'safe';

    if (currentMode === 'pass') {
        if (val.length < 12) {
            results.push({ title: t.titleLength, msg: t.errLength, type: "danger" });
            riskLevel = 'danger';
        }
        if (!/[A-Z]/.test(val)) {
            results.push({ title: t.titleComplex, msg: t.errCaps, type: "warning" });
            if (riskLevel !== 'danger') riskLevel = 'warning';
        }
        if (!/[0-9]/.test(val)) {
            results.push({ title: t.titleNum, msg: t.errNum, type: "warning" });
        }
        if (!/[!@#$%^&*]/.test(val)) {
            results.push({ title: t.titleSym, msg: t.errSym, type: "warning" });
        }
    } else {
        if (!val.startsWith('https')) {
            results.push({ title: t.titleInsecure, msg: t.errHttps, type: "danger" });
            riskLevel = 'danger';
        }
        if (/\.xyz|\.top|\.live/.test(val)) {
            results.push({ title: t.titleSuspicious, msg: t.errDomain, type: "warning" });
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
        document.getElementById('statusSafeText').innerText = t.badgeSafe;
        document.getElementById('successMsgText').innerText = t.msgSecure;
    }

    if(riskLevel === 'safe') badge.innerText = t.badgeSafe;
    else if(riskLevel === 'warning') badge.innerText = t.badgeWarn;
    else badge.innerText = t.badgeDanger;

    badge.className = `badge ${riskLevel}`;
}

// --- GENERATOR ---
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