// =====================  ito yung sa Loading.js ko ===

let isEngineLoaded = false;

const loadingScreen =
document.getElementById('loading-screen');

const progressBar =
document.getElementById('progress-bar');

const progressText =
document.getElementById('progress-text');

let progressPercentage = 0;

const loadingInterval =
setInterval(() => {

    progressPercentage +=
        Math.floor(Math.random() * 8) + 2;

    if (progressPercentage >= 100) {
        progressPercentage = 100;

        clearInterval(loadingInterval);

        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';

            isEngineLoaded = true;

            animate();
        }, 400);
    }

    progressBar.style.width =
        progressPercentage + '%';

    progressText.innerText =
        `Processing: ${progressPercentage}%`;

}, 150);