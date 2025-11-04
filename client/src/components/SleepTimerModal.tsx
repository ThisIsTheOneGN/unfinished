import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface SleepTimerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTimerEnd?: () => void;
}

export default function SleepTimerModal({ open, onOpenChange, onTimerEnd }: SleepTimerModalProps) {
  const [activeTimer, setActiveTimer] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const timers = [
    { label: "15 Minutes", minutes: 15 },
    { label: "30 Minutes", minutes: 30 },
    { label: "1 Hour", minutes: 60 },
    { label: "2 Hours", minutes: 120 },
  ];

  useEffect(() => {
    if (activeTimer && remainingSeconds > 0) {
      timerRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            handleTimerEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [activeTimer, remainingSeconds]);

  const handleSetTimer = (minutes: number) => {
    setActiveTimer(minutes);
    setRemainingSeconds(minutes * 60);
  };

  const handleTimerEnd = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setActiveTimer(null);
    setRemainingSeconds(0);
    onTimerEnd?.();
    onOpenChange(false);
  };

  const handleCancel = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setActiveTimer(null);
    setRemainingSeconds(0);
  };

  const formatTimeRemaining = (): string => {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-primary" />
            Sleep Timer
          </DialogTitle>
          <DialogDescription>
            Set a timer to automatically pause playback
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {activeTimer ? (
            <div className="text-center py-8">
              <div className="text-5xl font-bold text-primary mb-4">
                {formatTimeRemaining()}
              </div>
              <p className="text-muted-foreground mb-6">
                Playback will pause automatically
              </p>
              <Button
                variant="destructive"
                onClick={handleCancel}
                data-testid="button-cancel-timer"
              >
                Cancel Timer
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {timers.map((timer) => (
                <Button
                  key={timer.minutes}
                  variant="outline"
                  className="h-24"
                  onClick={() => handleSetTimer(timer.minutes)}
                  data-testid={`button-timer-${timer.minutes}`}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {timer.minutes < 60 ? timer.minutes : timer.minutes / 60}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {timer.minutes < 60 ? 'Minutes' : 'Hour(s)'}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
