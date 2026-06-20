
// =====================  ito yung sa Ui.js ko ===


// =====================
// 3D Placement State Engine (Raycasting Setup)
// =====================
const raycaster = new THREE.Raycaster();
const mouseVector = new THREE.Vector2();
let isPlacing = false;
let activeBuildingData = null;
let placementPreviewMesh = null;


function openSubMenu(category) {
    const subPanel = document.getElementById('build-sub-panel');
    subPanel.innerHTML = ""; 
    subPanel.style.display = "flex"; 

    const items = buildingData[category];
    items.forEach(item => {
        const isAffordable = cityCash >= item.cost;
        const isUnlocked = item.unlocked;

        const card = document.createElement('div');
        card.className = `sub-item-card ${isUnlocked ? '' : 'disabled'} ${(!isAffordable && isUnlocked) ? 'insufficient-funds' : ''}`;
        
        if (!isAffordable && isUnlocked) {
            card.style.border = "1px dashed #ff3333";
        }

        card.innerHTML = `
            <div class="icon">${item.icon}</div>
            <strong>${item.name}</strong>
            <div class="specs">
                💰 ₭${item.cost.toLocaleString()}<br>
                👷 Labor: ${item.labor}<br>
                ⏳ Time: ${item.days} Days<br>
                📐 Area: ${item.size}<br> <i>${item.spec}</i>
            </div>
        `;

        if (isUnlocked) {
            card.onclick = (e) => {
                e.stopPropagation(); 
                
                if (cityCash >= item.cost) {
                    if (
                        item.name.includes("Road")
                    ) {
                        simulanAngPagdaan();
                    }
                    else {
                        start3DPlacement(item);
                    }
                } else {
                    alert(`Kulang ang pondo! Kailangan mo ng ₭${item.cost.toLocaleString()}`);
                }
            };
        }
        subPanel.appendChild(card);
    });
}

function start3DPlacement(item) {
    if (placementPreviewMesh) scene.remove(placementPreviewMesh);
    activeBuildingData = item;
    isPlacing = true;

    const geom = new THREE.BoxGeometry(3, 3, 3);
    const mat = new THREE.MeshStandardMaterial({ 
        color: 0x00ff00, 
        transparent: true, 
        opacity: 0.5,
        wireframe: false 
    });
    placementPreviewMesh = new THREE.Mesh(geom, mat);
    // I-spawn muna sa malayo para hindi biglang lumitaw sa gitna ng screen habang nasa UI ang mouse
    placementPreviewMesh.position.set(0, -999, 0); 
    scene.add(placementPreviewMesh);
}

function stopPlacementMode() {
    isPlacing = false;
    if (placementPreviewMesh) { 
        scene.remove(placementPreviewMesh); 
        placementPreviewMesh = null; 
    }
    activeBuildingData = null;

    // DAGDAG NA LINYA: Isasara ang sub-panel kapag tapos na mag-place o nag-cancel
    document.getElementById('build-sub-panel').style.display = "none";
}

document.getElementById('info-toggle-btn').addEventListener('click', () => { document.getElementById('controls-info').classList.toggle('visible'); });
document.getElementById('build-main-btn').addEventListener('click', () => { 
    const p = document.getElementById('build-items-panel'); p.classList.toggle('open');
    if(!p.classList.contains('open')) document.getElementById('build-sub-panel').style.display = "none";
});

