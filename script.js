document.addEventListener("DOMContentLoaded", function () {
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    let lastDays, lastHours, lastMinutes, lastSeconds;

    const targetDate = new Date("2025-03-29T23:59:59").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            document.getElementById("message").textContent = "ES HOY";
            document.getElementById("countdown").style.display = "none";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Solo aplicar el efecto al valor que cambia
        if (days !== lastDays) fadeOutAndUpdate(daysElement, days);
        if (hours !== lastHours) fadeOutAndUpdate(hoursElement, hours);
        if (minutes !== lastMinutes) fadeOutAndUpdate(minutesElement, minutes);
        if (seconds !== lastSeconds) fadeOutAndUpdate(secondsElement, seconds);

        // Actualizar los valores anteriores
        lastDays = days;
        lastHours = hours;
        lastMinutes = minutes;
        lastSeconds = seconds;
    }

    function fadeOutAndUpdate(element, newValue) {
        element.classList.add("fade"); // Aplica la animación

        setTimeout(() => {
            element.textContent = newValue; // Cambia el número
            element.classList.remove("fade"); // Vuelve a hacerlo visible suavemente
        }, 500); // Duración de la animación
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    document.getElementById("enter-site").addEventListener("click", function() {
        let welcomeScreen = document.getElementById("welcome-screen");
        welcomeScreen.classList.add("fade-out");
        setTimeout(() => {
            welcomeScreen.style.display = "none";
        }, 1000);
        
        const music = document.getElementById("background-music");
        music.play().catch(error => console.log("Reproducción bloqueada: ", error));
    });

    const music = document.getElementById("background-music");
    const musicToggle = document.getElementById("music-toggle");
    
    function fadeOutAudio(audio) {
        let volume = audio.volume;
        let fadeOutInterval = setInterval(() => {
            if (volume > 0.05) {
                volume -= 0.05;
                audio.volume = volume;
            } else {
                clearInterval(fadeOutInterval);
                audio.pause();
                audio.volume = 1;
            }
        }, 100);
    }

    function fadeInAudio(audio) {
        audio.volume = 0;
        audio.play();
        let volume = 0;
        let fadeInInterval = setInterval(() => {
            if (volume < 1) {
                volume += 0.05;
                audio.volume = volume;
            } else {
                clearInterval(fadeInInterval);
            }
        }, 100);
    }

    musicToggle.addEventListener("click", () => {
        if (music.paused) {
            fadeInAudio(music);
            musicToggle.textContent = "II";
        } else {
            fadeOutAudio(music);
            musicToggle.textContent = ">";
        }
    });
    
});
