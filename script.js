document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // LOADER ANIMATION
    // ======================
    const loader = document.querySelector('.loader');
    
    // Simulate loading time
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.style.overflow = 'auto';
            initializeCelebration(); // Start initial celebration
        }, 500);
    }, 3000);

    // ======================
    // CRICKET BALL CURSOR
    // ======================
    const ballCursor = document.createElement('div');
    const ballShadow = document.createElement('div');
    ballCursor.className = 'ball-cursor';
    ballShadow.className = 'ball-shadow';
    ballCursor.appendChild(ballShadow);
    document.body.appendChild(ballCursor);

    // Enable/disable cursor based on device
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            ballCursor.style.display = 'block';
            ballCursor.style.left = `${e.clientX}px`;
            ballCursor.style.top = `${e.clientY}px`;
            
            // Add slight rotation effect
            const rotation = (e.clientX / window.innerWidth) * 360;
            ballCursor.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
            
            // Shadow effect
            const shadowSize = 1 - (e.clientY / window.innerHeight * 0.5);
            ballShadow.style.transform = `translateX(-50%) scale(${shadowSize})`;
            ballShadow.style.opacity = shadowSize;
        });

        // Hide cursor when not moving
        let cursorTimeout;
        document.addEventListener('mousemove', () => {
            clearTimeout(cursorTimeout);
            ballCursor.style.opacity = '1';
            cursorTimeout = setTimeout(() => {
                ballCursor.style.opacity = '0';
            }, 1000);
        });

        // Interactive elements effect
        const interactiveElements = document.querySelectorAll('a, button, .shot, .gallery-item, .player-card, .sports-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                ballCursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                ballCursor.style.background = 'linear-gradient(135deg, var(--accent-color) 50%, #333 50%)';
            });
            el.addEventListener('mouseleave', () => {
                ballCursor.style.transform = 'translate(-50%, -50%) scale(1)';
                ballCursor.style.background = 'linear-gradient(135deg, var(--secondary-color) 50%, #333 50%)';
            });
        });
    } else {
        ballCursor.style.display = 'none';
    }

    // ======================
    // INITIAL CELEBRATION
    // ======================
    function initializeCelebration() {
        // Create confetti effect
        createConfetti(100);
        
        // Play stadium cheer sound
        playSound('stadium-cheer');
        
        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero h1, .hero-subtitle, .typing-text, .cricket-stats, .shot-selection');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate-in');
            }, index * 200);
        });
    }

    // ======================
    // TYPING ANIMATION
    // ======================
    const typingText = document.querySelector('.typing-text');
    const kohliQuotes = [
        "I like to be myself, and I don't pretend. For instance, I don't dress up for occasions; I am what I am.",
        "Self-belief and hard work will always earn you success.",
        "I love playing under pressure. In fact, if there's no pressure, then I'm not in the perfect zone.",
        "I hate losing and cricket is my life, so every time I step on the cricket field it's about doing something for my team.",
        "I always dreamt of holding the bat and winning games for India."
    ];
    
    let quoteIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function typeWriter() {
        const currentQuote = kohliQuotes[quoteIndex];
        
        if (isDeleting) {
            typingText.textContent = currentQuote.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentQuote.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentQuote.length) {
            isEnd = true;
            isDeleting = true;
            setTimeout(typeWriter, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            quoteIndex++;
            if (quoteIndex >= kohliQuotes.length) quoteIndex = 0;
            setTimeout(typeWriter, 500);
        } else {
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeWriter, speed);
        }
    }

    // Start typing effect after loader
    setTimeout(typeWriter, 3500);

    // ======================
    // CRICKET SHOT SELECTION
    // ======================
    const shotButtons = document.querySelectorAll('.shot-selection button');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const previewContent = document.querySelector('.preview-content');
    const shotStats = {
        'cover-drive': { name: "Cover Drive", description: "Virat's signature shot, elegant and powerful through the covers.", runs: 1560, boundaries: 320, successRate: '92%' },
        'pull-shot': { name: "Pull Shot", description: "Dominant against short balls, sending them into the stands with authority.", runs: 980, boundaries: 210, successRate: '88%' },
        'flick': { name: "Wristy Flick", description: "A delicate yet powerful flick off the pads, often to the boundary.", runs: 1240, boundaries: 180, successRate: '95%' },
        'straight-drive': { name: "Straight Drive", description: "Pure class and timing, straight down the ground.", runs: 870, boundaries: 150, successRate: '90%' }
    };

    shotButtons.forEach(button => {
        button.addEventListener('click', function() {
            const shotType = this.getAttribute('data-shot');
            const shotData = shotStats[shotType];
            
            // Update preview content
            previewContent.innerHTML = `
                <div class="shot-name">${shotData.name}</div>
                <div class="shot-description">${shotData.description}</div>
                <div class="shot-stats">
                    <div class="shot-stat">
                        <span>Career Runs</span>
                        <span>${shotData.runs}</span>
                    </div>
                    <div class="shot-stat">
                        <span>Boundaries</span>
                        <span>${shotData.boundaries}</span>
                    </div>
                    <div class="shot-stat">
                        <span>Success Rate</span>
                        <span>${shotData.successRate}</span>
                    </div>
                </div>
            `;
            
            // Highlight selected shot button
            shotButtons.forEach(btn => btn.style.backgroundColor = 'var(--primary-color)');
            this.style.backgroundColor = 'var(--accent-color)';
            
            // Play shot sound
            playSound('bat-hit');
            
            // Animate shot
            animateShot(shotType);
        });
    });

    // Gallery item click handler
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const shotType = this.getAttribute('data-shot');
            const shotData = shotStats[shotType];
            
            previewContent.innerHTML = `
                <div class="shot-name">${shotData.name}</div>
                <div class="shot-description">${shotData.description}</div>
                <div class="shot-stats">
                    <div class="shot-stat">
                        <span>Career Runs</span>
                        <span>${shotData.runs}</span>
                    </div>
                    <div class="shot-stat">
                        <span>Boundaries</span>
                        <span>${shotData.boundaries}</span>
                    </div>
                    <div class="shot-stat">
                        <span>Success Rate</span>
                        <span>${shotData.successRate}</span>
                    </div>
                </div>
            `;
            
            // Play shot sound
            playSound('bat-hit');
            
            // Animate shot
            animateShot(shotType);
        });
    });

    // ======================
    // SHOT ANIMATION
    // ======================
    function animateShot(shotType) {
        const animationContainer = document.querySelector('.shot-animation');
        animationContainer.innerHTML = '';
        
        // Create cricket ball
        const ball = document.createElement('div');
        ball.className = 'cricket-ball';
        animationContainer.appendChild(ball);
        
        // Different animations based on shot type
        let animation;
        switch(shotType) {
            case 'cover-drive':
                animation = [
                    { transform: 'translateX(0) translateY(0) rotate(0deg)', opacity: 0 },
                    { transform: 'translateX(-20px) translateY(-40px) rotate(90deg)', opacity: 1, offset: 0.2 },
                    { transform: 'translateX(80px) translateY(-80px) rotate(180deg)', offset: 0.4 },
                    { transform: 'translateX(200px) translateY(-120px) rotate(360deg)', opacity: 0, offset: 0.6 }
                ];
                break;
            case 'pull-shot':
                animation = [
                    { transform: 'translateX(0) translateY(0) rotate(0deg)', opacity: 0 },
                    { transform: 'translateX(20px) translateY(-80px) rotate(-90deg)', opacity: 1, offset: 0.2 },
                    { transform: 'translateX(-40px) translateY(-150px) rotate(-180deg)', offset: 0.4 },
                    { transform: 'translateX(-200px) translateY(-200px) rotate(-360deg)', opacity: 0, offset: 0.6 }
                ];
                break;
            case 'flick':
                animation = [
                    { transform: 'translateX(0) translateY(0) rotate(0deg)', opacity: 0 },
                    { transform: 'translateX(10px) translateY(-30px) rotate(45deg)', opacity: 1, offset: 0.2 },
                    { transform: 'translateX(30px) translateY(-60px) rotate(90deg)', offset: 0.5 },
                    { transform: 'translateX(100px) translateY(-100px) rotate(135deg)', opacity: 0, offset: 0.8 }
                ];
                break;
            case 'straight-drive':
                animation = [
                    { transform: 'translateX(0) translateY(0) rotate(0deg)', opacity: 0 },
                    { transform: 'translateX(0) translateY(-50px) rotate(0deg)', opacity: 1, offset: 0.2 },
                    { transform: 'translateX(0) translateY(-150px) rotate(0deg)', opacity: 0, offset: 0.6 }
                ];
                break;
        }
        
        const timing = {
            duration: 1000,
            iterations: 1,
            easing: 'cubic-bezier(0.42, 0, 0.58, 1)'
        };
        
        ball.animate(animation, timing);
        
        // Create bat swing effect
        const bat = document.createElement('div');
        bat.className = 'bat-swing';
        animationContainer.appendChild(bat);
        
        const batAnimation = [
            { transform: 'rotate(-90deg) scaleX(0)', opacity: 0 },
            { transform: 'rotate(-45deg) scaleX(1)', opacity: 1, offset: 0.2 },
            { transform: 'rotate(45deg) scaleX(1)', offset: 0.4 },
            { transform: 'rotate(90deg) scaleX(0)', opacity: 0, offset: 0.6 }
        ];
        
        bat.animate(batAnimation, timing);
    }

    // ======================
    // QUOTE CAROUSEL
    // ======================
    const quotes = document.querySelectorAll('.quote');
    const quoteNavButtons = document.querySelectorAll('.quote-nav button');
    let currentQuoteIndex = 0;

    function showQuote(index) {
        quotes.forEach(quote => quote.classList.remove('active'));
        quotes[index].classList.add('active');
        currentQuoteIndex = index;
    }

    quoteNavButtons.forEach(button => {
        button.addEventListener('click', function() {
            const direction = this.getAttribute('data-direction');
            
            if (direction === 'prev') {
                currentQuoteIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
            } else {
                currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            }
            
            showQuote(currentQuoteIndex);
            playSound('page-turn');
        });
    });

    // Auto-rotate quotes
    setInterval(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        showQuote(currentQuoteIndex);
    }, 8000);

    // ======================
    // SKILL METER ANIMATION
    // ======================
    const skillMeters = document.querySelectorAll('.skill-level');
    
    function animateSkillMeters() {
        skillMeters.forEach(meter => {
            const targetWidth = meter.getAttribute('data-level');
            meter.style.width = targetWidth;
        });
    }

    // Animate when skills section is in view
    const skillsSection = document.querySelector('.skills-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillMeters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillsSection);

    // ======================
    // EDUCATION SECTION TOGGLE
    // ======================
    document.querySelectorAll('.btn-show-more').forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            content.classList.toggle('hidden');
            
            if (content.classList.contains('hidden')) {
                this.textContent = 'Show ' + (content.classList.contains('achievements') ? 'Achievements' : 'Learnings');
            } else {
                this.textContent = 'Hide ' + (content.classList.contains('achievements') ? 'Achievements' : 'Learnings');
            }
            
            // Play sound
            playSound('click');
        });
    });

    // ======================
    // COURSE BUBBLES INTERACTION
    // ======================
    const courseBubbles = document.querySelectorAll('.bubble');
    const courseDetails = document.getElementById('course-details');

    const courseInfo = {
        'CSO': 'Computer System and Organization - Covered basic programming concepts and computer organization',
        'DSA': 'Data Structures and Algorithms - Mastered arrays, linked lists, trees, graphs, and sorting algorithms',
        'ISS': 'Information System Software - Learned about system software and web development fundamentals',
        'CPRO': 'C Programming - Developed strong foundation in C programming language'
    };

    courseBubbles.forEach(bubble => {
        bubble.addEventListener('click', function() {
            const course = this.getAttribute('data-course');
            courseDetails.innerHTML = `<h4>${course}</h4><p>${courseInfo[course]}</p>`;
            courseDetails.classList.remove('hidden');
            
            // Highlight selected bubble
            courseBubbles.forEach(b => b.style.backgroundColor = 'var(--primary-color)');
            this.style.backgroundColor = 'var(--secondary-color)';
            this.style.color = 'var(--dark-color)';
            
            // Play sound
            playSound('click');
        });
    });

    // ======================
    // IMAGE ZOOM EFFECT
    // ======================
    document.querySelectorAll('.school-photo, .coaching-photo, .food-image img, .ps-image img, .sports-image img').forEach(img => {
        img.addEventListener('click', function() {
            this.classList.toggle('zoomed');
            document.body.style.overflow = this.classList.contains('zoomed') ? 'hidden' : 'auto';
            
            if (this.classList.contains('zoomed')) {
                // Create overlay
                const overlay = document.createElement('div');
                overlay.className = 'image-overlay';
                overlay.addEventListener('click', () => {
                    img.classList.remove('zoomed');
                    document.body.style.overflow = 'auto';
                    overlay.remove();
                });
                document.body.appendChild(overlay);
            } else {
                document.querySelector('.image-overlay').remove();
            }
        });
    });

    // ======================
    // FORM VALIDATION
    // ======================
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        if (name && email && message) {
            // Show success message
            showModal('Message Sent!', 'Your message has been delivered successfully. Virat would be proud!');
            
            // Play celebration
            createConfetti(200);
            playSound('stadium-cheer');
            
            // Reset form
            this.reset();
        } else {
            showModal('Incomplete Form', 'Please fill in all fields before sending.');
        }
    });

    // ======================
    // THEME TOGGLE
    // ======================
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Play sound
        playSound('click');
    });

    // ======================
    // STADIUM AUDIO
    // ======================
    const audioControl = document.querySelector('.audio-control');
    const stadiumAudio = new Audio('https://www.soundjay.com/misc/sounds/crowd-cheer-01.mp3');
    stadiumAudio.loop = true;
    let isAudioPlaying = false;
    
    audioControl.addEventListener('click', function() {
        if (isAudioPlaying) {
            stadiumAudio.pause();
            this.innerHTML = '<i class="fas fa-volume-mute"></i> Stadium Sound';
        } else {
            stadiumAudio.play();
            this.innerHTML = '<i class="fas fa-volume-up"></i> Stadium Sound';
        }
        isAudioPlaying = !isAudioPlaying;
    });

    // ======================
    // SCROLL ANIMATIONS
    // ======================
    const scrollElements = document.querySelectorAll('.animate-in');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('animate-in');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Initialize
    handleScrollAnimation();

    // ======================
    // BOUNDARY ROPE NAVIGATION
    // ======================
    const navLinks = document.querySelectorAll('.boundary-rope-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Play sound
                playSound('click');
            }
        });
    });

    // ======================
    // CELEBRATION MODAL
    // ======================
    function showModal(title, message) {
        const modal = document.querySelector('.celebration-modal');
        const modalTitle = modal.querySelector('h2');
        const modalMessage = modal.querySelector('p');
        
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Create confetti
        createConfetti(150);
        
        // Play sound
        playSound('stadium-cheer');
    }
    
    // Close modal
    document.querySelector('.modal-close').addEventListener('click', function() {
        document.querySelector('.celebration-modal').classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Replay button
    document.querySelector('.btn-replay').addEventListener('click', function() {
        createConfetti(150);
        playSound('stadium-cheer');
    });

    // Show modal on first visit
    let firstVisit = localStorage.getItem('firstVisit');
    if (!firstVisit) {
        setTimeout(() => {
            showModal('Welcome!', 'Thanks for visiting my Virat Kohli tribute and portfolio website!');
            localStorage.setItem('firstVisit', 'true');
        }, 2000);
    }

    // ======================
    // CRICKET GAME
    // ======================
    const cricketGameBtn = document.querySelector('.cricket-game-btn');
    
    cricketGameBtn.addEventListener('click', function() {
        startCricketGame();
    });
    
    function startCricketGame() {
        showModal('Quick Cricket Match', 'Try to hit 6 runs like Virat! Click the ball when it reaches the bat to score runs. You have 6 balls to play!');
        
        const gameContainer = document.querySelector('.celebration-animation');
        gameContainer.innerHTML = '';
        
        const gameArea = document.createElement('div');
        gameArea.style.width = '100%';
        gameArea.style.height = '200px';
        gameArea.style.position = 'relative';
        gameArea.style.overflow = 'hidden';
        gameArea.style.marginBottom = '20px';
        gameArea.style.backgroundColor = 'rgba(0,0,0,0.2)';
        gameArea.style.borderRadius = '10px';
        
        const pitch = document.createElement('div');
        pitch.style.position = 'absolute';
        pitch.style.width = '80%';
        pitch.style.height = '2px';
        pitch.style.backgroundColor = 'var(--crease-white)';
        pitch.style.left = '10%';
        pitch.style.top = '50%';
        pitch.style.opacity = '0.3';
        
        const bat = document.createElement('div');
        bat.style.width = '80px';
        bat.style.height = '10px';
        bat.style.backgroundColor = '#8B4513';
        bat.style.position = 'absolute';
        bat.style.bottom = '50px';
        bat.style.left = 'calc(50% - 40px)';
        bat.style.borderRadius = '5px';
        bat.style.zIndex = '2';
        bat.style.transform = 'rotate(0deg)';
        
        const ball = document.createElement('div');
        ball.style.width = '20px';
        ball.style.height = '20px';
        ball.style.background = 'linear-gradient(135deg, var(--secondary-color) 50%, #333 50%)';
        ball.style.borderRadius = '50%';
        ball.style.position = 'absolute';
        ball.style.bottom = '60px';
        ball.style.left = 'calc(50% - 10px)';
        ball.style.zIndex = '1';
        ball.style.transform = 'translateX(-200px)';
        
        const scoreDisplay = document.createElement('div');
        scoreDisplay.style.textAlign = 'center';
        scoreDisplay.style.marginBottom = '15px';
        scoreDisplay.style.fontSize = '1.2rem';
        scoreDisplay.innerHTML = 'Score: <span id="game-score">0</span> | Balls: <span id="game-balls">0</span>/6 | Last shot: <span id="last-shot">-</span>';
        
        gameArea.appendChild(pitch);
        gameArea.appendChild(bat);
        gameArea.appendChild(ball);
        gameContainer.appendChild(scoreDisplay);
        gameContainer.appendChild(gameArea);
        
        let score = 0;
        let balls = 0;
        let isPlaying = true;
        let lastShot = '-';
        
        function animateBall() {
            if (!isPlaying) return;
            
            balls++;
            document.getElementById('game-balls').textContent = balls;
            
            // Random ball speed (800-1200ms)
            const speed = Math.random() * 400 + 800;
            
            // Random ball height (50-150px)
            const height = Math.random() * 100 + 50;
            
            const animation = ball.animate([
                { transform: 'translateX(-200px) translateY(0)' },
                { transform: 'translateX(0) translateY(-' + height + 'px)' }
            ], {
                duration: speed,
                easing: 'linear'
            });
            
            animation.onfinish = () => {
                if (isPlaying) {
                    // Missed the ball
                    lastShot = 'Missed';
                    document.getElementById('last-shot').textContent = lastShot;
                    
                    if (balls < 6) {
                        setTimeout(animateBall, 500);
                    } else {
                        endGame();
                    }
                }
            };
        }
        
        function endGame() {
            isPlaying = false;
            let message;
            
            if (score >= 30) {
                message = `Century! Your final score: ${score} runs from 6 balls! Virat would be proud!`;
            } else if (score >= 20) {
                message = `Great batting! Your final score: ${score} runs from 6 balls!`;
            } else if (score >= 10) {
                message = `Good effort! Your final score: ${score} runs from 6 balls. Keep practicing!`;
            } else {
                message = `Your final score: ${score} runs from 6 balls. Better luck next time!`;
            }
            
            setTimeout(() => {
                showModal('Game Over!', message);
            }, 1000);
        }
        
        gameArea.addEventListener('click', function(e) {
            if (!isPlaying) return;
            
            const clickX = e.clientX - gameArea.getBoundingClientRect().left;
            const ballX = ball.getBoundingClientRect().left - gameArea.getBoundingClientRect().left + 10;
            const ballY = ball.getBoundingClientRect().top - gameArea.getBoundingClientRect().top + 10;
            
            // Check if click is near the ball
            if (Math.abs(clickX - ballX) < 30) {
                // Hit the ball - calculate runs based on timing
                const timingAccuracy = 1 - Math.abs(ballX - (gameArea.offsetWidth / 2)) / (gameArea.offsetWidth / 2);
                let runs;
                
                if (timingAccuracy > 0.9) {
                    runs = 6;
                    lastShot = 'Six! 🚀';
                } else if (timingAccuracy > 0.7) {
                    runs = 4;
                    lastShot = 'Four! 🏏';
                } else if (timingAccuracy > 0.5) {
                    runs = 2;
                    lastShot = 'Two runs';
                } else {
                    runs = 1;
                    lastShot = 'Single';
                }
                
                score += runs;
                document.getElementById('game-score').textContent = score;
                document.getElementById('last-shot').textContent = lastShot;
                
                // Animate hit
                ball.animate([
                    { transform: `translateX(0) translateY(${-ballY}px)` },
                    { transform: `translateX(${Math.random() > 0.5 ? 200 : -200}px) translateY(-150px)` }
                ], {
                    duration: 800,
                    easing: 'ease-out'
                });
                
                // Animate bat swing
                bat.animate([
                    { transform: 'rotate(0deg)' },
                    { transform: 'rotate(60deg)' },
                    { transform: 'rotate(0deg)' }
                ], {
                    duration: 300,
                    easing: 'ease-in-out'
                });
                
                playSound('bat-hit');
                
                setTimeout(() => {
                    ball.style.transform = 'translateX(-200px)';
                    if (isPlaying && balls < 6) {
                        setTimeout(animateBall, 500);
                    } else if (balls >= 6) {
                        endGame();
                    }
                }, 800);
            }
        });
        
        // Start game
        animateBall();
    }

    // ======================
    // STATS TICKER
    // ======================
    const stats = [
        { label: "International Centuries", value: 82, icon: "fa-trophy" },
        { label: "ODI Runs", value: 14181, icon: "fa-running" },
        { label: "Test Runs", value: 9230, icon: "fa-book" },
        { label: "T20I Runs", value: 4008, icon: "fa-bolt" },
        { label: "IPL Runs", value: 7263, icon: "fa-star" }
    ];
    
    const statsTicker = document.querySelector('.stats-ticker');
    let currentStatIndex = 0;
    
    function updateStatsTicker() {
        const stat = stats[currentStatIndex];
        statsTicker.innerHTML = `
            <i class="fas ${stat.icon}" style="margin-right: 8px;"></i>
            <span style="font-weight: bold;">${stat.label}:</span> ${stat.value.toLocaleString()}
        `;
        statsTicker.style.display = 'block';
        
        currentStatIndex = (currentStatIndex + 1) % stats.length;
    }
    
    // Update every 5 seconds
    updateStatsTicker();
    setInterval(updateStatsTicker, 5000);
    
    // Hide after 4 seconds
    setInterval(() => {
        statsTicker.style.display = 'none';
    }, 4000);

    // ======================
    // UTILITY FUNCTIONS
    // ======================
    function createConfetti(count) {
        const colors = ['var(--secondary-color)', 'var(--accent-color)', 'var(--primary-color)', '#ffffff'];
        
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = `${Math.random() * 10 + 5}px`;
            confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            
            document.querySelector('.celebration-animation').appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
    
    function playSound(type) {
        if (typeof Audio !== 'undefined') {
            let sound;
            
            switch(type) {
                case 'bat-hit':
                    sound = new Audio('https://www.soundjay.com/misc/sounds/bat-hit-1.mp3');
                    break;
                case 'stadium-cheer':
                    sound = new Audio('https://www.soundjay.com/misc/sounds/crowd-cheer-01.mp3');
                    break;
                case 'click':
                    sound = new Audio('https://www.soundjay.com/buttons/sounds/button-09.mp3');
                    break;
                case 'page-turn':
                    sound = new Audio('https://www.soundjay.com/mechanical/sounds/page-turn-01.mp3');
                    break;
                default:
                    sound = new Audio('https://www.soundjay.com/buttons/sounds/button-09.mp3');
            }
            
            sound.volume = 0.3;
            sound.play().catch(e => console.log('Audio play failed:', e));
        }
    }

    // ======================
    // EASTER EGG - SECRET SHOT
    // ======================
    const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let inputSequence = [];
    
    document.addEventListener('keydown', (e) => {
        inputSequence.push(e.key);
        if (inputSequence.length > secretCode.length) {
            inputSequence.shift();
        }
        
        if (JSON.stringify(inputSequence) === JSON.stringify(secretCode)) {
            // Unlock secret Virat celebration
            showModal('Secret Unlocked!', 'You discovered Virat Kohli\'s signature celebration!');
            playSound('stadium-cheer');
            createConfetti(500);
            
            // Add special animation
            const hero = document.querySelector('.hero');
            const celebration = document.createElement('div');
            celebration.className = 'kohli-celebration-animation';
            hero.appendChild(celebration);
            
            setTimeout(() => {
                celebration.remove();
            }, 3000);
            
            // Reset sequence
            inputSequence = [];
        }
    });

    // ======================
    // FLOATING BALL ANIMATION
    // ======================
    const floatingBall = document.createElement('div');
    floatingBall.className = 'floating-ball';
    document.querySelector('.skills-section').appendChild(floatingBall);
    
    function animateFloatingBall() {
        let pos = 0;
        let direction = 1;
        const speed = 0.5;
        const limit = 50;
        
        function move() {
            pos += direction * speed;
            
            if (pos > limit || pos < 0) {
                direction *= -1;
            }
            
            floatingBall.style.transform = `translateY(${pos}px)`;
            requestAnimationFrame(move);
        }
        
        move();
    }
    
    animateFloatingBall();
});


// q2

// Q2: Click and View Event Tracker
document.addEventListener('DOMContentLoaded', function() {
    // Track page views
    trackPageView();
    
    // Track all click events
    document.addEventListener('click', trackClickEvent);
    
    // Track visibility changes for sections
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackViewEvent(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
});

function trackPageView() {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}, view, page`);
}

function trackClickEvent(event) {
    const timestamp = new Date().toISOString();
    let elementType = event.target.tagName.toLowerCase();
    
    // Get more specific element type if available
    if (event.target.classList.length > 0) {
        elementType = `${elementType}.${Array.from(event.target.classList).join('.')}`;
    } else if (event.target.id) {
        elementType = `${elementType}#${event.target.id}`;
    }
    
    console.log(`${timestamp}, click, ${elementType}`);
}

