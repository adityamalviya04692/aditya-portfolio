# Animation implementation

Reference inspected live: https://ayush.cc/, including its home-to-hologram sequence and project detail transition.

Implemented:

- Open-source Three.js/React Three Fiber workspace with a scroll-controlled articulated character, chair and computer.
- Continuous breathing, alternating typing hands, animated code on the monitor, chair push-back, standing, turning and hand waving.
- The supplied portrait is texture-cropped onto the 3D character's face; the 3D bundle loads asynchronously with the personalized illustration as its fallback.
- Actual hero-image/font loading curtain with timeout fallback; animated initials.
- Staggered name-letter entrance and continuous orange/blue gradient shift.
- Scrambling section labels, rerun on hover.
- Hero scene entrance, pointer-reactive perspective tilt, moving sticker and note.
- Scroll-driven hero shrink, tilt, fade and rounded transition into blue scene.
- Sticky personalized avatar stage, scroll-driven scan beam, bottom-up cyan hologram, scanlines, grid and particles, glowing portal rings, 000–100 scan progress, staged identity/skills/impact callouts.
- Spring-following navigation indicator and page-reading progress.
- Viewport-triggered staggered section reveals with blur/slide.
- Count-up outcome metrics.
- Animated professional-experience diagrams, chart bars, data arrows and API status.
- Height/opacity animated accessible accordions.
- Original Moriveda image carousel with fade/scale, hover action, pointer tilt.
- Animated case-study dialog entrance/exit, native modal focus containment, Escape/backdrop/close dismissal.
- Button/link underline and icon motion, social hover bounce, skill-chip lift.
- Optional generated Web Audio click sounds, off by default. No copied music.
- Persistent pause-motion control and system prefers-reduced-motion support.

The hologram remains a layered identity sprite. The hero is now real-time WebGL with articulated procedural limbs and scroll-controlled poses. Its stylized geometry does not claim to reproduce the reference site's proprietary 3D model or animation files exactly.

## Avatar asset

`public/assets/aditya-standing.png`: generated with the built-in image tool using the user's supplied portrait as identity reference. Solid-black additive-compositing sprite; no transparency claim. Uses CSS screen blending and luminance masking in the hologram scene.

Initial prompt: Create a full-body, front-facing avatar preserving the supplied portrait's facial features, wavy black hair, trimmed beard, navy blazer, pale blue shirt, navy trousers and off-white sneakers; arms relaxed; full silhouette visible. The transparent-background attempts returned painted checkerboards, so the final edit preserved the person and replaced the background with pure black for additive compositing.

Final edit prompt: Preserve the exact full-body man, pose, face, clothing, proportions, and framing. Replace every checkerboard background pixel with a uniform pure solid black #000000 background. Do NOT output transparency or checkerboard. Solid pitch-black studio backdrop throughout, no floor or shadow. Man remains fully visible in the existing lighting, unchanged. This is a website additive-compositing sprite, black background essential.
