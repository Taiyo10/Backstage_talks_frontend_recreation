import react, { useEffect, useState } from 'react';

function App() {
  
  const [Y, setY] = useState(0);
  const [cooldown, setCooldown] = useState(false);

  useEffect(() => {
    let timeout;
    function handleWheel(event) {
      if (cooldown) return;
      
      setY(prevY => {
        if (event.deltaY > 0) {
          // Scrolling down
          return prevY - 1;
        } else {
          // Scrolling up
          return prevY + 1;
        }
      });
      setCooldown(true);
      timeout = setTimeout(() => {
        setCooldown(false);
      }, 1000);
    };
    
    
    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(timeout);
    }
  }, [Y,cooldown]);

  return (
    <div className="App">
      <button onClick={() => setY(prevY => prevY + 1)}>{Y}</button>
      <button onClick={() => setY(prevY => prevY - 1)}>Down</button>
      <div id="numba1" class="bg-black w-[30vw] h-[20vh] absolute top-[50vh] left-[50vw] transition duration-1000" style={{transform: `translate3d(6px, ${-1000 - Y * 1000}px, 35px)`}}></div>
      <div id="numba2" class="bg-red-600 w-[30vw] h-[20vh] absolute top-[50vh] left-[50vw] transition duration-1000" style={{transform: `translate3d(6px, ${0 - Y * 1000}px, 35px)`}}></div>
      <div id="numba3" class="bg-green-800 w-[30vw] h-[20vh] absolute top-[50vh] left-[50vw] transition duration-1000" style={{transform: `translate3d(6px, ${1000 - Y * 1000}px, 35px)`}}></div>
      <div id="numba4" class="bg-purple-800 w-[30vw] h-[20vh] absolute top-[50vh] left-[50vw] transition duration-1000" style={{transform: `translate3d(6px, ${2000 - Y * 1000}px, 35px)`}}></div>
    </div>
  );
}

export default App;