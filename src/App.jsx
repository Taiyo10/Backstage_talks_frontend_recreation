import react, { useEffect, useState, useRef } from 'react';

function App() {
  
  let colours = ["blue", "red", "green", "purple", "orange"]; //Adding a colour creates a whole new section

  const [Y, setY] = useState(0);
  const cooldownRef = useRef(false);

  useEffect(() => {
    let timeout;
    function handleWheel(event) {
      if (cooldownRef.current) return;
      
      setY((prevY) => {
        if (event.deltaY > 0) {
          if (prevY === 0) return prevY;
          else return prevY - 1;
        } else {
          if (prevY === (colours.length - 1)) return prevY;
          else return prevY + 1;
        }
      });
      cooldownRef.current = true;
      timeout = setTimeout(() => {
        cooldownRef.current = false;
      }, 1000);
    };
    
    
    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(timeout);
    }
  }, []);

  return (
    <div style={{backgroundColor: colours[Y], textShadow: '1px 1px 2px rgba(0,0,0,0.5) '}} class='transition-colors duration-1000 h-screen font-black'>

      {colours.map((colour, index) => (
        <div>
          <div key={index} class='shadow-[0_35px_75px_-20px_rgba(0,0,0,0.50)] w-[30vw] h-[60vh] absolute top-[20vh] left-[35vw] z-50 transition duration-1000' style={{transform: `translate3d(6px, ${(index * 1000) - Y * 1000}px, 35px)`, backgroundColor: colour}}></div>
          <h1 class="transition duration-1000 text-[25vw] absolute left-1/2 -top-[12vh]" style={{transform: `translate3d(-50%, ${(index * 1000) - Y * 1000}px, 0px)`, color: colour}}>{colour.toUpperCase()}</h1>
          <h1 class="transition duration-1000 text-[25vw] absolute left-1/2 top-[19vh]" style={{transform: `translate3d(-50%, ${(index * 1000) - Y * 1000}px, 0px)`, color: colour}}>{colour.toUpperCase()}</h1>
          <h1 class="transition duration-1000 text-[25vw] absolute left-1/2 top-1/2" style={{transform: `translate3d(-50%, ${(index * 1000) - Y * 1000}px, 0px)`, color: colour}}>{colour.toUpperCase()}</h1>
        </div>
     ))}
    </div>
  );
}

export default App;