import react, { useEffect, useState, useRef } from 'react';

function App() {
  
  let colours = ["blue", "red", "green", "purple", "orange", "brown", "#123456"]; //Adding a colour creates a whole new section

  const [Y, setY] = useState(0);
  const cooldownRef = useRef(false);
  const [chosenColor, setChosenColor] = useState(null);

  //Detects scroll direction and creates a cooldown between each scroll
  useEffect(() => {
    let timeout;
    function handleWheel(event) {
      if (cooldownRef.current) return;
      
      setY((prevY) => {
        if (event.deltaY > 0) {
          if (prevY === 0) return prevY;
          else return prevY - 1;
        } else {
          if (prevY === (colours.length)) return prevY;
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

  //Gets value from color input
  
  function handleChange(e) {
    setChosenColor(e.target.value);
  }

  return (
    <div style={{backgroundColor: Y === colours.length ? chosenColor : colours[Y], textShadow: '1px 1px 2px rgba(0,0,0,0.5) '}} class='transition-colors duration-1000 h-screen font-black'>

      {colours.map((colour, index) => (
        <div>
          <div key={index} class='shadow-[0_35px_75px_-20px_rgba(0,0,0,0.50)] w-[30vw] h-[60vh] absolute top-[20vh] left-[35vw] z-50 transition duration-1000' style={{transform: `translate3d(6px, ${(index * window.innerHeight * 1.15) - Y * window.innerHeight * 1.15}px, 35px)`, backgroundColor: colour}}></div>
          <h1 class="transition duration-1000 text-[42vh] sm:max-xl:text-[23vh] absolute left-1/2 -top-[15vh] sm:max-xl:top-0" style={{transform: `translate3d(-50%, ${(index * window.innerHeight * 1.15) - Y * window.innerHeight * 1.15}px, 0px)`, color: colour}}>{colour.toUpperCase()}</h1>
          <h1 class="transition duration-1000 text-[42vh] sm:max-xl:text-[23vh] absolute left-1/2 top-[18vh] sm:max-xl:top-[32vh] " style={{transform: `translate3d(-50%, ${(index * window.innerHeight * 1.15) - Y * window.innerHeight * 1.15}px, 0px)`, color: colour}}>{colour.toUpperCase()}</h1>
          <h1 class="transition duration-1000 text-[42vh] sm:max-xl:text-[23vh] absolute left-1/2 top-1/2 sm:max-xl:top-[64vh]" style={{transform: `translate3d(-50%, ${(index * window.innerHeight * 1.15) - Y * window.innerHeight * 1.15}px, 0px)`, color: colour}}>{colour.toUpperCase()}</h1>
        </div>
     ))}

     {/* Pick Your Colour */}
      <div>
        <div class='shadow-[0_35px_75px_-20px_rgba(0,0,0,0.50)] w-[30vw] h-[60vh] absolute top-[20vh] left-[35vw] z-50 transition duration-1000' style={{transform: `translate3d(6px, ${(colours.length * window.innerHeight * 1.15) - Y * window.innerHeight * 1.15}px, 35px)`, backgroundColor: chosenColor ? chosenColor : ""}}>
          <input type="color" onChange={handleChange} className='absolute h-[60vh] w-[30vw] opacity-0'></input>
        </div>

        <h1 class="transition duration-1000 text-[42vh] sm:max-xl:text-[23vh] absolute left-1/2 -top-[15vh] sm:max-xl:top-0" style={{transform: `translate3d(-50%, ${(colours.length * window.innerHeight * 1.15) - Y * window.innerHeight * 1.15}px, 0px)`, color: chosenColor ? chosenColor : "DimGray"}}>Pick</h1>
        <h1 class="transition duration-1000 text-[42vh] sm:max-xl:text-[23vh] absolute left-1/2 top-[18vh] sm:max-xl:top-[32vh] " style={{transform: `translate3d(-50%, ${(colours.length * window.innerHeight * 1.15) - Y * window.innerHeight * 1.15}px, 0px)`, color: chosenColor ? chosenColor : "DimGray"}}>Your</h1>
        <h1 class="transition duration-1000 text-[42vh] sm:max-xl:text-[23vh] absolute left-1/2 top-1/2 sm:max-xl:top-[64vh]" style={{transform: `translate3d(-50%, ${(colours.length * window.innerHeight * 1.15) - Y * window.innerHeight * 1.15}px, 0px)`, color: chosenColor ? chosenColor : "DimGray"}}>Color</h1>
      </div>
    </div>
  );
}

export default App;