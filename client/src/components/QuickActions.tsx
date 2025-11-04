import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Shuffle, SkipBack, SkipForward, Cloud, CloudRain } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { audioManager } from "@/lib/audioManager";
import { savePreferences, getPreferences } from "@/lib/storage";

interface QuickActionsProps {
  onPrevious: () => void;
  onNext: () => void;
  onRandom: () => void;
  shuffleMode: boolean;
  onToggleShuffle: () => void;
}

export default function QuickActions({
  onPrevious,
  onNext,
  onRandom,
  shuffleMode,
  onToggleShuffle,
}: QuickActionsProps) {
  const [lightRain, setLightRain] = useState(false);
  const [heavyRain, setHeavyRain] = useState(false);
  const [lightVolume, setLightVolume] = useState([50]);
  const [heavyVolume, setHeavyVolume] = useState([50]);

  // Load saved rain preferences and restore state
  useEffect(() => {
    const prefs = getPreferences();
    setLightVolume([prefs.lightRainVolume]);
    setHeavyVolume([prefs.heavyRainVolume]);
    setLightRain(prefs.lightRainEnabled);
    setHeavyRain(prefs.heavyRainEnabled);
    
    // Restore audio playback if it was enabled
    if (prefs.lightRainEnabled) {
      audioManager.playLightRain(prefs.lightRainVolume);
    }
    if (prefs.heavyRainEnabled) {
      audioManager.playHeavyRain(prefs.heavyRainVolume);
    }

    // Cleanup on unmount
    return () => {
      audioManager.stopAll();
    };
  }, []);

  const handleToggleLightRain = () => {
    const newState = !lightRain;
    setLightRain(newState);
    savePreferences({ lightRainEnabled: newState });
    if (newState) {
      audioManager.playLightRain(lightVolume[0]);
    } else {
      audioManager.stopLightRain();
    }
  };

  const handleToggleHeavyRain = () => {
    const newState = !heavyRain;
    setHeavyRain(newState);
    savePreferences({ heavyRainEnabled: newState });
    if (newState) {
      audioManager.playHeavyRain(heavyVolume[0]);
    } else {
      audioManager.stopHeavyRain();
    }
  };

  const handleLightVolumeChange = (value: number[]) => {
    setLightVolume(value);
    audioManager.setLightRainVolume(value[0]);
    savePreferences({ lightRainVolume: value[0] });
  };

  const handleHeavyVolumeChange = (value: number[]) => {
    setHeavyVolume(value);
    audioManager.setHeavyRainVolume(value[0]);
    savePreferences({ heavyRainVolume: value[0] });
  };

  return (
    <Card className="p-6 space-y-4">
      <h3 className="font-semibold text-lg text-foreground mb-4">Quick Actions</h3>
      
      <div className="space-y-3">
        <Button
          variant={shuffleMode ? "default" : "outline"}
          className="w-full justify-start"
          onClick={onToggleShuffle}
          data-testid="button-shuffle"
        >
          <Shuffle className="w-4 h-4 mr-2" />
          Shuffle Mode
          {shuffleMode && <Badge className="ml-auto" variant="secondary">ON</Badge>}
        </Button>
        
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={onRandom}
          data-testid="button-random"
        >
          <Shuffle className="w-4 h-4 mr-2" />
          Random Episode
        </Button>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onPrevious}
            data-testid="button-previous"
          >
            <SkipBack className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={onNext}
            data-testid="button-next"
          >
            <SkipForward className="w-4 h-4 mr-2" />
            Next
          </Button>
        </div>
      </div>
      
      <div className="pt-4 border-t border-border space-y-4">
        <h4 className="font-medium text-sm text-foreground">Rain Sounds</h4>
        
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Button
                variant={lightRain ? "default" : "outline"}
                size="sm"
                onClick={handleToggleLightRain}
                data-testid="button-light-rain"
              >
                <Cloud className="w-4 h-4 mr-2" />
                Light Rain
              </Button>
            </div>
            {lightRain && (
              <div className="pl-2">
                <Slider
                  value={lightVolume}
                  onValueChange={handleLightVolumeChange}
                  max={100}
                  step={1}
                  data-testid="slider-light-rain"
                />
              </div>
            )}
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <Button
                variant={heavyRain ? "default" : "outline"}
                size="sm"
                onClick={handleToggleHeavyRain}
                data-testid="button-heavy-rain"
              >
                <CloudRain className="w-4 h-4 mr-2" />
                Heavy Rain
              </Button>
            </div>
            {heavyRain && (
              <div className="pl-2">
                <Slider
                  value={heavyVolume}
                  onValueChange={handleHeavyVolumeChange}
                  max={100}
                  step={1}
                  data-testid="slider-heavy-rain"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
