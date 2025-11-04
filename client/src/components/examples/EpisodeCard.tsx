import EpisodeCard from '../EpisodeCard';

export default function EpisodeCardExample() {
  return (
    <div className="grid grid-cols-3 gap-4 p-8">
      <EpisodeCard
        season={1}
        episode={1}
        title="Death Has a Shadow"
        onClick={() => console.log('Episode clicked')}
      />
      <EpisodeCard
        season={1}
        episode={2}
        title="I Never Met the Dead Man"
        progress={45}
        onClick={() => console.log('Episode clicked')}
      />
      <EpisodeCard
        season={1}
        episode={3}
        title="Chitty Chitty Death Bang"
        progress={100}
        onClick={() => console.log('Episode clicked')}
      />
    </div>
  );
}
