import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const VIBE_RESULTS = [
  { text: "Goblin Mode Engaged", emoji: "👹", description: "You're operating on pure chaos energy" },
  { text: "Caffeinated Chaos", emoji: "☕", description: "Too much coffee, too little sleep" },
  { text: "Sentient Blanket", emoji: "🛏️", description: "Maximum comfort, minimum effort" },
  { text: "Zero Thoughts, Only Vibes", emoji: "🌙", description: "Brain has left the building" },
  { text: "Unhinged Academic", emoji: "📚", description: "Smart but make it feral" },
  { text: "Cryptid Energy", emoji: "👻", description: "Mysterious forest creature vibes" },
  { text: "Main Character Syndrome", emoji: "✨", description: "The world revolves around you today" },
  { text: "Feral Cat Mode", emoji: "🐱", description: "Cute but will bite" },
  { text: "Overthinker Supreme", emoji: "🧠", description: "Thinking about thinking about thinking" },
  { text: "Chaos Gremlin", emoji: "😈", description: "Pure chaotic neutral energy" },
  { text: "Sleepy Scholar", emoji: "😴", description: "Wise but needs a nap" },
  { text: "Meme Lord", emoji: "👑", description: "Peak internet brain achieved" },
  { text: "Anxious Butterfly", emoji: "🦋", description: "Beautiful but panicking" },
  { text: "Mysterious Shrimp", emoji: "🦐", description: "Small but enigmatic" },
  { text: "Unhinged Optimist", emoji: "🌈", description: "Aggressively positive vibes only" }
];

const EXPLOSION_EMOJIS = ["✨", "🎉", "💫", "🌟", "⭐", "🎊", "💥", "🔥", "💖", "🌈"];

interface EmojiParticle {
  id: number;
  emoji: string;
  left: number;
  delay: number;
}

export const VibeChecker = () => {
  const [currentVibe, setCurrentVibe] = useState<typeof VIBE_RESULTS[0] | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [particles, setParticles] = useState<EmojiParticle[]>([]);

  const createEmojiExplosion = useCallback(() => {
    const newParticles: EmojiParticle[] = [];
    for (let i = 0; i < 12; i++) {
      newParticles.push({
        id: Date.now() + i,
        emoji: EXPLOSION_EMOJIS[Math.floor(Math.random() * EXPLOSION_EMOJIS.length)],
        left: Math.random() * 100,
        delay: Math.random() * 0.5
      });
    }
    setParticles(newParticles);
    
    // Clear particles after animation
    setTimeout(() => setParticles([]), 3000);
  }, []);

  const checkVibe = useCallback(() => {
    if (isChecking) return;
    
    setIsChecking(true);
    setCurrentVibe(null);
    
    // Dramatic pause for effect
    setTimeout(() => {
      const randomVibe = VIBE_RESULTS[Math.floor(Math.random() * VIBE_RESULTS.length)];
      setCurrentVibe(randomVibe);
      setIsChecking(false);
      createEmojiExplosion();
    }, 1500);
  }, [isChecking, createEmojiExplosion]);

  const recheckVibe = useCallback(() => {
    setCurrentVibe(null);
    setParticles([]);
    checkVibe();
  }, [checkVibe]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl animate-float" style={{ animationDelay: '0s' }}>✨</div>
        <div className="absolute top-40 right-20 text-4xl animate-float" style={{ animationDelay: '1s' }}>🌙</div>
        <div className="absolute bottom-32 left-20 text-5xl animate-float" style={{ animationDelay: '2s' }}>⭐</div>
        <div className="absolute bottom-20 right-10 text-4xl animate-float" style={{ animationDelay: '0.5s' }}>🎭</div>
        <div className="absolute top-1/3 left-1/4 text-3xl animate-float" style={{ animationDelay: '1.5s' }}>🦋</div>
        <div className="absolute top-2/3 right-1/4 text-3xl animate-float" style={{ animationDelay: '2.5s' }}>🌈</div>
      </div>

      {/* Emoji explosion particles */}
      <div className="emoji-explosion">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="emoji"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`
            }}
          >
            {particle.emoji}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="text-center z-10 max-w-4xl w-full">
        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 font-fredoka">
          <span className="vibe-result">Vibe Check-o-Meter</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 text-foreground/80 font-comic">
          Scientifically inaccurate vibe detection since 2024
        </p>

        {/* Main interaction area */}
        <Card className="p-8 md:p-12 mb-8 bg-card/90 backdrop-blur-sm border-2 border-primary/20 shadow-2xl">
          {isChecking ? (
            <div className="text-center">
              <div className="text-6xl mb-6 animate-bounce">🔮</div>
              <p className="text-2xl font-fredoka text-primary animate-pulse">
                Scanning your energy field...
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          ) : currentVibe ? (
            <div className="text-center">
              <div className="text-8xl md:text-9xl mb-6 animate-bounce">{currentVibe.emoji}</div>
              <h2 className="vibe-result mb-4">{currentVibe.text}</h2>
              <p className="text-xl md:text-2xl text-foreground/70 mb-8 font-comic">
                {currentVibe.description}
              </p>
              <Button 
                onClick={recheckVibe}
                className="vibe-button text-white"
                size="lg"
              >
                Re-check My Vibe ↻
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-8xl md:text-9xl mb-6 animate-float">🎭</div>
              <p className="text-xl md:text-2xl mb-8 text-foreground/70 font-comic">
                Ready to discover your current energy signature?
              </p>
              <Button 
                onClick={checkVibe}
                className="vibe-button text-white"
                size="lg"
              >
                Check My Vibe ✨
              </Button>
            </div>
          )}
        </Card>

        {/* Footer */}
        <footer className="text-center">
          <p className="text-lg font-comic text-foreground/60">
            ✨ Not medically accurate, but emotionally honest ✨
          </p>
          <p className="text-sm mt-2 text-foreground/40">
            Side effects may include: uncontrollable giggling, sudden self-awareness, or becoming one with your assigned vibe
          </p>
        </footer>
      </div>
    </div>
  );
};