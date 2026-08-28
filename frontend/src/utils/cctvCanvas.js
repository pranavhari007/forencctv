/**
 * Forensic CCTV Simulation Engine
 * Generates realistic procedural CCTV surveillance footage on an HTML5 canvas
 * with timestamp overlays, frame numbers, noise, edge enhancement, and bounding boxes.
 */

export const drawCctvScene = (canvas, {
  sceneType = 'bank_lobby',
  timeOffset = 0,
  isPlaying = true,
  brightness = 100,
  contrast = 100,
  filterMode = 'normal', // 'normal', 'edge', 'night_vision', 'thermal'
  zoom = 1,
  panX = 0,
  panY = 0,
  cameraTag = 'CAM-01 [LOBBY]',
  timestampText = '2026-08-21 02:22:15.890',
  boundingBoxes = []
}) => {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  ctx.save();
  ctx.clearRect(0, 0, width, height);

  // Apply zoom and pan
  ctx.translate(width / 2, height / 2);
  ctx.scale(zoom, zoom);
  ctx.translate(-width / 2 + panX, -height / 2 + panY);

  // Base background & room perspective
  const grad = ctx.createLinearGradient(0, 0, width, height);
  if (filterMode === 'thermal') {
    grad.addColorStop(0, '#100030');
    grad.addColorStop(0.5, '#4a0072');
    grad.addColorStop(1, '#ff6d00');
  } else if (filterMode === 'night_vision') {
    grad.addColorStop(0, '#021805');
    grad.addColorStop(1, '#052b0a');
  } else {
    grad.addColorStop(0, '#0c1322');
    grad.addColorStop(1, '#182438');
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Draw architectural perspective grids & room geometry
  ctx.strokeStyle = filterMode === 'night_vision' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1.5;

  // Floor grid
  const vanishingY = height * 0.38;
  const vanishingX = width * 0.5;

  for (let i = 0; i <= width; i += 60) {
    ctx.beginPath();
    ctx.moveTo(vanishingX, vanishingY);
    ctx.lineTo(i, height);
    ctx.stroke();
  }

  // Horizontal floor dividers
  for (let y = vanishingY + 30; y < height; y += (y - vanishingY) * 0.45 + 10) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Room Specific Background Elements
  if (sceneType === 'bank_lobby') {
    // Glass double doors
    ctx.fillStyle = filterMode === 'night_vision' ? '#0a3812' : '#142238';
    ctx.fillRect(width * 0.3, height * 0.15, width * 0.4, height * 0.55);
    ctx.strokeStyle = filterMode === 'night_vision' ? '#22c55e' : '#38bdf8';
    ctx.strokeRect(width * 0.3, height * 0.15, width * 0.4, height * 0.55);

    // Reception desk
    ctx.fillStyle = filterMode === 'night_vision' ? '#0d4715' : '#1e293b';
    ctx.fillRect(width * 0.1, height * 0.6, width * 0.25, height * 0.3);
    ctx.strokeRect(width * 0.1, height * 0.6, width * 0.25, height * 0.3);

    // Bank Logo on wall
    ctx.fillStyle = filterMode === 'night_vision' ? '#4ade80' : '#0ea5e9';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('STATE BANK // SECTOR 18 BRANCH', width * 0.33, height * 0.12);
  } else if (sceneType === 'vault_corridor') {
    // Heavy vault door frame
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(width * 0.35, height * 0.18, width * 0.3, height * 0.65);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 4;
    ctx.strokeRect(width * 0.35, height * 0.18, width * 0.3, height * 0.65);

    // Keypad & access panel
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(width * 0.28, height * 0.45, 14, 22);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(width * 0.28, height * 0.42, 14, 2);
  } else if (sceneType === 'vault_interior') {
    // Safe deposit lockers grid
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 8; c++) {
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(width * 0.15 + c * 48, height * 0.15 + r * 35, 42, 30);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        ctx.strokeRect(width * 0.15 + c * 48, height * 0.15 + r * 35, 42, 30);
      }
    }
  } else if (sceneType === 'alleyway_dock') {
    // Loading dock brick wall & road
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, height * 0.5, width, height * 0.5);
    ctx.strokeStyle = '#eab308';
    ctx.setLineDash([15, 15]);
    ctx.beginPath();
    ctx.moveTo(0, height * 0.75);
    ctx.lineTo(width, height * 0.75);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Draw Suspects / Animated Subject Silhouettes
  const animX = Math.sin(timeOffset * 0.002) * 15;
  const animY = Math.cos(timeOffset * 0.003) * 5;

  if (sceneType === 'bank_lobby' || sceneType === 'vault_corridor') {
    // Suspect 1 (Left)
    const s1X = width * 0.42 + animX;
    const s1Y = height * 0.38 + animY;
    
    // Body silhouette
    ctx.fillStyle = filterMode === 'night_vision' ? '#166534' : filterMode === 'thermal' ? '#ff3d00' : '#0f172a';
    ctx.beginPath();
    ctx.ellipse(s1X + 25, s1Y + 15, 12, 16, 0, 0, Math.PI * 2); // Head
    ctx.fill();
    ctx.fillRect(s1X + 10, s1Y + 30, 30, 75); // Torso
    ctx.fillRect(s1X + 12, s1Y + 105, 11, 70); // Left leg
    ctx.fillRect(s1X + 27, s1Y + 105, 11, 70); // Right leg

    // Suspect 2 (Right)
    const s2X = width * 0.58 - animX;
    const s2Y = height * 0.40 - animY;
    ctx.fillStyle = filterMode === 'night_vision' ? '#14532d' : filterMode === 'thermal' ? '#ff9100' : '#1e1b4b';
    ctx.beginPath();
    ctx.ellipse(s2X + 25, s2Y + 15, 13, 17, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(s2X + 10, s2Y + 30, 32, 70);
    // Backpack
    ctx.fillStyle = filterMode === 'thermal' ? '#ffd600' : '#334155';
    ctx.fillRect(s2X + 38, s2Y + 35, 15, 45);
    ctx.fillStyle = filterMode === 'night_vision' ? '#14532d' : '#1e1b4b';
    ctx.fillRect(s2X + 12, s2Y + 100, 11, 75);
    ctx.fillRect(s2X + 28, s2Y + 100, 11, 75);
  }

  // Draw AI Bounding Boxes if enabled
  boundingBoxes.forEach((box) => {
    const bx = (box.x / 100) * width;
    const by = (box.y / 100) * height;
    const bw = (box.w / 100) * width;
    const bh = (box.h / 100) * height;

    // Corner brackets style
    ctx.strokeStyle = box.color || '#06b6d4';
    ctx.lineWidth = 2;
    ctx.strokeRect(bx, by, bw, bh);

    // Label tag
    ctx.fillStyle = box.color || '#06b6d4';
    ctx.fillRect(bx, by - 20, Math.max(120, box.label.length * 7), 20);
    ctx.fillStyle = '#020617';
    ctx.font = 'bold 11px monospace';
    ctx.fillText(`${box.label} [${box.confidence || '96%'}%]`, bx + 4, by - 6);
  });

  // Filter overlays (Edge Enhance / Night Vision / Thermal)
  if (filterMode === 'night_vision') {
    ctx.fillStyle = 'rgba(34, 197, 94, 0.15)';
    ctx.fillRect(0, 0, width, height);
  } else if (filterMode === 'thermal') {
    ctx.fillStyle = 'rgba(168, 85, 247, 0.12)';
    ctx.fillRect(0, 0, width, height);
  }

  // CCTV Scanline effect
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  for (let y = 0; y < height; y += 4) {
    ctx.fillRect(0, y, width, 1.5);
  }

  // Random CCTV noise grain
  if (isPlaying) {
    for (let i = 0; i < 200; i++) {
      const nx = Math.random() * width;
      const ny = Math.random() * height;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(nx, ny, 2, 2);
    }
  }

  ctx.restore();

  // Draw Camera HUD & Overlays (Fixed to viewport)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fillRect(10, 10, width - 20, 28);
  ctx.fillRect(10, height - 38, width - 20, 28);

  // Top HUD
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(24, 24, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 12px monospace';
  ctx.fillText(`REC  ${cameraTag}`, 36, 28);

  ctx.fillStyle = '#38bdf8';
  ctx.fillText(`FPS: 25.00  |  CODEC: H.265 / HEVC  |  STREAM: MAIN-01`, width * 0.35, 28);

  ctx.fillStyle = '#e2e8f0';
  ctx.fillText(timestampText, width - 220, 28);

  // Bottom HUD
  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px monospace';
  ctx.fillText(`FRAME: #${Math.floor(timeOffset / 40) + 104829}  |  PTS: +0.000s  |  HASH-AUTH: SHA-256 [VERIFIED]`, 20, height - 20);

  ctx.fillStyle = '#06b6d4';
  ctx.fillText(`OPTICAL ZOOM: ${zoom.toFixed(1)}x  |  FORENCCTV FORENSIC HUD`, width - 280, height - 20);
};
