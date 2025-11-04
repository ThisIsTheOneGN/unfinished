import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EpisodeCard from "./EpisodeCard";
import { getEpisodesBySeasons, getAllSeasons } from "@shared/episodes";
import { getProgress } from "@/lib/storage";

interface SeasonSectionProps {
  onEpisodeClick: (season: number, episode: number) => void;
}

export default function SeasonSection({ onEpisodeClick }: SeasonSectionProps) {
  const seasons = getAllSeasons();
  const savedProgress = getProgress();
  
  const getEpisodeProgress = (season: number, episode: number): number => {
    if (!savedProgress) return 0;
    if (savedProgress.season === season && savedProgress.episode === episode) {
      const episodeData = getEpisodesBySeasons(season).find(ep => ep.episode === episode);
      if (episodeData) {
        return (savedProgress.timestamp / episodeData.duration) * 100;
      }
    }
    return 0;
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-foreground mb-8">Episode Library</h2>
      
      <Tabs defaultValue="1" className="w-full">
        <TabsList className="mb-8 flex-wrap h-auto gap-2">
          {seasons.map((season) => (
            <TabsTrigger
              key={season}
              value={season.toString()}
              data-testid={`tab-season-${season}`}
            >
              Season {season}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {seasons.map((season) => {
          const episodes = getEpisodesBySeasons(season);
          return (
            <TabsContent key={season} value={season.toString()}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {episodes.map((episode) => (
                  <EpisodeCard
                    key={`${episode.season}-${episode.episode}`}
                    season={episode.season}
                    episode={episode.episode}
                    title={episode.title}
                    progress={getEpisodeProgress(episode.season, episode.episode)}
                    onClick={() => onEpisodeClick(episode.season, episode.episode)}
                  />
                ))}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}
