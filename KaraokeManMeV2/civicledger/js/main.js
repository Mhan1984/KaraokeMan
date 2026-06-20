// =====================  ito yung sa Main.js ko ===



    // Mouse Move Listener

    window.addEventListener('mousemove', (e) => {

        if (!isEngineLoaded || !isPlacing || !placementPreviewMesh) return;



        mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;

        mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;



        raycaster.setFromCamera(mouseVector, camera);

        const intersects = raycaster.intersectObject(ground);



        if (intersects.length > 0) {

            const hitPoint = intersects[0].point;

            const snappedX = Math.round(hitPoint.x / 2) * 2;

            const snappedZ = Math.round(hitPoint.z / 2) * 2;

            const snappedY = 1.5;



            placementPreviewMesh.position.set(snappedX, snappedY, snappedZ);

        }

    });



    // Left Click Listener

    window.addEventListener('click', (e) => {

        if (!isEngineLoaded || !isPlacing || !placementPreviewMesh || e.button !== 0) return;



        raycaster.setFromCamera(mouseVector, camera);

        const intersects = raycaster.intersectObject(ground);



        // Siguraduhing may tinatamaan sa mapa bago mag-bawas ng pera

        if (intersects.length > 0 && placementPreviewMesh.position.y > 0) {

            cityCash -= activeBuildingData.cost;

            document.getElementById('cash-display').innerText = cityCash.toLocaleString();



            const geom = new THREE.BoxGeometry(3, 3, 3);

           

            let buildColor = 0xffffff;

            if (activeBuildingData.name.includes("Road") || activeBuildingData.name.includes("Concrete")) buildColor = 0x333333;

            else if (activeBuildingData.name.includes("House") || activeBuildingData.name.includes("Mansion")) buildColor = 0xcc6633;

            else if (activeBuildingData.name.includes("Factory") || activeBuildingData.name.includes("Plant")) buildColor = 0x777777;

            else buildColor = 0x3399ff;



            const mat = new THREE.MeshStandardMaterial({ color: buildColor, roughness: 0.5 });

            const placedBuilding = new THREE.Mesh(geom, mat);

           

            placedBuilding.position.copy(placementPreviewMesh.position);

            placedBuilding.castShadow = true;

            placedBuilding.receiveShadow = true;

            scene.add(placedBuilding);



            cityLevel += 1;

            document.getElementById('lvl-display').innerText = cityLevel;



            stopPlacementMode();

        }

    });



    // Right Click Cancel Listener

    window.addEventListener('contextmenu', (e) => {

        if (isPlacing) {

            e.preventDefault();

            stopPlacementMode();

        }

    });



    // Environment Generation

    for(let i = 0; i < 40; i++) {

        const treeGroup = new THREE.Group();

        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.4, 2, 5), new THREE.MeshStandardMaterial({ color: 0x5a3d28 }));

        trunk.position.y = 1; treeGroup.add(trunk);

        const leaves = new THREE.Mesh(new THREE.DodecahedronGeometry(1.2, 0), new THREE.MeshStandardMaterial({ color: 0x385e38 }));

        leaves.position.y = 2.4; treeGroup.add(leaves);

        const rx = (Math.random() - 0.5) * (mapSize - 20); const rz = (Math.random() - 0.5) * (mapSize - 20);

        if(Math.abs(rx) > 5 || Math.abs(rz) > 5) { treeGroup.position.set(rx, 0, rz); scene.add(treeGroup); }

    }



    // Wallet Icon Setup

    const canvas = document.getElementById('coin-icon'); canvas.width = 128; canvas.height = 128;

    const ctx = canvas.getContext('2d'); ctx.fillStyle = '#ffd700'; ctx.clearRect(0, 0, 128, 128);

    ctx.lineWidth = 8; ctx.strokeStyle = '#b8860b'; ctx.beginPath(); ctx.arc(64, 64, 58, 0, Math.PI * 2); ctx.stroke();

    ctx.fillStyle = '#b8860b'; ctx.font = 'bold 60px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('₭', 64, 64);



    // Core Controls Input

    const keys = {}; let isShiftPressed = false;

    const turnSpeed = 0.03; const pitchSpeed = 0.02; const minPitch = -Math.PI / 2.5; const maxPitch = 0; const flySpeed = 0.5;

   

    window.addEventListener("keydown", (e) => {

        if(!isEngineLoaded) return; // Block input habang naglo-load

        keys[e.key.toLowerCase()] = true;

        if (e.key === "Shift") isShiftPressed = true;

    });

   

    window.addEventListener("keyup", (e) => {

        keys[e.key.toLowerCase()] = false;

        if (e.key === "Shift") isShiftPressed = false;

    });

   

    window.addEventListener('wheel', (e) => {

        if(!isEngineLoaded) return; // Block input habang naglo-load

        if (e.deltaY < 0) player.position.y += flySpeed; else if (e.deltaY > 0) player.position.y -= flySpeed;

        player.position.y = Math.max(2, Math.min(50, player.position.y));

    });

