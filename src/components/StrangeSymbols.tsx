import React from "react";

type StrangeSymbolsProps = {
  length?: number;
  variant?: "title" | "subtitle" | "text";
};

const symbolSets = {
  set1: "☠︎⚰︎⚱︎☢︎☣︎⚔︎⚒︎♰♱⛧⛥⛤∞⍾⌬⎔⎕⚝✞✟❍❖❇❈",
  set2: "▓▒░▒▓█▀▄▌▐▄▀█▝▘▗▖▙▟▛▜▞▚",
  set3: "Ψ̵̡̭̠̙̦̠̜͈̤̳̬͇̝̲̈̊́̆̐̌͒̀̀̍͋̊̈́̀͘̕͘͘͝Z̵̛̲̩̼͓̲̘̲̠̞̰̤̜̬̙͔̰͖̝̟̖̣̈́̆̅͗̿̀̿̍̔̄͌̕ͅȂ̶̢̛̛̺̜͓̪̪̞̲̜̱̫͍̽̏̓̅̅͒̐̐̃͂͑͛̚͝͝͠͝L̸̡̧̢̧͕̠̳̙̱̣̙̬̣̙̲̣̪̖̘̘̹̩̪̘̪̲̬̼̻̥̾̈́̽͗̎̐̎͗͐͌̐̇̉̆̋̎͐̓͑̚͝͝G̷̨̧̢͔̘̥̺̼͎̺̠̦̖̞̖̯͈̺̻̗̥̝̻̤̜̱̩̭̈́̎̓̄̎̽́̐̈́̎̃̏̑̓̒͊̿̄̌͋͜͝͠ͅO̸̢̢̡̧̱̮̲͙̱̥̘͕̰̹̝̦̥̘̞̟̟̦̙̣̼͋̈́̀̏̄̆̉̃̆̄̃͊͌͂̃͊͐͋̿̅̃͑̓̆͌͘͜͜͝"
};

const getRandomSymbols = (length: number): string => {
  const allSymbols = symbolSets.set1 + symbolSets.set2;
  return Array.from(
    { length },
    () => allSymbols[Math.floor(Math.random() * allSymbols.length)]
  ).join("");
};

const getGlitchText = (length: number): string => {
  const glitchChars = symbolSets.set3.split("");
  return glitchChars.slice(0, length).join("");
};

const StrangeSymbols: React.FC<StrangeSymbolsProps> = ({ 
  length = 10, 
  variant = "text" 
}) => {
  const [symbols, setSymbols] = React.useState("");
  const [glitching, setGlitching] = React.useState(false);
  
  React.useEffect(() => {
    setSymbols(getRandomSymbols(length));
    
    const glitchInterval = setInterval(() => {
      const shouldGlitch = Math.random() > 0.7;
      if (shouldGlitch) {
        setGlitching(true);
        setSymbols(getGlitchText(length));
        
        setTimeout(() => {
          setGlitching(false);
          setSymbols(getRandomSymbols(length));
        }, 100 + Math.random() * 300);
      }
    }, 2000 + Math.random() * 3000);
    
    return () => clearInterval(glitchInterval);
  }, [length]);
  
  const variantClasses = {
    title: "text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider",
    subtitle: "text-2xl sm:text-3xl font-semibold tracking-wide",
    text: "text-base sm:text-lg tracking-normal"
  };
  
  return (
    <div 
      className={`horror-text ${variantClasses[variant]} ${glitching ? 'text-red-700 animate-shake' : 'text-red-600'} animate-flicker`}
      style={{ 
        textShadow: glitching 
          ? "0 0 8px #ff0000, 0 0 15px #ff0000" 
          : "0 0 5px #ff0000, 0 0 10px #660000"
      }}
    >
      {symbols}
    </div>
  );
};

export default StrangeSymbols;
