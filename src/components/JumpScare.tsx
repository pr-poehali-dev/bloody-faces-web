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
      
      // Играем звук скримера
      try {
        const audio = new Audio("https://soundbible.com/mp3/Scary%20Scream-SoundBible.com-1115384336.mp3");
        audio.volume = 0.7;
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
  
  if (!isActive && !showImage) return null;
  
  return (
    <div 
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-500
                 ${showImage ? 'opacity-100' : 'opacity-0'}`} 
      style={{ transitionProperty: "opacity" }}
    >
      {/* Страшное лицо */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 bg-horror-gore opacity-10"></div>
        
        {/* Страшное изображение с эффектами */}
        <div className="relative w-3/4 max-w-3xl animate-shake">
          <div 
            className="w-full aspect-square bg-center bg-cover"
            style={{
              backgroundImage: `url('/placeholder.svg')`, 
              filter: "contrast(200%) brightness(30%) saturate(300%) hue-rotate(340deg)"
            }}
          />
          
          {/* Лицо монстра - можно заменить на любое подходящее изображение */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-[20rem] horror-text text-red-800 animate-pulse">☠︎</div>
          </div>
          
          {/* Глаза */}
          <div className="absolute top-1/4 left-1/3 w-10 h-10 rounded-full bg-white animate-pulse"></div>
          <div className="absolute top-1/4 right-1/3 w-10 h-10 rounded-full bg-white animate-pulse"></div>
          
          {/* Рот */}
          <div className="absolute bottom-1/3 left-1/4 right-1/4 h-20 bg-horror-blood rounded-b-full"></div>
        </div>
        
        {/* Кровь на экране */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-40 bg-horror-blood opacity-30" 
              style={{ 
                clipPath: "polygon(0 0, 100% 0, 80% 100%, 20% 100%)",
                filter: "blur(10px)"
              }}></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-horror-blood opacity-30"
              style={{ 
                clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)",
                filter: "blur(10px)"
              }}></div>
        </div>
      </div>
    </div>
  );
};

export default JumpScare;
