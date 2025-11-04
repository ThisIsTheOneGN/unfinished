import Header from '../Header';

export default function HeaderExample() {
  return (
    <Header
      onResetProgress={() => console.log('Reset progress')}
      onOpenSleepTimer={() => console.log('Open sleep timer')}
      nightMode={false}
      onToggleNightMode={() => console.log('Toggle night mode')}
    />
  );
}
