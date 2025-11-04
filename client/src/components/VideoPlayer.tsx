import { Card } from "@/components/ui/card";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { saveProgress, getProgress } from "@/lib/storage";
import type { Episode } from "@shared/episodes";

interface VideoPlayerProps {
  episode: Episode;
  onEpisodeEnd?: () => void;
  shouldPause?: boolean;
}

export default function VideoPlayer({ episode, onEpisodeEnd, shouldPause }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(episode.duration);
  const [showAutoPlayCountdown, setShowAutoPlayCountdown] = useState(false);
  const [autoPlaySeconds, setAutoPlaySeconds] = useState(5);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressSaveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load saved progress for this episode
  useEffect(() => {
    const progress = getProgress();
    if (progress && progress.season === episode.season && progress.episode === episode.episode) {
      if (videoRef.current) {
        videoRef.current.currentTime = progress.timestamp;
      }
      setCurrentTime(progress.timestamp);
    } else {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
      setCurrentTime(0);
    }
    setShowAutoPlayCountdown(false);
  }, [episode]);

  // Handle external pause requests (e.g., from sleep timer)
  useEffect(() => {
    if (shouldPause && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [shouldPause]);

  // Save progress periodically while playing
  useEffect(() => {
    if (isPlaying) {
      progressSaveIntervalRef.current = setInterval(() => {
        if (videoRef.current) {
          const time = videoRef.current.currentTime;
          saveProgress({
            season: episode.season,
            episode: episode.episode,
            timestamp: time,
            lastWatched: Date.now(),
          });
        }
      }, 5000); // Save every 5 seconds
    }

    return () => {
      if (progressSaveIntervalRef.current) {
        clearInterval(progressSaveIntervalRef.current);
      }
    };
  }, [isPlaying, episode]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (autoPlayTimeoutRef.current) {
        clearInterval(autoPlayTimeoutRef.current);
      }
      if (progressSaveIntervalRef.current) {
        clearInterval(progressSaveIntervalRef.current);
      }
    };
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      const dur = videoRef.current.duration || episode.duration;
      setCurrentTime(time);
      setDuration(dur);

      // Check if episode is ending (5 seconds before end)
      if (time >= dur - 5 && !showAutoPlayCountdown && onEpisodeEnd) {
        setShowAutoPlayCountdown(true);
        startAutoPlayCountdown();
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (autoPlayTimeoutRef.current) {
      clearInterval(autoPlayTimeoutRef.current);
    }
    // Auto-play countdown should have triggered by now, but as failsafe
    if (!showAutoPlayCountdown) {
      onEpisodeEnd?.();
    }
  };

  const startAutoPlayCountdown = () => {
    setAutoPlaySeconds(5);
    let countdown = 5;
    
    const countdownInterval = setInterval(() => {
      countdown -= 1;
      setAutoPlaySeconds(countdown);
      
      if (countdown <= 0) {
        clearInterval(countdownInterval);
        setShowAutoPlayCountdown(false);
        onEpisodeEnd?.();
      }
    }, 1000);
    
    autoPlayTimeoutRef.current = countdownInterval as any;
  };

  const cancelAutoPlay = () => {
    if (autoPlayTimeoutRef.current) {
      clearInterval(autoPlayTimeoutRef.current);
      autoPlayTimeoutRef.current = null;
    }
    setShowAutoPlayCountdown(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value[0] / 100;
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (value: number[]) => {
    if (videoRef.current) {
      const newTime = (value[0] / 100) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      saveProgress({
        season: episode.season,
        episode: episode.episode,
        timestamp: newTime,
        lastWatched: Date.now(),
      });
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="aspect-video bg-secondary relative group">
          {/* Video element (hidden as we don't have real video sources) */}
          <video
            ref={videoRef}
            className="hidden"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onLoadedMetadata={() => {
              if (videoRef.current) {
                setDuration(videoRef.current.duration || episode.duration);
                videoRef.current.volume = volume[0] / 100;
              }
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-muted-foreground text-center">
              <div className="text-6xl mb-4">📺</div>
              <div className="text-lg">Video Player Placeholder</div>
              <div className="text-sm mt-2">S{episode.season} E{episode.episode}</div>
              <div className="text-xs mt-1 text-muted-foreground/70">
                {isPlaying ? 'Playing...' : 'Paused'}
              </div>
            </div>
          </div>
          
          {showAutoPlayCountdown && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/90 z-20">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-4">
                  Next Episode in {autoPlaySeconds}s
                </div>
                <Button
                  onClick={cancelAutoPlay}
                  variant="outline"
                  data-testid="button-cancel-autoplay"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="space-y-3">
              <Slider
                value={[progress]}
                onValueChange={handleProgressChange}
                max={100}
                step={0.1}
                className="cursor-pointer"
                data-testid="slider-progress"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlayPause}
                    data-testid="button-play-pause"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMute}
                      data-testid="button-mute"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </Button>
                    <div className="w-24">
                      <Slider
                        value={volume}
                        onValueChange={handleVolumeChange}
                        max={100}
                        step={1}
                        data-testid="slider-volume"
                      />
                    </div>
                  </div>
                  
                  <span className="text-sm text-foreground ml-4">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleFullscreen}
                  data-testid="button-fullscreen"
                >
                  <Maximize className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">{episode.title}</h2>
        <p className="text-muted-foreground mt-1">Season {episode.season}, Episode {episode.episode}</p>
      </div>
    </div>
  );
}
