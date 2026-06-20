// saveSystem.js

const SAVE_KEY = 'KaraokeMan_GameData';

// Function para i-save ang lahat ng progress
function saveGameData() {
    const gameData = {
        roads: Array.from(nakalatagNaMgaDaan), // I-convert ang Set sa Array para ma-save
        buildings: lahatNgBuildings, 
        resources: {
            pagkain: playerResources.pagkain,
            pera: playerResources.pera
        },
        timestamp: Date.now()
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(gameData));
    console.log("Progress Saved!", gameData);
}

// Function para i-load ang data pagbukas ng laro
function loadGameData() {
    const savedData = localStorage.getItem(SAVE_KEY);
    
    if (savedData) {
        const gameData = JSON.parse(savedData);
        
        // I-restore ang data sa game variables mo
        // Siguraduhin na ang mga variable na ito ay naka-define sa main game mo
        nakalatagNaMgaDaan = new Set(gameData.roads); 
        lahatNgBuildings = gameData.buildings;
        playerResources.pagkain = gameData.resources.pagkain;
        playerResources.pera = gameData.resources.pera;
        
        console.log("Game Loaded Successfully!");
        return true;
    }
    return false;
}

// Auto-save setup: Mag-o-autosave kada 30 segundo
setInterval(() => {
    saveGameData();
    document.getElementById('status-text').innerText = "Status: Game Auto-saved.";
}, 30000);