// roadtextures.js

function gupitinAngKalsadaTexture(mayN, mayS, mayE, mayW) {
    const canvas = document.createElement('canvas');
    canvas.width = 128; canvas.height = 128;
    const ctx = canvas.getContext('2d');

    // 1. Base Ground (Lupa)
    ctx.fillStyle = '#8b5a2b'; 
    ctx.fillRect(0, 0, 128, 128);

    const d = 32; 
    const gitna = 64;

    // 2. Dirt Path (Mas maitim na bahagi kung saan nadadaanan)
    ctx.fillStyle = '#5d3a1a'; 
    if (mayN) ctx.fillRect(d, 0, d * 2, gitna);
    if (mayS) ctx.fillRect(d, gitna, d * 2, gitna);
    if (mayW) ctx.fillRect(0, d, gitna, d * 2);
    if (mayE) ctx.fillRect(gitna, d, gitna, d * 2);

    // 3. ADDING ROCKS (Detalye)
    ctx.fillStyle = '#a0a0a0'; // Kulay ng bato
    for (let i = 0; i < 25; i++) {
        const rx = Math.random() * 128;
        const ry = Math.random() * 128;
        // Bato-bato (maliit na circles)
        ctx.beginPath();
        ctx.arc(rx, ry, Math.random() * 2 + 1, 0, Math.PI * 2);
        ctx.fill();
    }

    // 4. ADDING DIRT TEXTURE NOISE (Gasgas at dumi)
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    for (let i = 0; i < 200; i++) {
        ctx.fillRect(Math.random() * 128, Math.random() * 128, 1.5, 1.5);
    }

    // 5. Muted Edges (Para mag-blend sa damo/lupa)
    ctx.strokeStyle = 'rgba(70, 40, 20, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 128, 128);

    return new THREE.CanvasTexture(canvas);
}

function gupitinAngLupaTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64; canvas.height = 64;
    const ctx = canvas.getContext('2d');

    // 1. Base Soil Color na may slight variation para hindi flat
    ctx.fillStyle = '#7a5230'; 
    ctx.fillRect(0, 0, 64, 64);

    // 2. Add "Cracks" o mas madilim na patches para magmukhang totoong lupa
    ctx.fillStyle = '#5a3b20';
    for (let i = 0; i < 40; i++) { 
        // Mas maliliit na pixels para sa mas detalyadong "grain"
        ctx.fillRect(Math.random() * 64, Math.random() * 64, Math.random() * 2, Math.random() * 2); 
    }

    // 3. Mas natural na Damo (Cluster-based approach)
    ctx.fillStyle = '#4a6741';
    for (let i = 0; i < 8; i++) { 
        // Ginawa nating mas "clumpy" ang damo para mukhang patch
        const x = Math.random() * 64;
        const y = Math.random() * 64;
        ctx.fillRect(x, y, 5, 5); 
    }

    // 4. Bato na may "shadow" effect para lumitaw (para magmukhang 3D)
    for (let i = 0; i < 8; i++) {
        const x = Math.random() * 64;
        const y = Math.random() * 64;
        
        // Shadow
        ctx.fillStyle = '#444444';
        ctx.beginPath();
        ctx.arc(x + 1, y + 1, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Stone
        ctx.fillStyle = '#aaaaaa';
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
}