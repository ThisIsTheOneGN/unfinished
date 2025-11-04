import { Button } from "@/components/ui/button";
import { Moon, RotateCcw, Timer } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onResetProgress: () => void;
  onOpenSleepTimer: () => void;
  nightMode: boolean;
  onToggleNightMode: () => void;
}

export default function Header({ 
  onResetProgress, 
  onOpenSleepTimer, 
  nightMode, 
  onToggleNightMode 
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-primary">THIS IS THE ONE</div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="default"
            onClick={onResetProgress}
            data-testid="button-reset-progress"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Progress
          </Button>
          
          <Button
            variant="outline"
            size="default"
            onClick={onOpenSleepTimer}
            data-testid="button-sleep-timer"
          >
            <Timer className="w-4 h-4 mr-2" />
            Sleep Timer
          </Button>
          
          <Button
            variant={nightMode ? "default" : "outline"}
            size="icon"
            onClick={onToggleNightMode}
            data-testid="button-night-mode"
          >
            <Moon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
