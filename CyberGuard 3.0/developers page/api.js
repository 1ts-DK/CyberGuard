lucide.createIcons();

// --- SHARED AUTH LOGIC ---
        function checkGlobalAuth() {
            const storedUser = localStorage.getItem('cyberGuardUser');
            const signInBtn = document.getElementById('signInBtn');
            const userProfile = document.getElementById('userProfile');

            if (storedUser) {
                const user = JSON.parse(storedUser);
                if(signInBtn) signInBtn.classList.add('hidden');
                if(userProfile) userProfile.classList.remove('hidden');
                
                const els = {
                    'navUserName': user.name, 'menuUserName': user.name,
                    'menuUserEmail': user.email, 'menuUserTier': (user.tier || 'Standard').toUpperCase()
                };
                for (const [id, val] of Object.entries(els)) {
                    if(document.getElementById(id)) document.getElementById(id).textContent = val;
                }
                const upgradeBtn = document.getElementById('upgradeBtn');
                if (upgradeBtn && user.tier === 'Elite Guard') upgradeBtn.style.display = 'none';
            } else {
                if(signInBtn) signInBtn.classList.remove('hidden');
                if(userProfile) userProfile.classList.add('hidden');
            }
        }
        function logout() { localStorage.removeItem('cyberGuardUser'); window.location.href='/main page/index.htm'; }
        const profileBtn = document.getElementById('profileBtn');
        if (profileBtn) profileBtn.addEventListener('click', (e) => { e.stopPropagation(); document.getElementById('profileMenu').classList.toggle('show'); });
        window.addEventListener('click', () => { if(document.getElementById('profileMenu')) document.getElementById('profileMenu').classList.remove('show'); });
        checkGlobalAuth();

        // 1. THEME LOGIC (Matches Index.js)
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            themeIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
            lucide.createIcons();
        });

        // 2. SCROLLSPY (Highlighter for Sidebar)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.api-nav-link').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${entry.target.id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.3 });
        document.querySelectorAll('section').forEach(section => observer.observe(section));

        // 3. COPY TO CLIPBOARD BUTTONS
        document.querySelectorAll('.code-wrapper pre').forEach((block) => {
            const btn = document.createElement('button');
            btn.className = 'copy-btn';
            btn.innerHTML = '<i data-lucide="copy" style="width:14px;"></i>';
            block.parentNode.appendChild(btn);

            btn.addEventListener('click', () => {
                navigator.clipboard.writeText(block.innerText);
                btn.innerHTML = '<i data-lucide="check" style="width:14px;"></i>';
                lucide.createIcons();
                setTimeout(() => {
                    btn.innerHTML = '<i data-lucide="copy" style="width:14px;"></i>';
                    lucide.createIcons();
                }, 2000);
            });
        });

        // 4. INTERACTIVE CONSOLE LOGIC
        function toggleConsole(id) {
            document.getElementById(id).classList.toggle('open');
        }

        function runUrlSimulation() {
            const output = document.getElementById('try-url-output');
            const url = document.getElementById('try-url-input').value;
            output.innerText = "Scanning...";
            setTimeout(() => {
                output.innerText = JSON.stringify({
                    "status": "success",
                    "url": url,
                    "risk": "low",
                    "safe": true
                }, null, 2);
            }, 800);
        }

        function runPassSimulation() {
            const output = document.getElementById('try-pass-output');
            const pass = document.getElementById('try-pass-input').value;
            output.innerText = "Calculating...";
            setTimeout(() => {
                output.innerText = JSON.stringify({
                    "entropy": 75,
                    "crack_time": "3 years",
                    "status": "Strong"
                }, null, 2);
            }, 600);
        }

        // 5. CURRENCY TOGGLE
        const currToggle = document.getElementById('currencyToggle');
        currToggle.addEventListener('change', (e) => {
            const isUsd = e.target.checked;
            const priceEl = document.querySelector('.price-val');
            const label = document.getElementById('curr-label');
            if(isUsd) {
                priceEl.innerText = `$${priceEl.dataset.usd}/mo`;
                label.innerText = "Show KSH";
            } else {
                priceEl.innerText = `KSH ${priceEl.dataset.ksh}/mo`;
                label.innerText = "Show USD";
            }
        });

        // 6. SEARCH BAR (Ctrl+K)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                document.getElementById('searchInput').focus();
            }
        });
        document.getElementById('searchInput').addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            document.querySelectorAll('.api-nav-link').forEach(link => {
                link.style.display = link.textContent.toLowerCase().includes(term) ? 'block' : 'none';
            });
        });

        // Init icons
        lucide.createIcons();


