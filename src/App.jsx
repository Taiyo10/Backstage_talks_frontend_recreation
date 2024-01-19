import react, { useEffect, useState, useRef } from 'react';

function App() {
  
  const [Y, setY] = useState(0);
  const cooldownRef = useRef(false);

  useEffect(() => {
    let timeout;
    function handleWheel(event) {
      if (cooldownRef.current) return;
      
      setY((prevY) => {
        if (event.deltaY > 0) {
          // Scrolling down
          return prevY - 1;
        } else {
          // Scrolling up
          return prevY + 1;
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

  let colours = ["blue", "red", "green", "purple"];
  document.body.style.backgroundColor = colours[Y];
  return (
    <div style={{backgroundColor: colours[Y]}} class='transition-colors duration-1000 h-screen'>
      <div id="numba1" class='shadow-[0_35px_75px_-20px_rgba(0,0,0,0.50)] w-[30vw] h-[60vh] absolute top-[20vh] left-[35vw] transition duration-1000' style={{transform: `translate3d(6px, ${0 - Y * 1000}px, 35px)`, backgroundColor: colours[0]}}></div>
      <div id="numba2" class='shadow-[0_35px_75px_-20px_rgba(0,0,0,0.50)] w-[30vw] h-[60vh] absolute top-[20vh] left-[35vw] transition duration-1000' style={{transform: `translate3d(6px, ${1000 - Y * 1000}px, 35px)`, backgroundColor: colours[1]}}></div>
      <div id="numba3" class='shadow-[0_35px_75px_-20px_rgba(0,0,0,0.50)] w-[30vw] h-[60vh] absolute top-[20vh] left-[35vw] transition duration-1000' style={{transform: `translate3d(6px, ${2000 - Y * 1000}px, 35px)`, backgroundColor: colours[2]}}></div>
      <div id="numba4" class='shadow-[0_35px_75px_-20px_rgba(0,0,0,0.50)] w-[30vw] h-[60vh] absolute top-[20vh] left-[35vw] transition duration-1000' style={{transform: `translate3d(6px, ${3000 - Y * 1000}px, 35px)`, backgroundColor: colours[3]}}></div>
    </div>
  );
}

export default App;