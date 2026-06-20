
// =====================  Ito yung i Update mo ===





let kasalukuyangNagdadalan = false;

let isDragging = false;



const roadRaycaster = new THREE.Raycaster();

const roadMouse = new THREE.Vector2();



const nakalatagNaMgaDaan = new Set();

const nakaplanoPaLang = new Set();

const lahatNgKalsadaMesh = {};



const activeConstructions = [];

let kasalukuyangBatchId = 0;

const pendingBatches = {};



let animationTime = 0;

const tempV = new THREE.Vector3();











function simulanAngPagdaan() {

    kasalukuyangNagdadalan = true;

   

    // BAGO: Awtomatikong pinapakita ang grid kapag handa nang mag-drawing ang user

    roadGrid.visible = true;

   

    document.getElementById('status-text').innerText = "Status: I-drag ang mouse sa mapa...";

}





function magplanoNgDaan(gridPos) {

    if (!gridPos) return;



    const posKey = `${gridPos.x},${gridPos.z}`;

    if (nakalatagNaMgaDaan.has(posKey) || nakaplanoPaLang.has(posKey)) return;

   

    if (kasalukuyangBatchId === 0) {

        kasalukuyangBatchId = Date.now();

        pendingBatches[kasalukuyangBatchId] = { tiles: [], uiElement: null, hulingTilePos: null };

    }



    nakaplanoPaLang.add(posKey);



    const geo = new THREE.BoxGeometry(3, 0.1, 3);

    const mat = new THREE.MeshStandardMaterial({ map: gupitinAngLupaTexture(), transparent: true, opacity: 0.6 });

    const mesh = new THREE.Mesh(geo, mat);

    mesh.position.set(gridPos.x, 0.05, gridPos.z);

    scene.add(mesh);



    lahatNgKalsadaMesh[posKey] = mesh;

    pendingBatches[kasalukuyangBatchId].tiles.push({ posKey: posKey, gridPos: gridPos, mesh: mesh });

    pendingBatches[kasalukuyangBatchId].hulingTilePos = gridPos;

}



function aprubahanAngBatch(batchId) {

    const batch = pendingBatches[batchId];

    if (!batch) return;



    // BAGO: Dahil na-click na ang check mark, itatago na ulit ang grid guide

    roadGrid.visible = false;



    batch.tiles.forEach(plano => {

        plano.mesh.material.opacity = 1.0;

        plano.mesh.material.map = gupitinAngLupaTexture();

        plano.mesh.material.needsUpdate = true;



        const pBarContainer = new THREE.Mesh(new THREE.BoxGeometry(2, 0.1, 0.2), new THREE.MeshBasicMaterial({ color: 0x333333 }));

        pBarContainer.position.set(plano.gridPos.x, 1.5, plano.gridPos.z); scene.add(pBarContainer);



        const pBar = new THREE.Mesh(new THREE.BoxGeometry(2, 0.12, 0.22), new THREE.MeshBasicMaterial({ color: 0x00ffaa }));

        pBar.position.set(plano.gridPos.x, 1.51, plano.gridPos.z); scene.add(pBar);



        const workers = [];

        for (let i = 0; i < 2; i++) {

            const side = (i === 0) ? -1.1 : 1.1;

            const worker = lumikhaNgManggagawa(plano.gridPos.x + side, plano.gridPos.z + (Math.random() - 0.5));

            worker.lookAt(plano.gridPos.x, 0, plano.gridPos.z);

            scene.add(worker); workers.push(worker);

        }



        activeConstructions.push({

            posKey: plano.posKey, mesh: plano.mesh, workers: workers,

            progressBarContainer: pBarContainer, progressBarMesh: pBar, progress: 0, duration: 40.0

        });

    });



    batch.uiElement.remove();

    delete pendingBatches[batchId];

    document.getElementById('progress-container').style.display = 'block';

    kasalukuyangBatchId = 0;

    document.getElementById('status-text').innerText = "Status: Ginagawa ang kalsada...";

}



function cancelahanAngBatch(batchId) {

    const batch = pendingBatches[batchId];

    if (!batch) return;



    // BAGO: Dahil kanselado ang pagguhit (na-click ang X), mawawala rin ang grid guide sa lupa

    roadGrid.visible = false;



    batch.tiles.forEach(plano => {

        scene.remove(plano.mesh);

        nakaplanoPaLang.delete(plano.posKey);

        delete lahatNgKalsadaMesh[plano.posKey];

    });



    batch.uiElement.remove();

    delete pendingBatches[batchId];

    kasalukuyangBatchId = 0;

    document.getElementById('status-text').innerText = "Status: Idle";

}



