import p5 from 'p5';
import { useEffect, useRef } from 'react';
import { getCreature } from './Creature';

function useSketch(skin=`egg`) {
  const p5ContainerRef = useRef<HTMLDivElement>(null);

  const sketch=(p)=>{
    console.log(`skin: ${props.skin}`);
    const creature = getCreature(1, 2, 2, 2);
    p.setup = function () {
      p.createCanvas(400, 400);
      p.background(0);
      p.circle(200, 200, 400);
    };
    p.draw = function () {
      p.background(0); // Ensure the background is redrawn each frame
      creature.show();
    };
  }

  useEffect(() => {
    let p5Instance;
    
    if (p5ContainerRef.current) {
      p5Instance = new p5(sketch, p5ContainerRef.current);
    }

    return () => {
      if (p5Instance) {
        p5Instance.remove();
      }
    };
  }, []);

  return p5ContainerRef;
}

export default useSketch;