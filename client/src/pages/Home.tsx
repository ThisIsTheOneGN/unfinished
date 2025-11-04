import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SeasonSection from "@/components/SeasonSection";
import VideoPlayer from "@/components/VideoPlayer";
import QuickActions from "@/components/QuickActions";
import SupportersPanel from "@/components/SupportersPanel";
import Footer from "@/components/Footer";
import SleepTimerModal from "@/components/SleepTimerModal";
import { getEpisode, getNextEpisode, getPreviousEpisode, getRandomEpisode } from "@shared/episodes";
import { getProgress, clearProgress, getPreferences, savePreferences } from "@/lib/storage";
import type { Episode } from "@shared/episodes";

export default function Home() {
  const [nightMode, setNightMode] = useState(false);
  const [shuffleMode, setShuffleMode] = useState(false);
  const [sleepTimerOpen, setSleepTimerOpen] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [excludedSeasons, setExcludedSeasons] = useState<number[]>([]);
  const [isPlaybackPaused, setIsPlaybackPaused] = useState(false);
  const videoPlayerRef = useRef<{ pause: () => void } | null>(null);

  // Load preferences and last watched episode on mount
  useEffect(() => {
    const prefs = getPreferences();
    setNightMode(prefs.nightMode);
    setShuffleMode(prefs.shuffleMode);
    setExcludedSeasons(prefs.excludedSeasons);

    const progress = getProgress();
    if (progress) {
      const episode = getEpisode(progress.season, progress.episode);
      if (episode) {
        setCurrentEpisode(episode);
      }
    }
  }, []);

  const handleResetProgress = () => {
    clearProgress();
    setCurrentEpisode(null);
  };

  const handleEpisodeClick = (season: number, episode: number) => {
    const episodeData = getEpisode(season, episode);
    if (episodeData) {
      setCurrentEpisode(episodeData);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentEpisode) {
      const next = getNextEpisode(currentEpisode.season, currentEpisode.episode);
      if (next) {
        setCurrentEpisode(next);
      }
    }
  };

  const handlePrevious = () => {
    if (currentEpisode) {
      const prev = getPreviousEpisode(currentEpisode.season, currentEpisode.episode);
      if (prev) {
        setCurrentEpisode(prev);
      }
    }
  };

  const handleRandom = () => {
    const randomEp = getRandomEpisode(shuffleMode ? excludedSeasons : []);
    setCurrentEpisode(randomEp);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleNightMode = () => {
    const newValue = !nightMode;
    setNightMode(newValue);
    savePreferences({ nightMode: newValue });
  };

  const handleToggleShuffle = () => {
    const newValue = !shuffleMode;
    setShuffleMode(newValue);
    savePreferences({ shuffleMode: newValue });
  };

  const handleSleepTimerEnd = () => {
    setIsPlaybackPaused(true);
  };

  return (
    <div className={`min-h-screen ${nightMode ? 'brightness-90 contrast-90' : ''}`}>
      {nightMode && (
        <div className="fixed inset-0 bg-orange-500/10 pointer-events-none z-40" />
      )}
      
      <Header
        onResetProgress={handleResetProgress}
        onOpenSleepTimer={() => setSleepTimerOpen(true)}
        nightMode={nightMode}
        onToggleNightMode={handleToggleNightMode}
      />
      
      {!currentEpisode ? (
        <>
          <HeroSection />
          <SeasonSection onEpisodeClick={handleEpisodeClick} />
        </>
      ) : (
        <div className="pt-28 pb-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-3">
                <QuickActions
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  onRandom={handleRandom}
                  shuffleMode={shuffleMode}
                  onToggleShuffle={handleToggleShuffle}
                />
              </div>
              
              <div className="lg:col-span-6">
                <VideoPlayer
                  episode={currentEpisode}
                  onEpisodeEnd={handleNext}
                  shouldPause={isPlaybackPaused}
                />
              </div>
              
              <div className="lg:col-span-3">
                <SupportersPanel />
              </div>
            </div>
            
            <div className="mt-12">
              <SeasonSection onEpisodeClick={handleEpisodeClick} />
            </div>
          </div>
        </div>
      )}
      
      <Footer />
      
      <SleepTimerModal
        open={sleepTimerOpen}
        onOpenChange={setSleepTimerOpen}
        onTimerEnd={handleSleepTimerEnd}
      />
    </div>
  );
}
