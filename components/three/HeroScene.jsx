'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Temporary 3D experiment: three.js scene rendered behind the homepage hero.
 * Desktop-only (>=1024px), disabled for prefers-reduced-motion.
 * three.js is imported dynamically so it never enters SSR or the initial bundle.
 */
export default function HeroScene() {
  const hostRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const check = () => setEnabled(!mqReduce.matches && window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!enabled || !hostRef.current) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import('three');
      if (disposed) return;

      const host = hostRef.current;
      let width = host.clientWidth;
      let height = host.clientHeight;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.setSize(width, height);
      Object.assign(renderer.domElement.style, {
        position: 'absolute',
        inset: '0',
        width: '100%',
        height: '100%',
        display: 'block',
      });
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
      camera.position.set(0, 0, 7);

      scene.add(new THREE.HemisphereLight(0xfff6e8, 0x2a3550, 1.15));
      const key = new THREE.DirectionalLight(0xffffff, 1.7);
      key.position.set(4, 6, 7);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0x8fb0ff, 0.55);
      rim.position.set(-6, 2, -4);
      scene.add(rim);

      const ivory = new THREE.MeshStandardMaterial({ color: 0xf1e7d8, roughness: 0.38, metalness: 0.05 });
      const navyGloss = new THREE.MeshStandardMaterial({ color: 0x1d2b4d, roughness: 0.18, metalness: 0.5 });
      const orange = new THREE.MeshStandardMaterial({ color: 0xe2811f, roughness: 0.28, metalness: 0.1 });

      // ---- Ten floating spheres across the hero (ivory / saffron / navy) ----
      const group = new THREE.Group();
      const floaters = [];
      const addBall = (r, material, pos, bobSpeed, phase) => {
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 32), material);
        mesh.position.set(...pos);
        group.add(mesh);
        floaters.push({ mesh, baseY: pos[1], bobSpeed, phase });
      };
      // Left side, behind the copy
      addBall(0.45, ivory, [-4.3, 0.6, -2.2], 0.55, 0.0);
      addBall(0.22, orange, [-3.0, -1.9, -1.0], 0.8, 1.3);
      addBall(0.16, ivory, [-4.7, 2.1, -2.8], 1.0, 2.1);
      addBall(0.13, orange, [-1.9, 2.3, -2.2], 0.9, 3.0);
      addBall(0.15, ivory, [-0.8, -2.3, -2.0], 1.1, 4.2);
      // Center gap
      addBall(0.12, navyGloss, [0.7, 2.4, -1.6], 0.85, 5.1);
      addBall(0.28, orange, [1.4, -2.0, -0.9], 0.7, 0.6);
      // Right side, around the photo
      addBall(0.24, ivory, [5.3, 1.2, -1.5], 0.75, 1.9);
      addBall(0.14, orange, [5.6, -1.7, -2.2], 1.05, 2.8);
      addBall(0.11, ivory, [2.3, 2.5, -2.6], 0.95, 3.7);
      scene.add(group);

      // Dust particles for depth
      const particleCount = 140;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = -5 + Math.random() * 11;
        positions[i * 3 + 1] = -3 + Math.random() * 6;
        positions[i * 3 + 2] = -4.5 + Math.random() * 5;
      }
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0xd9c9a8,
        size: 0.05,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
        depthWrite: false,
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
      const onPointer = (e) => {
        const rect = host.getBoundingClientRect();
        mouse.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.ty = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      };
      window.addEventListener('pointermove', onPointer, { passive: true });

      let running = true;
      const io = new IntersectionObserver(([entry]) => {
        running = entry.isIntersecting;
      });
      io.observe(host);
      const onVis = () => {
        running = !document.hidden;
      };
      document.addEventListener('visibilitychange', onVis);

      const onResize = () => {
        width = host.clientWidth;
        height = host.clientHeight;
        if (!width || !height) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
      window.addEventListener('resize', onResize);

      const clock = new THREE.Clock();
      let rafId = 0;
      const tick = () => {
        rafId = requestAnimationFrame(tick);
        if (!running) return;

        const t = clock.getElapsedTime();
        for (const f of floaters) {
          f.mesh.position.y = f.baseY + Math.sin(t * f.bobSpeed + f.phase) * 0.12;
        }
        particles.rotation.y = t * 0.014;

        mouse.x += (mouse.tx - mouse.x) * 0.04;
        mouse.y += (mouse.ty - mouse.y) * 0.04;
        camera.position.x = mouse.x * 0.45;
        camera.position.y = -mouse.y * 0.3;
        camera.lookAt(-0.4, 0, 0);

        renderer.render(scene, camera);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(rafId);
        io.disconnect();
        window.removeEventListener('pointermove', onPointer);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', onVis);
        scene.traverse((obj) => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) obj.material.dispose();
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={hostRef} className="hero-3d" aria-hidden="true" />;
}
