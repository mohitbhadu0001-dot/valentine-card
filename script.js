const yesBtn = document.querySelector(".yes");
const noBtn = document.querySelector(".no");
const message = document.getElementById("message");
const heart = document.getElementById("heart");
const girl = document.getElementById("girl");
const sadMusic = document.getElementById("sadMusic");
const heartSound = document.getElementById("heartSound");
const arrowSound = document.getElementById("arrowSound");
const breakSound = document.getElementById("breakSound");
const card = document.getElementById("card");
const arrow = document.getElementById("arrow");
const arrowTrail = document.querySelector(".arrow-trail");
const piece1 = document.getElementById("piece1");
const piece2 = document.getElementById("piece2");
const piece3 = document.getElementById("piece3");

let noCount = 0;

// Emotional messages
const emotionalMessages = [
    "Please think again... 💭",
    "Some feelings are truly real ❤️",
    "I'm being completely serious now 🥺",
    "This hurts more than I expected... 💔",
    "My heart feels fragile right now... 😞",
    "Just one more moment to reconsider? 🙏"
];

// Shoot arrow animation
function shootArrowToHeart() {
    // Position arrow at top right
    arrow.style.right = "0px";
    arrow.style.top = "0px";
    arrow.style.opacity = "1";
    
    // Position trail
    arrowTrail.style.right = "25px";
    arrowTrail.style.top = "25px";
    
    // Play arrow sound
    if (arrowSound) {
        arrowSound.volume = 0.5;
        arrowSound.currentTime = 0;
        arrowSound.play();
    }
    
    // Start arrow animation
    arrow.classList.add("arrow-shoot");
    arrowTrail.classList.add("trail-follow");
    
    // Calculate heart position
    const heartRect = heart.getBoundingClientRect();
    const heartCenterX = heartRect.left + heartRect.width / 2;
    const heartCenterY = heartRect.top + heartRect.height / 2;
    
    // After arrow reaches heart, break it
    setTimeout(() => {
        // Arrow hits heart
        heart.classList.add("heart-hit");
        
        // Play breaking sound
        if (breakSound) {
            breakSound.volume = 0.6;
            breakSound.currentTime = 0;
            breakSound.play();
        }
        
        // Heart breaks into pieces
        setTimeout(() => {
            heart.classList.remove("heart-hit");
            heart.classList.add("heart-break");
            
            // Show broken heart pieces
            piece1.style.left = heartCenterX + "px";
            piece1.style.top = heartCenterY + "px";
            piece2.style.left = heartCenterX + "px";
            piece2.style.top = heartCenterY + "px";
            piece3.style.left = heartCenterX + "px";
            piece3.style.top = heartCenterY + "px";
            
            piece1.style.opacity = "1";
            piece2.style.opacity = "1";
            piece3.style.opacity = "1";
            
            piece1.classList.add("piece-fly-1");
            piece2.classList.add("piece-fly-2");
            piece3.classList.add("piece-fly-3");
            
            // Change heart to broken
            setTimeout(() => {
                heart.textContent = "💔";
                heart.classList.remove("heart-break");
                heart.style.animation = "none";
                heart.style.opacity = "0.7";
                heart.style.filter = "brightness(0.6) sepia(1)";
            }, 300);
        }, 300);
    }, 700);
    
    // Reset arrow after animation
    setTimeout(() => {
        arrow.classList.remove("arrow-shoot");
        arrowTrail.classList.remove("trail-follow");
        arrow.style.opacity = "0";
        arrowTrail.style.opacity = "0";
    }, 1000);
}

// Play heartbeat sound
function playHeartbeat() {
    if (heartSound) {
        heartSound.volume = 0.2;
        heartSound.currentTime = 0;
        heartSound.play().catch(e => console.log("Heart sound:", e));
    }
}

