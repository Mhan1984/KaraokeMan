// =====================  ito yung sa World.js ko ===


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
