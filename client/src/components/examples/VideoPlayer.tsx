import VideoPlayer from '../VideoPlayer';

export default function VideoPlayerExample() {
  const mockEpisode = {
    season: 1,
    episode: 1,
    title: "Death Has a Shadow",
    duration: 1320,
  };

  return (
    <div className="p-8">
      <VideoPlayer
        episode={mockEpisode}
      />
    </div>
  );
}
