let audioContext = null;

/**
 * Get or create AudioContext (handles browser autoplay policy)
 */
export function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
}

// Automatically initialize audio context on the first user interaction
const setupAudioOnInteraction = () => {
  initAudio();
  ['click', 'touchstart', 'keydown'].forEach(event => 
    document.removeEventListener(event, setupAudioOnInteraction)
  );
};

['click', 'touchstart', 'keydown'].forEach(event => 
  document.addEventListener(event, setupAudioOnInteraction, { once: true })
);


/**
 * Play a single tone
 */
function playTone(ctx, frequency, startTime, duration, volume = 0.3) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, startTime);

  // Envelope: quick attack, sustain, gentle release
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.05);
  gainNode.gain.setValueAtTime(volume, startTime + duration - 0.1);
  gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

/**
 * Play a pleasant 3-note notification chime
 * Uses Web Audio API - no external files needed
 */
export function playNotificationSound() {
  try {
    const ctx = initAudio();
    const now = ctx.currentTime;

    // Pleasant ascending chime: C5 -> E5 -> G5
    playTone(ctx, 523.25, now, 0.2, 0.25);       // C5
    playTone(ctx, 659.25, now + 0.2, 0.2, 0.25); // E5
    playTone(ctx, 783.99, now + 0.4, 0.4, 0.2);  // G5 (longer)
  } catch (e) {
    console.warn('Could not play notification sound:', e);
  }
}
