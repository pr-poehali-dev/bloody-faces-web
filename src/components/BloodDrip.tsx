import React from "react";

type BloodDripProps = {
  position?: "top" | "bottom" | "left" | "right";
  intensity?: "low" | "medium" | "high";
};

const BloodDrip: React.FC<BloodDripProps> = ({ 
  position = "top", 
  intensity = "medium" 
}) => {
  const getDrops = () => {
    const dropCount = {
      low: 3,
      medium: 6,
      high: 10
    }[intensity];
    
    let drops = [];
    for (let i = 0; i < dropCount; i++) {
      const width = 8 + Math.random() * 20;
      const height = 10 + Math.random() * 60;
      const left = Math.random() * 100;
      const delay = Math.random() * 3;
      
      drops.push({ width, height, left, delay });
    }
    return drops;
  };
  
  const drops = React.useMemo(() => getDrops(), [intensity]);
  
  const getPositionStyle = () => {
    switch(position) {
      case "top":
        return { top: 0, left: 0, right: 0, height: "auto", flexDirection: "column" as const };
      case "bottom":
        return { bottom: 0, left: 0, right: 0, height: "auto", flexDirection: "column-reverse" as const };
      case "left":
        return { top: 0, bottom: 0, left: 0, width: "auto", flexDirection: "row" as const };
      case "right":
        return { top: 0, bottom: 0, right: 0, width: "auto", flexDirection: "row-reverse" as const };
      default:
        return { top: 0, left: 0, right: 0, height: "auto", flexDirection: "column" as const };
    }
  };
  
  const isVertical = position === "top" || position === "bottom";
  
  return (
    <div 
      className="absolute z-20 pointer-events-none overflow-hidden"
      style={getPositionStyle()}
    >
      {drops.map((drop, index) => (
        <div 
          key={index} 
          className="absolute bg-horror-blood" 
          style={
            isVertical ? {
              width: `${drop.width}px`,
              height: `${drop.height}px`,
              left: `${drop.left}%`,
              animationDelay: `${drop.delay}s`,
              borderRadius: "0 0 50% 50%",
              opacity: 0.8 + Math.random() * 0.2,
              filter: "blur(1px)",
              boxShadow: "0 0 5px rgba(138, 3, 3, 0.8)"
            } : {
              height: `${drop.width}px`,
              width: `${drop.height}px`,
              top: `${drop.left}%`,
              animationDelay: `${drop.delay}s`,
              borderRadius: "50% 0 0 50%",
              opacity: 0.8 + Math.random() * 0.2,
              filter: "blur(1px)",
              boxShadow: "0 0 5px rgba(138, 3, 3, 0.8)"
            }
          }
        />
      ))}
    </div>
  );
};

export default BloodDrip;
