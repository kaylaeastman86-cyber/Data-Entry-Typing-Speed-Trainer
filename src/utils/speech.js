// speech.js — TTS utility for Data-Entry Typing Speed Trainer
// Fixes:
//   1. Chrome 15-second cutoff → sentence-chunking + sequential queue
//   2. Chrome background-tab pause → keep-alive resume interval
//   3. Consistent clear female voice with priority fallback chain

let keepAliveInterval = null;

/**
 * Speak `text` aloud using the Web Speech API.
 * Splits on sentence boundaries to avoid Chrome's ~15-second cutoff bug.
 * @param {string} text - The text to speak.
 * @param {function} [onEnd] - Optional callback fired when speech finishes.
 */
export function speakText(text, onEnd) {
  if (!('speechSynthesis' in window)) return;

  // Cancel any existing speech and clear previous keep-alive
  stopSpeech();

  // Split into sentences to avoid Chrome's 15-second cutoff bug
  const sentences = text.match(/[^.!?]+[.!?]*/g) || [text];
  let index = 0;

  // Keep-alive: Chrome pauses speechSynthesis in background tabs
  keepAliveInterval = setInterval(() => {
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
  }, 10000);

  function speakNext() {
    if (index >= sentences.length) {
      clearInterval(keepAliveInterval);
      keepAliveInterval = null;
      if (onEnd) onEnd();
      return;
    }
    const chunk = sentences[index].trim();
    if (!chunk) { index++; speakNext(); return; }

    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.voice = getBestFemaleVoice();
    utterance.rate = 0.92;   // slightly slower for clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onend = () => {
      index++;
      speakNext();
    };
    utterance.onerror = () => {
      index++;
      speakNext(); // skip failed chunk, keep going
    };

    window.speechSynthesis.speak(utterance);
  }

  speakNext();
}

/**
 * Stop all speech immediately and clear the keep-alive timer.
 */
export function stopSpeech() {
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval);
    keepAliveInterval = null;
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Returns the best available female English voice.
 * Priority order covers Windows, macOS, and Chrome fallbacks.
 * @returns {SpeechSynthesisVoice|null}
 */
function getBestFemaleVoice() {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  // Priority order: best clear female English voices
  const preferred = [
    'Microsoft Zira - English (United States)',   // Windows — very clear
    'Microsoft Jenny - English (United States)',   // Windows 11 — natural
    'Samantha',                                    // macOS — natural female
    'Google US English',                           // Chrome fallback
    'Karen',                                       // macOS Australian
    'Moira',                                       // macOS Irish
  ];

  for (const name of preferred) {
    const match = voices.find(v => v.name === name);
    if (match) return match;
  }

  // Fallback: first English voice with a female-sounding name
  const enFemale = voices.find(v =>
    v.lang.startsWith('en') &&
    /female|woman|girl|zira|samantha|karen|moira|jenny|aria|emma|lisa/i.test(v.name)
  );
  if (enFemale) return enFemale;

  // Last resort: any English voice
  return voices.find(v => v.lang.startsWith('en')) || voices[0] || null;
}

/**
 * Preload the voice list (Chrome loads voices asynchronously on first access).
 * Call this once at app/component mount so the first utterance gets a real voice,
 * not the default robotic fallback.
 * @returns {Promise<SpeechSynthesisVoice[]>}
 */
export function initSpeech() {
  return new Promise(resolve => {
    if (!('speechSynthesis' in window)) { resolve([]); return; }
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) { resolve(voices); return; }
    window.speechSynthesis.onvoiceschanged = () =>
      resolve(window.speechSynthesis.getVoices());
  });
}