// Ilagay ito sa isang variable sa taas para hindi mo na kailangang maghanap kung saan babaguhin
const GRID_SIZE = 2; 

function makuhaAngGridPosisyon(e) {

    roadMouse.x =
        (e.clientX / window.innerWidth) * 2 - 1;

    roadMouse.y =
        -(e.clientY / window.innerHeight) * 2 + 1;

    roadRaycaster.setFromCamera(
        roadMouse,
        camera
    );

    const intersect =
        roadRaycaster.intersectObject(
            ground
        );

    if (intersect.length > 0) {

        return {
            x:
                Math.round(
                    intersect[0].point.x / 3
                ) * 3,

            z:
                Math.round(
                    intersect[0].point.z / 3
                ) * 3
        };
    }

    return null;
}



function iUpdateAngLahatNgKoneksyon() {

    Object.keys(lahatNgKalsadaMesh).forEach(key => {

        if (!nakalatagNaMgaDaan.has(key)) return;



        const [x, z] = key.split(',').map(Number);

        const mayN = nakalatagNaMgaDaan.has(`${x},${z - GRID_SIZE}`);
        const mayS = nakalatagNaMgaDaan.has(`${x},${z + GRID_SIZE}`);
        const mayE = nakalatagNaMgaDaan.has(`${x + GRID_SIZE},${z}`);
        const mayW = nakalatagNaMgaDaan.has(`${x - GRID_SIZE},${z}`);

        const bagongTexture = gupitinAngKalsadaTexture(mayN, mayS, mayE, mayW);

        const mesh = lahatNgKalsadaMesh[key];

        mesh.material.map = bagongTexture;

        mesh.material.needsUpdate = true;

    });

}



const roadGrid = new THREE.GridHelper(

    mapSize,

    mapSize / 3,

    0x00ffaa,

    0xffffff

);



roadGrid.position.y = 0.02;

roadGrid.visible = false;

scene.add(roadGrid);





window.addEventListener(

    'mousedown',

    (e) => {



        if (

            kasalukuyangNagdadalan &&

            e.button === 0

        ) {

            isDragging = true;



            magplanoNgDaan(

                makuhaAngGridPosisyon(e)

            );

        }

    }

);



window.addEventListener(

    'mousemove',

    (e) => {



        if (

            !kasalukuyangNagdadalan ||

            !isDragging

        ) return;



        magplanoNgDaan(

            makuhaAngGridPosisyon(e)

        );

    }

);


window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    kasalukuyangNagdadalan = false;

    if (kasalukuyangBatchId && pendingBatches[kasalukuyangBatchId]) {
        const batch = pendingBatches[kasalukuyangBatchId];
        const uiDiv = document.createElement('div');
        uiDiv.className = 'floating-ui';
        uiDiv.style.position = 'absolute';
        uiDiv.style.left = e.clientX + 'px';
        uiDiv.style.top = e.clientY + 'px';

        uiDiv.innerHTML = `<button id="check-btn">✔️</button><button id="cancel-btn">❌</button>`;
        document.getElementById('ui-container').appendChild(uiDiv);

        document.getElementById('check-btn').onclick = () => aprubahanAngBatch(kasalukuyangBatchId);
        document.getElementById('cancel-btn').onclick = () => cancelahanAngBatch(kasalukuyangBatchId);
        batch.uiElement = uiDiv;
    }
});


function updateRoadConstruction(

    deltaTime

) {



    animationTime +=

        deltaTime * 8;



    for (

        let i =

            activeConstructions.length - 1;

        i >= 0;

        i--

    ) {



        const item =

            activeConstructions[i];



        item.progress +=

            deltaTime /

            item.duration;



if (item.progress < 1) {

    item.workers.forEach(
        (w, idx) => {

            const wave =
                Math.sin(
                    animationTime +
                    idx * 2
                );

            w.userData.toolPivot.rotation.x =
                wave > 0
                    ? wave * 0.8
                    : wave * 0.3;

            w.rotation.x =
                wave > 0
                    ? wave * 0.15
                    : 0;
        }
    );

    item.progressBarMesh.scale.x =
        item.progress;

    item.progressBarMesh.position.x =
        item.mesh.position.x -
        (1 - item.progress);

}
else {

    nakalatagNaMgaDaan.add(
        item.posKey
    );

    nakaplanoPaLang.delete(
        item.posKey
    );

    item.workers.forEach(
        w => scene.remove(w)
    );

    scene.remove(
        item.progressBarContainer
    );

    scene.remove(
        item.progressBarMesh
    );

    activeConstructions.splice(
        i,
        1
    );

    iUpdateAngLahatNgKoneksyon();
}

    }

} 

