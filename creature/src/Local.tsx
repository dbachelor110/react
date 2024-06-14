import p5 from "p5";
import { useEffect, useRef } from 'react';
import { getCreature } from './Creature';

type localProps={
    skin:string,
}

function sketch(p:p5) {
    // p is a reference to the p5 instance this sketch is attached to
    const creature = getCreature(1,2,2,2);
    p.setup = function() {
        p.createCanvas(400, 400);
        p.background(0);
        p.circle(200, 200, 400);
    }

    p.draw = function() {
        creature.show();
        // your draw code here
    }
}

function Local(props:localProps) {
    // create a reference to the container in which the p5 instance should place the canvas
    const p5ContainerRef = useRef(null);
    console.log(props.skin);
    useEffect(() => {
        // On component creation, instantiate a p5 object with the sketch and container reference 
        let p5Instance:p5;
        if(p5ContainerRef.current){
            p5Instance = new p5(sketch, p5ContainerRef.current);
        }
        // On component destruction, delete the p5 instance
        return () => {
            p5Instance.remove();
        }
    }, []);

    return (
        <div className="Local" ref={p5ContainerRef} />
    );
}

export default Local;