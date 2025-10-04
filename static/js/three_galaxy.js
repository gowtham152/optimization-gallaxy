(function(){
  function initThreeGalaxy(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Clear previous scene
    container.innerHTML = '';

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width/height, 0.1, 1000);
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Galaxy points
    const geometry = new THREE.BufferGeometry();
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 40;
      const angle = Math.random() * Math.PI * 4;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 10;
      const z = Math.sin(angle) * radius;
      positions.set([x, y, z], i*3);

      // Cool color palette: blues, cyans, purples
      const hue = 0.5 + Math.random() * 0.3; // Blue to cyan range
      const c = new THREE.Color().setHSL(hue, 0.8, 0.7);
      colors.set([c.r, c.g, c.b], i*3);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({ size: 0.3, vertexColors: true, transparent: true, opacity: 0.9 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Core glow sphere
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee })
    );
    scene.add(core);

    // Resize handling
    function onResize(){
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', onResize);

    // Animation
    function animate(){
      requestAnimationFrame(animate);
      points.rotation.y += 0.0015;
      points.rotation.x += 0.0007;
      core.rotation.y -= 0.003;
      renderer.render(scene, camera);
    }
    animate();
  }

  window.initThreeGalaxy = initThreeGalaxy;
})();
