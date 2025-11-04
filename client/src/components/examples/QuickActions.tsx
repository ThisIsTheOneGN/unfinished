import QuickActions from '../QuickActions';

export default function QuickActionsExample() {
  return (
    <div className="p-8 max-w-sm">
      <QuickActions
        onPrevious={() => console.log('Previous')}
        onNext={() => console.log('Next')}
        onRandom={() => console.log('Random')}
        shuffleMode={false}
        onToggleShuffle={() => console.log('Toggle shuffle')}
      />
    </div>
  );
}
