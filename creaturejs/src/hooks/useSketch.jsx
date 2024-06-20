// import { ReactP5Wrapper } from "@p5-wrapper/react";
// import { useCreature } from "./useCreature";



// export function useSketch(p5) {
//     const [creature, setSkin] = useCreature(p5, 1, 2, 2, 2);
//     const sketch = (p5) => {
//         p5.setup = () => {
//             p5.createCanvas(400, 400);

//         }

//         p5.draw = () => {
//             p5.background(250);
//             creature.show();
//         };
//         p5.mousePressed = () => {
//             creature.go({ x: p5.mouseX, y: p5.mouseY });
//         }
//     }
//     return <ReactP5Wrapper sketch={sketch} />;
// }