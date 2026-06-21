// =======  ito yung sa World.js ko ===
// =======  Paki Lagay ulit yung mga Clouds na gumagalaw ===
// =======  Pag May Araw asali mo na rin yung sikat ng Araw ===
// =======  Dapat Pag may Araw Maging sky maging blue na rin

// =====================
// Three.js Core Engine
// =====================
const scene = new THREE.Scene();
const skyDayColor = new THREE.Color(0xa3d5ff);
const skyNightColor = new THREE.Color(0x0a0a1a);
scene.background = skyDayColor;
const fog = new THREE.FogExp2(0xa3d5ff, 0.015);
scene.fog = fog;

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true; 
document.body.appendChild(renderer.domElement);

const sunLight = new THREE.DirectionalLight(0xffffff, 2.0); 
sunLight.castShadow = true;
scene.add(sunLight);
const ambient = new THREE.AmbientLight(0xffffff, 0.6); 
scene.add(ambient);

const mapSize = 198;
const ground = new THREE.Mesh(new THREE.PlaneGeometry(mapSize, mapSize), new THREE.MeshStandardMaterial({ color: 0x557a2b, roughness: 0.9 }));
ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
/*
const gridHelper = new THREE.GridHelper(
    mapSize,
    mapSize / 2,
    0x445522,
    0x445522
);

gridHelper.position.y = 0.01;
scene.add(gridHelper);
*/

const player = new THREE.Object3D(); player.position.set(0, 10, 25); scene.add(player); player.add(camera);
let cameraPitch = -Math.PI / 6; camera.rotation.x = cameraPitch;

const skyGroup = new THREE.Group(); scene.add(skyGroup);
const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(3, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffe57f })); skyGroup.add(sunMesh);
const moonMesh = new THREE.Mesh(new THREE.SphereGeometry(2.5, 8, 8), new THREE.MeshBasicMaterial({ color: 0xe0e0e0 })); skyGroup.add(moonMesh);


// =====================
// Cloud System (Procedural Clouds)
// =====================
const clouds = [];
const cloudGeometry = new THREE.SphereGeometry(1.5, 8, 8);
const cloudMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });

function createCloud() {
    const group = new THREE.Group();
    // Bawat ulap ay gawa sa 3-5 na spheres para magmukhang fluffy
    const count = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < count; i++) {
        const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
        cloud.position.set(i * 1.2, Math.random(), Math.random());
        cloud.scale.set(1 + Math.random(), 1 + Math.random(), 1 + Math.random());
        group.add(cloud);
    }
    
    // Posisyon sa langit
    group.position.set(
        (Math.random() - 0.5) * 150, 
        20 + Math.random() * 10, 
        (Math.random() - 0.5) * 150
    );
    group.userData.speed = Math.random() * 0.02 + 0.01;
    scene.add(group);
    clouds.push(group);
}

// Gumawa ng 20 ulap
for (let i = 0; i < 20; i++) {
    createCloud();
}

// =====================
// Cloud Animation (Ilagay ito sa loob ng iyong animate loop)
// =====================
function animateClouds() {
    clouds.forEach(cloud => {
        cloud.position.x += cloud.userData.speed;
        // Reset position kapag lumagpas na sa dulo
        if (cloud.position.x > 80) {
            cloud.position.x = -80;
        }
    });
}
