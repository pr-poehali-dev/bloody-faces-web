import React, { useState, useEffect } from "react";
import HorrorFace from "@/components/HorrorFace";
import StrangeSymbols from "@/components/StrangeSymbols";
import BloodDrip from "@/components/BloodDrip";

const Index = () => {
  const [faces, setFaces] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки
    setTimeout(() => {
      const faceCount = 9;
      setFaces(Array.from({ length: faceCount }, (_, i) => i));
      setLoading(false);
    }, 1500);
    
    // Добавляем звуковой эффект при наведении на элементы
    const addHoverSound = () => {
      document.querySelectorAll('.hover-sound').forEach(element => {
        element.addEventListener('mouseenter', () => {
          // Здесь мог бы быть звуковой эффект
        });
      });
    };
    
    addHoverSound();
    
    // Случайно меняем порядок лиц
    const randomizeInterval = setInterval(() => {
      setFaces(prev => [...prev].sort(() => Math.random() - 0.5));
    }, 10000);
    
    return () => clearInterval(randomizeInterval);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-horror-dark">
        <StrangeSymbols variant="title" length={15} />
        <div className="mt-8 animate-pulse">
          <StrangeSymbols variant="subtitle" length={20} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-horror-dark relative overflow-hidden">
      <BloodDrip position="top" intensity="high" />
      <BloodDrip position="left" intensity="medium" />
      <BloodDrip position="right" intensity="medium" />
      
      <div className="container mx-auto pt-12 pb-20 px-4 relative z-10">
        <header className="text-center mb-12">
          <h1 className="glitchy horror-text text-5xl md:text-6xl text-red-600 mb-4" data-text="☠ ⚰︎ ⚱︎">
            <StrangeSymbols variant="title" length={12} />
          </h1>
          <div className="mt-4">
            <StrangeSymbols variant="subtitle" length={30} />
          </div>
        </header>
        
        <main className="relative">
          <div className="absolute inset-0 bg-horror-gore opacity-5 mix-blend-multiply" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center relative z-10">
            {faces.map((id) => (
              <div 
                key={id} 
                className="hover-sound relative group"
              >
                <div className="absolute -inset-0.5 bg-red-600 opacity-30 rounded blur-sm group-hover:opacity-60 transition duration-500"></div>
                <HorrorFace id={id} noise={0.3 + Math.random() * 0.4} />
              </div>
            ))}
          </div>
        </main>
        
        <footer className="mt-16 text-center">
          <StrangeSymbols variant="text" length={50} />
        </footer>
      </div>
      
      {/* Фоновый шум */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10" 
           style={{ 
             backgroundImage: `url("data:image/png;base64,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")` 
           }}
      />
    </div>
  );
};

export default Index;
