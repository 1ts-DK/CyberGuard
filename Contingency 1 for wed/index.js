let currentMode = 'pass'
function runAudit() {
    const inputElement = document.getElementById('input-field');
    const val = inputElement.value;
    const grid = document.getElementById('results-area');
    grid.innerHTML = ''
    if(val.length === 0) {
        return;
    }
    if(currentMode === 'pass') {
        auditPassword(val, grid);
    }
    else{
        auditURL(val, grid);
    }
}

//for the password logic

function auditPassword(val, grid){
    let riskLevel = 0;
    if(val.length < 8){
        createBox(grid, 'danger', 'Too Short', 'Minimum 8 Characters Needed');
        riskLevel = riskLevel + 2;
    }
        if(!/[A-Z]/.test(val)){
        createBox(grid, 'warning', 'Weakness', 'Add An Uppercase Letter')
        riskLevel = riskLevel + 1;
        }
    if(!/[0-9]/.test(val) && !/[!@#$%^&*]/.test(val)){
        createBox(grid, 'warning', 'Entropy', 'Add a Symbol or Number')
        riskLevel = riskLevel + 3;
    }
    if(/123|abc|password/i.test(val)){
        createBox(grid, 'wanger', 'Hackable', 'Do Not Use Common Patterns')
        riskLevel = riskLevel + 3;
    }
    updateStatusBadge(riskLevel);
}

//for the Website URL logic

function auditURL(val, grid){
    let riskLevel = 0;
    if(!val.startsWith('https://')){
        createBox(grid, 'danger', 'Not Secure', 'Missing HTTPS Encryption');
        riskLevel = riskLevel + 2;
    }
    //for supicious domains add the info that the research gets
    if(/\.xyz|\.top|\.zip/.test(val)){
        createBox(grid, 'danger', 'Very Suspicious', 'The domain ending is often used by badman')
        riskLevel = riskLevel + 2;
    }
    //for scum words add info that research gets
    if(/login|verify|bank|update/i.test(val)){
        createBox(grid, 'danger', 'Phishing', 'Unsafe, Do not trust this website')
        riskLevel = riskLevel + 2
    }
    updateStatusBadge(riskLevel);
}

//for the helping boxes that help the users

function createBox(grid,type, title, message){
    const box = document.createElement('div');
    box.className = `audit-box ${type}`;
    box.innerHTML = `<h3>${title}</h3><p>${message}</p>`;
    grid.appendChild(box)
}

function updateStatusBadge(risk){
    const badge = document.getElementById('main-badge');

    if(risk === 0){
        badge.innerText = "SECURE";
        badge.className = "status-badge safe";
    }
    else if(risk <3){
        badge.innerText = "CAUTION";
        badge.className = "status-badge warning";
    }
    else{
        badge.innerText = "DANGEROUS";
        badge.className = "status-badge danger";
    }
}

//for the buttons to work for now

function setMode(mode) {
    currentMode = mode; // Update our tracker
    
    // Update the UI texts
    const input = document.getElementById('input-field');
    const label = document.getElementById('card-label');
    const grid = document.getElementById('results-area');

    // Reset everything
    input.value = '';
    grid.innerHTML = '';
    
    // Simple If/Else to change text
    if(mode === 'pass') {
        label.innerText = "Security Integrity Scan";
        input.placeholder = "Enter password(eg.Students@2026)...";
        document.getElementById('btn-pass').className = 'mode-btn active';
        document.getElementById('btn-url').className = 'mode-btn';
    } else {
        label.innerText = "Phishing Threat Scan";
        input.placeholder = "Enter URL(eg. https//:www.dkishim.domain)...";
        document.getElementById('btn-pass').className = 'mode-btn';
        document.getElementById('btn-url').className = 'mode-btn active';
    }
}