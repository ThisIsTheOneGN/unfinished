import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart } from "lucide-react";

export default function SupportersPanel() {
  const supporters = [
    "John Smith",
    "Sarah Johnson",
    "Michael Chen",
    "Emily Davis",
    "David Wilson",
    "Jessica Brown",
    "Christopher Lee",
    "Amanda Taylor",
    "Matthew Anderson",
    "Jennifer Martinez",
  ];

  return (
    <Card className="p-6 h-[600px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg text-foreground">Supporters</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Thank you to everyone who supports this project!
      </p>
      
      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {supporters.map((supporter, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-secondary hover-elevate"
              data-testid={`supporter-${index}`}
            >
              <p className="text-sm font-medium text-foreground">{supporter}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
