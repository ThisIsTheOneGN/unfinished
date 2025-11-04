// LocalStorage keys
const PROGRESS_KEY = 'familyguy_progress';
const PREFERENCES_KEY = 'familyguy_preferences';

export interface WatchProgress {
  season: number;
  episode: number;
  timestamp: number; // seconds into the episode
  lastWatched: number; // unix timestamp
}

export interface UserPreferences {
  volume: number;
  nightMode: boolean;
  shuffleMode: boolean;
  excludedSeasons: number[];
  lightRainVolume: number;
  heavyRainVolume: number;
  lightRainEnabled: boolean;
  heavyRainEnabled: boolean;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  volume: 75,
  nightMode: false,
  shuffleMode: false,
  excludedSeasons: [],
  lightRainVolume: 50,
  heavyRainVolume: 50,
  lightRainEnabled: false,
  heavyRainEnabled: false,
};

export function saveProgress(progress: WatchProgress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
}

export function getProgress(): WatchProgress | null {
  try {
    const data = localStorage.getItem(PROGRESS_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load progress:', error);
    return null;
  }
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(PROGRESS_KEY);
  } catch (error) {
    console.error('Failed to clear progress:', error);
  }
}

export function savePreferences(preferences: Partial<UserPreferences>): void {
  try {
    const current = getPreferences();
    const updated = { ...current, ...preferences };
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save preferences:', error);
  }
}

export function getPreferences(): UserPreferences {
  try {
    const data = localStorage.getItem(PREFERENCES_KEY);
    return data ? { ...DEFAULT_PREFERENCES, ...JSON.parse(data) } : DEFAULT_PREFERENCES;
  } catch (error) {
    console.error('Failed to load preferences:', error);
    return DEFAULT_PREFERENCES;
  }
}