// YES button
yesBtn.addEventListener("click", () => {
    if (sadMusic) {
        sadMusic.pause();
        sadMusic.currentTime = 0;
    }
    
    message.innerHTML = "You just made my entire world brighter! 💖";
    
    // Reset heart if broken
    heart.textContent = "💖";
    heart.classList.remove("blink", "crack", "heart-break");
    heart.style.animation = "celebrateHeart 1s infinite";
    heart.style.opacity = "1";
    heart.style.filter = "none";
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes celebrateHeart {
            0% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.3) rotate(10deg); }
            50% { transform: scale(1.2) rotate(-10deg); }
            75% { transform: scale(1.4) rotate(5deg); }
            100% { transform: scale(1) rotate(0deg); }
        }
    `;
    document.head.appendChild(style);
    
    card.style.boxShadow = "0 0 60px rgba(255, 105, 180, 0.5)";
    
    yesBtn.disabled = true;
    noBtn.disabled = true;
    yesBtn.innerHTML = `<span class="btn-text">Thank you! You made me so happy! 💝</span>`;
    noBtn.style.opacity = "0.5";
    
    createCelebrationConfetti();
});

// NO button
noBtn.addEventListener("click", () => {
    if (noCount < 3) {
        playHeartbeat();
    }
    
    const noButtonTexts = [
        "NO! 🙈",
        "Are you sure? 😔",
        "Please reconsider... 🥺",
        "This hurts... 💔",
        "My heart... 😢",
        "Okay... 😭"
    ];
    
    if (noCount < noButtonTexts.length) {
        noBtn.innerHTML = `<span class="btn-text">${noButtonTexts[noCount]}</span>`;
    }
    
    if (noCount < emotionalMessages.length) {
        message.textContent = emotionalMessages[noCount];
        
        message.style.animation = 'none';
        setTimeout(() => {
            message.style.animation = 'messagePulse 0.5s';
        }, 10);
    }

    // Heart emotional states
    if (noCount === 0) {
        heart.classList.add("blink");
    }

    if (noCount === 2) {
        heart.classList.remove("blink");
        heart.textContent = "💔";
        heart.classList.add("crack");
        
        yesBtn.style.transform = "scale(1.1)";
        yesBtn.style.boxShadow = "0 15px 35px rgba(219, 39, 119, 0.5)";
    }

    // After 4 rejections - Arrow hits and breaks heart
    if (noCount === 4) {
        // Shoot arrow to break heart
        shootArrowToHeart();
        
        // Change message to dramatic text
        message.innerHTML = "Ouch! That arrow really hurt... 💘➡️💔";
        
        // Disable NO button
        noBtn.disabled = true;
        noBtn.style.opacity = "0.6";
        noBtn.style.cursor = "not-allowed";
        
        // Wait for arrow animation, then show image
        setTimeout(() => {
            card.classList.add("card-hide");

            setTimeout(() => {
                card.style.display = "none";
                
                girl.classList.add("girl-show");
                
                if (sadMusic) {
                    sadMusic.volume = 0.3;
                    sadMusic.play().catch(e => {
                        console.log("Autoplay prevented");
                        showMusicPlayButton();
                    });
                    
                    setTimeout(() => {
                        if (sadMusic.volume < 0.7) {
                            sadMusic.volume = 0.7;
                        }
                    }, 1000);
                }
            }, 1500);
        }, 2000); // Wait for arrow animation to complete
    }

    noCount++;
    
    noBtn.style.animation = 'none';
    setTimeout(() => {
        noBtn.style.animation = 'emotionalShake 0.5s ease';
    }, 10);
});

// Add animations
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes emotionalShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-6px); }
        50% { transform: translateX(6px); }
        75% { transform: translateX(-6px); }
    }
    
    @keyframes messagePulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(shakeStyle);

// Fallback for autoplay
function showMusicPlayButton() {
    const playButton = document.createElement('button');
    playButton.innerHTML = '🎵 Play Emotional Music';
    playButton.style.position = 'fixed';
    playButton.style.top = '20px';
    playButton.style.left = '50%';
    playButton.style.transform = 'translateX(-50%)';
    playButton.style.zIndex = '1000';
    playButton.style.padding = '12px 24px';
    playButton.style.background = 'linear-gradient(135deg, #ff4d6d, #db2777)';
    playButton.style.color = 'white';
    playButton.style.border = 'none';
    playButton.style.borderRadius = '50px';
    playButton.style.fontSize = '1rem';
    playButton.style.cursor = 'pointer';
    playButton.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
    
    playButton.addEventListener('click', () => {
        if (sadMusic) {
            sadMusic.play();
            playButton.remove();
        }
    });
    
    document.body.appendChild(playButton);
}

// Celebration confetti
function createCelebrationConfetti() {
    const colors = ['#ff6b8b', '#ffafcc', '#ffc8dd', '#ffddd2'];
    const emojis = ['💖', '💝', '💘', '✨', '🎉', '🥰'];
    
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            confetti.style.position = 'fixed';
            confetti.style.fontSize = Math.random() * 25 + 15 + 'px';
            confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-50px';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            confetti.style.opacity = '0.9';
            
            document.body.appendChild(confetti);
            
            const animation = confetti.animate([
                { 
                    transform: `translate(0, 0) rotate(0deg)`, 
                    opacity: 1 
                },
                { 
                    transform: `translate(${Math.random() * 100 - 50}px, ${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, 
                    opacity: 0 
                }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.1, 0.8, 0.9, 0.1)'
            });
            
            animation.onfinish = () => confetti.remove();
        }, i * 30);
    }
}

// Initialize
setTimeout(() => {
    playHeartbeat();
}, 500);