// Audio manager for rain sounds using Web Audio API

class AudioManager {
  private lightRainAudio: HTMLAudioElement | null = null;
  private heavyRainAudio: HTMLAudioElement | null = null;

  constructor() {
    // Create audio elements for rain sounds
    // In a real app, these would point to actual rain sound files
    // For now, we'll create silent audio elements as placeholders
    this.lightRainAudio = new Audio();
    this.heavyRainAudio = new Audio();
    
    // Loop the sounds
    this.lightRainAudio.loop = true;
    this.heavyRainAudio.loop = true;
    
    // Set initial volume
    this.lightRainAudio.volume = 0.5;
    this.heavyRainAudio.volume = 0.5;
  }

  playLightRain(volume: number = 0.5) {
    if (this.lightRainAudio) {
      this.lightRainAudio.volume = volume / 100;
      this.lightRainAudio.play().catch(console.error);
    }
  }

  stopLightRain() {
    if (this.lightRainAudio) {
      this.lightRainAudio.pause();
      this.lightRainAudio.currentTime = 0;
    }
  }

  setLightRainVolume(volume: number) {
    if (this.lightRainAudio) {
      this.lightRainAudio.volume = volume / 100;
    }
  }

  playHeavyRain(volume: number = 0.5) {
    if (this.heavyRainAudio) {
      this.heavyRainAudio.volume = volume / 100;
      this.heavyRainAudio.play().catch(console.error);
    }
  }

  stopHeavyRain() {
    if (this.heavyRainAudio) {
      this.heavyRainAudio.pause();
      this.heavyRainAudio.currentTime = 0;
    }
  }

  setHeavyRainVolume(volume: number) {
    if (this.heavyRainAudio) {
      this.heavyRainAudio.volume = volume / 100;
    }
  }

  stopAll() {
    this.stopLightRain();
    this.stopHeavyRain();
  }
}

export const audioManager = new AudioManager();
