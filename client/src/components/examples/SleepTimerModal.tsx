import SleepTimerModal from '../SleepTimerModal';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function SleepTimerModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Open Sleep Timer</Button>
      <SleepTimerModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
