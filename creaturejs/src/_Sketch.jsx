import { ReactP5Wrapper, P5CanvasInstance } from "@p5-wrapper/react";
// import { getCreature } from "./lib/creature";
// import { useCreature } from "./hooks/useCreature";





export function Sketch() {
  // const [creature, setP5, setSkin] = useCreature({}, 1, 2, 2, 2);
  // const sketch = (p5) => {
  //   setP5(p5);
  //   p5.setup = () => {
      
  //     p5.createCanvas(400, 400);
      
  //   }
  
  //   p5.draw = () => {
  //     p5.background(250);
  //     creature.show();
  //   };
  //   p5.mousePressed = () => {
  //     creature.go({ x: p5.mouseX, y: p5.mouseY });
  //   }
  // }
  const sketch = (p5) => {
    let x = 200;
    let y = 200;
    p5.setup = () => {
      
      p5.createCanvas(400, 400);
      
    }
  
    p5.draw = () => {
      p5.background(250);
      p5.circle(200,200,10);
      // p5.circle(x,y,10);
    };
    p5.mousePressed = () => {
      x= p5.mouseX;
      y= p5.mouseY;
    }
  }
  return <ReactP5Wrapper sketch={sketch} />;
}