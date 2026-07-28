const fs = require('fs');
const zlib = require('zlib');

// Create 1200x630 PNG with Obsidian background (#0d0d0d) and Neon Volt badge (#c8f400)
const width = 1200;
const height = 630;

const buffer = Buffer.alloc(height * (1 + width * 4));
let offset = 0;

for (let y = 0; y < height; y++) {
  buffer[offset++] = 0; // Filter type 0
  for (let x = 0; x < width; x++) {
    // Check if within center badge (width 240x240 centered around x:600, y:280)
    const badgeSize = 180;
    const badgeX = 600;
    const badgeY = 280;
    const dx = Math.abs(x - badgeX);
    const dy = Math.abs(y - badgeY);
    
    // Rounded rect badge test
    let inBadge = false;
    if (dx <= 90 && dy <= 90) {
      inBadge = true;
    } else {
      const rx = Math.max(0, dx - 55);
      const ry = Math.max(0, dy - 55);
      if (rx * rx + ry * ry <= 35 * 35) {
        inBadge = true;
      }
    }

    // Shopping bag handles inside badge
    let isHandle = false;
    let isBagBody = false;
    if (inBadge) {
      // Handle arc: center around (600, 255), r_outer: 30, r_inner: 18
      const hx = x - badgeX;
      const hy = y - (badgeY - 25);
      const distSq = hx * hx + hy * hy;
      if (hy <= 0 && distSq >= 18 * 18 && distSq <= 30 * 30) {
        isHandle = true;
      }
      if (hy > 0 && hy < 20 && ((hx >= -30 && hx <= -18) || (hx >= 18 && hx <= 30))) {
        isHandle = true;
      }

      // Bag body: x in [-42, 42], y in [-10, 42]
      const bx = x - badgeX;
      const by = y - (badgeY + 15);
      if (bx >= -42 && bx <= 42 && by >= -10 && by <= 42) {
        isBagBody = true;
      }
    }

    // Colors
    let r = 13, g = 13, b = 13; // #0d0d0d Obsidian
    
    // Subtle radial ambient glow behind badge
    const centerDist = Math.hypot(x - 600, y - 280);
    if (centerDist < 450) {
      const glow = Math.pow(Math.max(0, 1 - centerDist / 450), 2);
      r += Math.round(glow * 50);
      g += Math.round(glow * 75);
      b += Math.round(glow * 0);
    }

    if (inBadge) {
      r = 200; g = 244; b = 0; // #c8f400 Electric Neon Volt
      if (isHandle || isBagBody) {
        r = 13; g = 13; b = 13; // Dark bag inside badge
      }
    }

    buffer[offset++] = Math.min(255, r);
    buffer[offset++] = Math.min(255, g);
    buffer[offset++] = Math.min(255, b);
    buffer[offset++] = 255; // Alpha
  }
}

const compressed = zlib.deflateSync(buffer);

function createChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);
  
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < body.length; i++) {
    crc ^= body[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
    }
  }
  crc = (crc ^ 0xFFFFFFFF) >>> 0;

  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc, 0);
  return Buffer.concat([len, data.length > 0 ? body : typeBuf, crcBuf]);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(width, 0);
ihdr.writeUInt32BE(height, 4);
ihdr[8] = 8;
ihdr[9] = 6;
ihdr[10] = 0;
ihdr[11] = 0;
ihdr[12] = 0;

const pngSignature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
const ihdrChunk = createChunk('IHDR', ihdr);
const idatChunk = createChunk('IDAT', compressed);
const iendChunk = createChunk('IEND', Buffer.alloc(0));

const finalPng = Buffer.concat([pngSignature, ihdrChunk, idatChunk, iendChunk]);

fs.writeFileSync('public/logo.png', finalPng);
fs.writeFileSync('public/og-image.png', finalPng);
console.log('Generated public/logo.png and public/og-image.png successfully! Size:', finalPng.length);
