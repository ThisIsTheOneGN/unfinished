import { Play, Shuffle, CloudRain, Moon, Clock, Zap } from "lucide-react";

export default function HeroSection() {
  const features = [
    { icon: Play, text: "Auto-play next episode" },
    { icon: Shuffle, text: "Random episode shuffle" },
    { icon: CloudRain, text: "Ambient rain sounds" },
    { icon: Moon, text: "Night mode comfort" },
    { icon: Clock, text: "Sleep timer" },
    { icon: Zap, text: "No ads, no logins" },
  ];

  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
      
      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-6 text-foreground">
          Welcome to THIS IS THE ONE
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Your ultimate Family Guy streaming experience with smart features, no interruptions, and total control
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-card-border hover-elevate"
                data-testid={`feature-${index}`}
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{feature.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