// Merun let time dito Para saan ito

    let time = 0;

// Siguraduhin na naka-declare ito sa taas ng script
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    // 1. Delta time para sa smooth animations (Workers/Roads)
    const deltaTime = clock.getDelta();

    // 2. I-update ang Road Construction
    updateRoadConstruction(deltaTime);

    // 3. Movement Mechanics
    const moveSpeed = 0.25;
    if (isShiftPressed) {
        if (keys["a"]) player.rotation.y += turnSpeed; if (keys["d"]) player.rotation.y -= turnSpeed;
        if (keys["w"]) { cameraPitch += pitchSpeed; cameraPitch = Math.max(minPitch, Math.min(maxPitch, cameraPitch)); camera.rotation.x = cameraPitch; }
        if (keys["s"]) { cameraPitch -= pitchSpeed; cameraPitch = Math.max(minPitch, Math.min(maxPitch, cameraPitch)); camera.rotation.x = cameraPitch; }
    } else {
        if (keys["w"]) player.translateZ(-moveSpeed); if (keys["s"]) player.translateZ(moveSpeed);
        if (keys["a"]) player.translateX(-moveSpeed); if (keys["d"]) player.translateX(moveSpeed);  
    }

    // 4. Sky Mechanics (Ang time variable na tinanong mo)
    time += 0.001; 
    const sunX = Math.cos(time) * 80; 
    const sunY = Math.sin(time) * 80;
    
    sunMesh.position.set(sunX + player.position.x, sunY, player.position.z);
    moonMesh.position.set(-sunX + player.position.x, -sunY, player.position.z);
    sunLight.position.copy(sunMesh.position);

    // Day/Night Color Lerping
    if (sunY > 0) {
        const ratio = Math.min(1, sunY / 20); 
        scene.background.lerpColors(skyNightColor, skyDayColor, ratio); 
        fog.color.lerpColors(skyNightColor, skyDayColor, ratio);
    } else {
        const ratio = Math.min(1, Math.abs(sunY) / 20); 
        scene.background.lerpColors(skyDayColor, skyNightColor, ratio); 
        fog.color.lerpColors(skyDayColor, skyNightColor, ratio);
    }

    // 5. UI Tracking para sa Road Buttons
    Object.keys(pendingBatches).forEach(id => {
        const b = pendingBatches[id];
        if (b.hulingTilePos && b.uiElement) {
            tempV.set(b.hulingTilePos.x, 0.5, b.hulingTilePos.z).project(camera);
            b.uiElement.style.left = `${(tempV.x * 0.5 + 0.5) * window.innerWidth}px`;
            b.uiElement.style.top = `${(tempV.y * -0.5 + 0.5) * window.innerHeight}px`;
        }
    });

    renderer.render(scene, camera);
}



    // FIXED: Tinanggal ang automatic invocation ng animate() dito para sumunod sa loading completion event handler.

    window.addEventListener("resize", () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); });





const deltaTime =

    clock.getDelta();



updateRoadConstruction(

    deltaTime

); 

