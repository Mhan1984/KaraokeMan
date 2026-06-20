// =====================  ito yung sa Workers.js ko ===

function lumikhaNgManggagawa(x, z) {
    const workerGroup = new THREE.Group();
    const katawan = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, 0.3), new THREE.MeshStandardMaterial({ color: 0x0055ff }));
    katawan.position.y = 0.25; workerGroup.add(katawan);
    const ulo = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.25, 0.25), new THREE.MeshStandardMaterial({ color: 0xffdbac }));
    ulo.position.y = 0.625; workerGroup.add(ulo);
    const helmet = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.12, 0.3), new THREE.MeshStandardMaterial({ color: 0xffaa00 }));
    helmet.position.y = 0.75; workerGroup.add(helmet);

    const toolPivot = new THREE.Group(); toolPivot.position.set(0.2, 0.4, 0.1);
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.6, 0.05), new THREE.MeshStandardMaterial({ color: 0x8b5a2b }));
    handle.position.y = 0.1; handle.rotation.x = Math.PI / 4; toolPivot.add(handle);
    const bakal = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.06, 0.06), new THREE.MeshStandardMaterial({ color: 0x777777, metalness: 0.8 }));
    bakal.position.set(0, 0.35, 0.15); toolPivot.add(bakal);

    workerGroup.add(toolPivot); workerGroup.position.set(x, 0, z);
    workerGroup.userData = { toolPivot: toolPivot };
    return workerGroup;
}