function trackViewEvent(element) {
    const timestamp = new Date().toISOString();
    let elementType = element.tagName.toLowerCase();
    
    if (element.id) {
        elementType = `${elementType}#${element.id}`;
    }
    
    console.log(`${timestamp}, view, ${elementType}`);
}

//q3
// Q3: Text Analysis Tool
document.addEventListener('DOMContentLoaded', function() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', analyzeText);
    }
});

function analyzeText() {
    const text = document.getElementById('textInput').value.trim();
    
    if (!text) {
        alert('Please enter some text to analyze.');
        return;
    }
    
    // Basic statistics
    const letters = text.replace(/[^a-zA-Z]/g, '').length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const spaces = text.split(' ').length - 1;
    const newlines = (text.match(/\n/g) || []).length;
    const specialSymbols = text.replace(/[a-zA-Z0-9\s]/g, '').length;
    
    // Display basic stats
    document.getElementById('basicStats').innerHTML = `
        <div class="stat-item"><span>Letters:</span> <span>${letters}</span></div>
        <div class="stat-item"><span>Words:</span> <span>${words}</span></div>
        <div class="stat-item"><span>Spaces:</span> <span>${spaces}</span></div>
        <div class="stat-item"><span>Newlines:</span> <span>${newlines}</span></div>
        <div class="stat-item"><span>Special Symbols:</span> <span>${specialSymbols}</span></div>
    `;
    
    // Pronouns analysis
    const pronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
                     'my', 'your', 'his', 'its', 'our', 'their', 'mine', 'yours', 'hers', 'ours', 'theirs',
                     'myself', 'yourself', 'himself', 'herself', 'itself', 'ourselves', 'yourselves', 'themselves',
                     'this', 'that', 'these', 'those', 'who', 'whom', 'whose', 'which', 'what'];
    
    const pronounCounts = {};
    pronouns.forEach(pronoun => {
        const regex = new RegExp(`\\b${pronoun}\\b`, 'gi');
        const matches = text.match(regex);
        pronounCounts[pronoun] = matches ? matches.length : 0;
    });
    
    // Filter pronouns that actually appear in the text
    const presentPronouns = Object.entries(pronounCounts)
        .filter(([_, count]) => count > 0)
        .sort((a, b) => b[1] - a[1]);
    
    let pronounsHTML = '';
    presentPronouns.forEach(([pronoun, count]) => {
        pronounsHTML += `<div class="stat-item"><span>${pronoun}:</span> <span>${count}</span></div>`;
    });
    
    document.getElementById('pronounsStats').innerHTML = pronounsHTML || '<p>No pronouns found.</p>';
    
    // Prepositions analysis
    const prepositions = ['about', 'above', 'across', 'after', 'against', 'along', 'among', 'around', 'as', 'at',
                         'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'by', 'concerning',
                         'despite', 'down', 'during', 'except', 'for', 'from', 'in', 'inside', 'into', 'like',
                         'near', 'of', 'off', 'on', 'onto', 'out', 'outside', 'over', 'past', 'regarding',
                         'since', 'through', 'throughout', 'to', 'toward', 'under', 'underneath', 'until', 'unto',
                         'up', 'upon', 'with', 'within', 'without'];
    
    const prepositionCounts = {};
    prepositions.forEach(preposition => {
        const regex = new RegExp(`\\b${preposition}\\b`, 'gi');
        const matches = text.match(regex);
        prepositionCounts[preposition] = matches ? matches.length : 0;
    });
    
    // Filter prepositions that actually appear in the text
    const presentPrepositions = Object.entries(prepositionCounts)
        .filter(([_, count]) => count > 0)
        .sort((a, b) => b[1] - a[1]);
    
    let prepositionsHTML = '';
    presentPrepositions.forEach(([preposition, count]) => {
        prepositionsHTML += `<div class="stat-item"><span>${preposition}:</span> <span>${count}</span></div>`;
    });
    
    document.getElementById('prepositionsStats').innerHTML = prepositionsHTML || '<p>No prepositions found.</p>';
    
    // Articles analysis
    const articles = ['a', 'an', 'the'];
    const articleCounts = {};
    
    articles.forEach(article => {
        const regex = new RegExp(`\\b${article}\\b`, 'gi');
        const matches = text.match(regex);
        articleCounts[article] = matches ? matches.length : 0;
    });
    
    let articlesHTML = '';
    Object.entries(articleCounts).forEach(([article, count]) => {
        articlesHTML += `<div class="stat-item"><span>${article}:</span> <span>${count}</span></div>`;
    });
    
    document.getElementById('articlesStats').innerHTML = articlesHTML || '<p>No articles found.</p>';
}

