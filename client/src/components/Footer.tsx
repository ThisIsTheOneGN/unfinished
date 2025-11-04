import { Button } from "@/components/ui/button";
import { SiYoutube, SiDiscord, SiKick } from "react-icons/si";
import { DollarSign } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: SiYoutube, label: "YouTube", href: "#" },
    { icon: SiDiscord, label: "Discord", href: "#" },
    { icon: SiKick, label: "Kick", href: "#" },
  ];

  return (
    <footer className="mt-24 border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-xl text-primary mb-3">THIS IS THE ONE</h3>
            <p className="text-sm text-muted-foreground">
              The ultimate Family Guy streaming experience. Watch, relax, and enjoy.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-3">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Auto-play & Shuffle</li>
              <li>Progress Memory</li>
              <li>Rain Sounds</li>
              <li>Night Mode & Sleep Timer</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-3">Connect & Support</h4>
            <div className="flex gap-2 flex-wrap">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Button
                    key={link.label}
                    variant="outline"
                    size="icon"
                    asChild
                    data-testid={`link-${link.label.toLowerCase()}`}
                  >
                    <a href={link.href} aria-label={link.label}>
                      <Icon className="w-4 h-4" />
                    </a>
                  </Button>
                );
              })}
              <Button
                variant="outline"
                size="icon"
                asChild
                data-testid="link-paypal"
              >
                <a href="#" aria-label="PayPal">
                  <DollarSign className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} This Is The One. Made with love for Family Guy fans.</p>
        </div>
      </div>
    </footer>
  );
}
