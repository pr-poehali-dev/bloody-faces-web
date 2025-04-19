import React, { useEffect, useState } from "react";

type GlitchEffectProps = {
  intensity?: "low" | "medium" | "high";
};

const GlitchEffect: React.FC<GlitchEffectProps> = ({ intensity = "medium" }) => {
  const [active, setActive] = useState(false);
  
  useEffect(() => {
    const intensityValues = {
      low: { min: 5000, max: 10000, duration: 100 },
      medium: { min: 3000, max: 7000, duration: 200 },
      high: { min: 1000, max: 4000, duration: 300 }
    };
    
    const settings = intensityValues[intensity];
    
    const glitchInterval = setInterval(() => {
      setActive(true);
      setTimeout(() => {
        setActive(false);
      }, settings.duration);
    }, settings.min + Math.random() * (settings.max - settings.min));
    
    return () => clearInterval(glitchInterval);
  }, [intensity]);
  
  if (!active) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div className="absolute inset-0 bg-horror-blood opacity-20" />
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `linear-gradient(rgba(255, 0, 0, 0.1) 2px, transparent 2px), 
                            linear-gradient(90deg, rgba(255, 0, 0, 0.1) 2px, transparent 2px)`,
          backgroundSize: '50px 50px',
          backgroundPosition: '-10px -10px',
          mixBlendMode: 'overlay'
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-shake text-red-600 horror-text text-8xl opacity-30">
          ☠︎
        </div>
      </div>
    </div>
  );
};

export default GlitchEffect;
