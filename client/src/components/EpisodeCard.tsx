import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

interface EpisodeCardProps {
  season: number;
  episode: number;
  title: string;
  progress?: number;
  onClick: () => void;
}

export default function EpisodeCard({ 
  season, 
  episode, 
  title, 
  progress = 0, 
  onClick 
}: EpisodeCardProps) {
  return (
    <Card
      className="group relative overflow-hidden cursor-pointer hover-elevate active-elevate-2"
      onClick={onClick}
      data-testid={`card-episode-${season}-${episode}`}
    >
      <div className="aspect-video bg-secondary flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Play className="w-12 h-12 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="p-4">
        <div className="text-sm text-muted-foreground mb-1">
          S{season} E{episode}
        </div>
        <h3 className="font-semibold text-foreground line-clamp-2">
          {title}
        </h3>
      </div>
      
      {progress > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </Card>
  );
}
