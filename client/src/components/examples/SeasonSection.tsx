import SeasonSection from '../SeasonSection';

export default function SeasonSectionExample() {
  return (
    <SeasonSection
      onEpisodeClick={(season, episode) => 
        console.log(`Episode clicked: S${season}E${episode}`)
      }
    />
  );
}
