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
        // Звук статического шипения
        const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3");
        
        // Установка максимальной громкости
        audio.volume = 1.0;
        
        // Предварительная загрузка звука перед воспроизведением
        audio.load();
        
        // Обработка ошибок воспроизведения с выводом конкретной причины
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Звук успешно воспроизводится");
            })
            .catch(error => {
              console.error("Точная ошибка воспроизведения звука:", error.message);
              
              // Запасной вариант - генерация звука через AudioContext
              try {
                const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
                
                gainNode.gain.setValueAtTime(1, audioContext.currentTime);
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.start();
                
                // Остановить через 3 секунды
                setTimeout(() => {
                  oscillator.stop();
                }, 3000);
              } catch (backupError) {
                console.error("Запасной звук также не сработал:", backupError);
              }
            });
        }
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
  
  // Генерация случайных жутких символов (заменены на более абстрактные и пугающие)
  const generateRandomSymbols = (count: number) => {
    // Используем более абстрактные пугающие символы вместо эмодзи
    const symbols = "ⱧⱠȺȾŁɆⱧⱵⱵⱷ⸸⸎†‡§¶⍭⍯⍰⎊⎋⁂‰≠∆∞∟∫≈Ω";
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
      
      {/* Пульсирующие жуткие символы по всему экрану */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={i}
            className="absolute text-6xl md:text-7xl text-horror-blood opacity-70 animate-pulse"
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
      
      {/* Центральный элемент скримера - большие жуткие символы */}
      <div className="relative w-full max-h-screen flex items-center justify-center animate-shake overflow-hidden">
        {/* Центральные крупные жуткие символы */}
        <div className="text-9xl md:text-[12rem] lg:text-[16rem] font-bold text-horror-blood opacity-90 animate-pulse glitchy horror-text" 
             data-text={generateRandomSymbols(3)}>
          {generateRandomSymbols(3)}
        </div>
        
        {/* Дополнительные пульсирующие символы вокруг основных */}
        <div className="absolute text-7xl md:text-8xl font-bold text-horror-blood/50 animate-pulse" 
             style={{
               top: "30%",
               left: "25%",
               animationDelay: "0.3s"
             }}>
          {generateRandomSymbols(2)}
        </div>
        
        <div className="absolute text-7xl md:text-8xl font-bold text-horror-blood/60 animate-pulse" 
             style={{
               bottom: "35%",
               right: "20%",
               animationDelay: "0.5s"
             }}>
          {generateRandomSymbols(2)}
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
