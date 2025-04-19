import React, { useEffect, useState } from "react";

type JumpScareProps = {
  isActive: boolean;
  onComplete: () => void;
};

const JumpScare: React.FC<JumpScareProps> = ({ isActive, onComplete }) => {
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [showImage, setShowImage] = useState(false);
  
  useEffect(() => {
    if (isActive) {
      // Показываем скример сразу при активации
      setShowImage(true);
      setAudioPlayed(true);
      
      // Играем очень громкий звук шипения
      try {
        const audio = new Audio("https://www.soundjay.com/human/sounds/hissing-1.mp3");
        // Установка максимальной громкости
        audio.volume = 1.0;
        audio.play().catch(e => console.error("Звук не может быть воспроизведен:", e));
      } catch (e) {
        console.error("Ошибка воспроизведения звука:", e);
      }
      
      // Через 3 секунды убираем скример
      const timeout = setTimeout(() => {
        setShowImage(false);
        // Через дополнительные 500 мс вызываем onComplete для плавного перехода
        setTimeout(() => {
          onComplete();
          setAudioPlayed(false);
        }, 500);
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, [isActive, onComplete]);
  
  // Генерация случайных жутких символов
  const generateRandomSymbols = (count: number) => {
    const symbols = "☠︎⚰︎⚱︎☢︎☣︎⚔︎⚒︎♰♱⛧⛥⛤∞⍾⌬⎔⎕⚝✞✟❍❖❇❈";
    let result = "";
    for (let i = 0; i < count; i++) {
      result += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }
    return result;
  };
  
  if (!isActive && !showImage) return null;
  
  return (
    <div 
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-300
                 ${showImage ? 'opacity-100' : 'opacity-0'}`} 
      style={{ transitionProperty: "opacity" }}
    >
      {/* Кровавый фон */}
      <div className="absolute inset-0 bg-horror-gore opacity-20 animate-pulse"></div>
      
      {/* Пульсирующие кровавые символы по всему экрану */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="absolute text-6xl text-horror-blood opacity-70 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 3}s`
            }}
          >
            {generateRandomSymbols(1)}
          </div>
        ))}
      </div>
      
      {/* Главный элемент скримера - кровавые глаза */}
      <div className="relative w-full max-h-screen flex items-center justify-center animate-shake overflow-hidden">
        
        {/* Глаза */}
        <div className="flex flex-row items-center justify-center space-x-20 sm:space-x-32 md:space-x-48 lg:space-x-64">
          {/* Левый глаз */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 rounded-full bg-black border-4 border-horror-blood animate-pulse" 
                 style={{ boxShadow: "0 0 30px 10px rgba(139, 0, 0, 0.8)" }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full bg-horror-blood animate-pulse"></div>
                <div className="absolute w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-black"></div>
              </div>
              
              {/* Кровавые потеки из глаза */}
              <div className="absolute -bottom-20 w-full">
                <div className="w-full h-24 bg-horror-blood" 
                     style={{ clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0% 100%)" }}></div>
              </div>
            </div>
          </div>
          
          {/* Правый глаз */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 rounded-full bg-black border-4 border-horror-blood animate-pulse" 
                 style={{ boxShadow: "0 0 30px 10px rgba(139, 0, 0, 0.8)" }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full bg-horror-blood animate-pulse"></div>
                <div className="absolute w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-black"></div>
              </div>
              
              {/* Кровавые потеки из глаза */}
              <div className="absolute -bottom-20 w-full">
                <div className="w-full h-24 bg-horror-blood" 
                     style={{ clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0% 100%)" }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Жуткие символы между глазами */}
        <div className="absolute text-8xl md:text-9xl font-bold text-horror-blood opacity-90 animate-pulse glitchy horror-text" 
             data-text={generateRandomSymbols(3)}>
          {generateRandomSymbols(3)}
        </div>
      </div>
      
      {/* Кровавые потеки на экране */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-60 bg-horror-blood opacity-40" 
             style={{ 
               clipPath: "polygon(0 0, 30% 0, 15% 100%, 0 100%)",
               filter: "blur(8px)"
             }}></div>
        <div className="absolute top-0 right-0 w-60 h-80 bg-horror-blood opacity-40" 
             style={{ 
               clipPath: "polygon(100% 0, 100% 40%, 0 100%, 40% 0)",
               filter: "blur(8px)"
             }}></div>
        <div className="absolute bottom-0 left-0 right-0 h-60 bg-horror-blood opacity-40"
             style={{ 
               clipPath: "polygon(70% 0, 100% 0, 100% 100%, 85% 100%)",
               filter: "blur(8px)"
             }}></div>
      </div>
    </div>
  );
};

export default JumpScare;
