// Voice recognition demo on landing page
let recognition = null;
let isListening = false;
const sprite = document.querySelector('.sprite');
const commandLog = document.getElementById('commandLog');
const micButton = document.getElementById('micButton');

// Move sprite based on command
function moveSprite(command) {
    // Reset position
    sprite.classList.remove('move-up', 'move-down', 'move-left', 'move-right');
    
    switch(command) {
        case 'up':
            sprite.classList.add('move-up');
            break;
        case 'down':
            sprite.classList.add('move-down');
            break;
        case 'left':
            sprite.classList.add('move-left');
            break;
        case 'right':
            sprite.classList.add('move-right');
            break;
    }
    
    // Reset position after animation
    setTimeout(() => {
        sprite.classList.remove('move-up', 'move-down', 'move-left', 'move-right');
    }, 200);
}

// Initialize speech recognition
function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        commandLog.innerHTML = '<p>⚠️ Your browser doesn\'t support voice recognition. Try Chrome or Edge.</p>';
        return null;
    }
    
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event) => {
        const last = event.results.length - 1;
        const transcript = event.results[last][0].transcript.toLowerCase().trim();
        
        commandLog.innerHTML = `<p>🎤 You said: "${transcript}"</p>`;
        
        // Check for commands
        if (transcript.includes('up')) {
            moveSprite('up');
            commandLog.innerHTML += `<p>🤖 Sprite moves UP!</p>`;
        } else if (transcript.includes('down')) {
            moveSprite('down');
            commandLog.innerHTML += `<p>🤖 Sprite moves DOWN!</p>`;
        } else if (transcript.includes('left')) {
            moveSprite('left');
            commandLog.innerHTML += `<p>🤖 Sprite moves LEFT!</p>`;
        } else if (transcript.includes('right')) {
            moveSprite('right');
            commandLog.innerHTML += `<p>🤖 Sprite moves RIGHT!</p>`;
        } else if (transcript.includes('stop')) {
            commandLog.innerHTML += `<p>🛑 Stopped!</p>`;
        }
    };
    
    recognition.onerror = (event) => {
        commandLog.innerHTML = `<p>❌ Error: ${event.error}</p>`;
    };
    
    return recognition;
}

// Toggle listening
function toggleListening() {
    if (!recognition) {
        recognition = initSpeechRecognition();
        if (!recognition) return;
    }
    
    if (isListening) {
        recognition.stop();
        isListening = false;
        micButton.textContent = '🎤 Start Listening';
        micButton.classList.remove('listening');
        commandLog.innerHTML = '<p>⏹️ Stopped listening</p>';
    } else {
        recognition.start();
        isListening = true;
        micButton.textContent = '🔴 Listening...';
        micButton.classList.add('listening');
        commandLog.innerHTML = '<p>🎧 Listening for commands... Say "up", "down", "left", or "right"</p>';
    }
}

// Attach event listener when page loads
if (micButton) {
    micButton.addEventListener('click', toggleListening);
}

// TNG QR Code Modal
const modal = document.getElementById('tngQrModal');
const btn = document.getElementById('showTngBtn');
const span = document.getElementsByClassName('close')[0];

if (btn) {
    btn.onclick = function() {
        modal.style.display = 'block';
    }
}

if (span) {
    span.onclick = function() {
        modal.style.display = 'none';
    }
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});