import React from "react";

type HorrorFaceProps = {
  id: number;
  noise?: number;
  onScareClick: () => void;
};

const randomSymbols = () => {
  const symbols = "☠︎⚰︎⚱︎☢︎☣︎⚔︎⚒︎♰♱⛧⛥⛤∞⍾⌬⎔⎕⚝✞✟❍❖❇❈";
  return Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => 
    symbols[Math.floor(Math.random() * symbols.length)]
  ).join("");
};

const getRandomFilter = (id: number) => {
  const filters = [
    "contrast(150%) brightness(80%) sepia(30%) hue-rotate(320deg) saturate(200%)",
    "grayscale(60%) brightness(50%) contrast(200%) hue-rotate(340deg)",
    "blur(1px) contrast(180%) brightness(70%) sepia(60%) hue-rotate(310deg)",
    "saturate(250%) contrast(180%) hue-rotate(330deg) brightness(60%)",
    "invert(10%) sepia(90%) saturate(200%) hue-rotate(320deg) brightness(70%) contrast(170%)"
  ];
  return filters[id % filters.length];
};

const HorrorFace: React.FC<HorrorFaceProps> = ({ id, noise = 0.5, onScareClick }) => {
  const [glitchActive, setGlitchActive] = React.useState(false);
  const symbolText = React.useMemo(() => randomSymbols(), []);
  
  React.useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100 + Math.random() * 200);
    }, 2000 + Math.random() * 3000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  const filter = getRandomFilter(id);
  const bloodOpacity = 0.7 + (Math.random() * 0.3);
  
  const inlineStyles = {
    filter,
    transform: `scale(${0.8 + Math.random() * 0.4}) rotate(${-5 + Math.random() * 10}deg)`,
  };

  const noiseStyle = {
    backgroundImage: `url("data:image/png;base64,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")`,
    opacity: noise,
  };

  const handleClick = () => {
    onScareClick();
  };

  return (
    <div className="relative overflow-hidden m-4 group cursor-pointer" onClick={handleClick}>
      <div className={`relative z-10 flex flex-col items-center ${glitchActive ? 'animate-shake' : ''}`}>
        <div className="relative w-52 h-52 overflow-hidden rounded-sm border-4 border-horror-gore bloody">
          <div 
            className="w-full h-full bg-center bg-cover" 
            style={{
              backgroundImage: `url('/placeholder.svg')`,
              ...inlineStyles
            }}
          />
          <div 
            className="absolute inset-0 bg-horror-blood opacity-30 mix-blend-multiply"
            style={{ opacity: bloodOpacity }}
          />
          <div className="absolute inset-0" style={noiseStyle} />
        </div>
        <div 
          className="horror-text mt-2 text-xl text-red-600 opacity-90 animate-flicker glitchy" 
          data-text={symbolText}
        >
          {symbolText}
        </div>
      </div>
      <div className="absolute w-full h-full top-0 left-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
    </div>
  );
};

export default HorrorFace;
