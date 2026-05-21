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
 * Play a text message using the Web Speech API (Text-to-Speech)
 */
export function playVoiceMessage(message) {
  try {
    // We still initialize audio context just in case, though SpeechSynthesis is separate
    initAudio();
    
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      // Optionally find a nice English voice
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.startsWith('en-') && !v.localService);
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Speech Synthesis API not supported in this browser.');
    }
  } catch (e) {
    console.warn('Could not play voice message:', e);
  }
}
