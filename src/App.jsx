import react, { useEffect, useState, useRef } from 'react';

function App() {
  
  const [Y, setY] = useState(0);
  const [colours, setColours] = useState(["blue", "red", "green", "purple", "orange", "brown", "#123456"]);
  const [chosenColor, setChosenColor] = useState(null);

  const cooldownRef = useRef(false);

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
  }, [colours]);


  //Gets value from color input
  function handleChange(e) {
    setChosenColor(e.target.value);
  }

  //Adds chosen color to array
  function handleClick(e) {
    if (!chosenColor) return;
    setColours([...colours, chosenColor]);
    setChosenColor(null);
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
        <div class='shadow-[0_35px_75px_-20px_rgba(0,0,0,0.50)] w-[30vw] h-[60vh] absolute top-[20vh] left-[35vw] z-50 transition duration-1000 flex justify-center items-center' style={{transform: `translate3d(6px, ${(colours.length * window.innerHeight * 1.15) - Y * window.innerHeight * 1.15}px, 35px)`, backgroundColor: chosenColor ? chosenColor : ""}}>
          <input type="color" onChange={handleChange} class='absolute h-[60vh] w-[30vw] opacity-0 z-30'></input>
          <p class="transition duration-1000 absolute -z-10" className={chosenColor ? `opacity-0` : `opacity-100`}>Click Me!</p>
          <button onClick={handleClick} class='absolute border-4 bg-white rounded-lg z-30 bottom-[10%]'>Add Colour</button>
        </div>
        
        <h1 class="transition duration-1000 text-[42vh] sm:max-xl:text-[23vh] absolute left-1/2 -top-[15vh] sm:max-xl:top-0" style={{transform: `translate3d(-50%, ${(colours.length * window.innerHeight * 1.15) - Y * window.innerHeight * 1.15}px, 0px)`, color: chosenColor ? chosenColor : "DimGray"}}>Pick</h1>
        <h1 class="transition duration-1000 text-[42vh] sm:max-xl:text-[23vh] absolute left-1/2 top-[18vh] sm:max-xl:top-[32vh] " style={{transform: `translate3d(-50%, ${(colours.length * window.innerHeight * 1.15) - Y * window.innerHeight * 1.15}px, 0px)`, color: chosenColor ? chosenColor : "DimGray"}}>Your</h1>
        <h1 class="transition duration-1000 text-[42vh] sm:max-xl:text-[23vh] absolute left-1/2 top-1/2 sm:max-xl:top-[64vh]" style={{transform: `translate3d(-50%, ${(colours.length * window.innerHeight * 1.15) - Y * window.innerHeight * 1.15}px, 0px)`, color: chosenColor ? chosenColor : "DimGray"}}>Color</h1>

      </div>
    </div>
  );
}

export default App;