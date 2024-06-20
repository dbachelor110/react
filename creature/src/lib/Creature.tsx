// import p5 from "p5";
import items, {Point, BezierVertex, ItemMap, Item} from "./items";

const {p5} = items;
const {addPointPair} = items;

type creaturePrams={
  head?:Item,
  mouth?:Item, 
  rightEye?:Item, 
  leftEye?:Item, 
  body?:Item, 
  rightHand?:Item, 
  leftHand?:Item, 
  rightLeg?:Item, 
  leftLeg?:Item, 
  tail?:Item,
  accessorie?:Item
}

const isSamePoint=(aPoint:Point, bPoint:Point)=>{
  return aPoint.x == bPoint.x && aPoint.y == bPoint.y;
};
const dist=(aPoint:Point, bPoint:Point)=>{
  return p5.prototype.dist(aPoint.x, aPoint.y, bPoint.x, bPoint.y);
};
const getTan=(fromPoint:Point, toPoint:Point)=>{
  const t = dist(fromPoint,toPoint);
  return {x:toPoint.x-fromPoint.x,y:toPoint.y-fromPoint.y,t:t};
};
class Creatures{
    Items:creaturePrams;
    location: Point;
    target: Point;
    moving: boolean;
    speed: number;
    addSpeed: number;
    angle: Point&{t:number};
    points: {[key:string]:Point};
    constructor(Items:creaturePrams){
        this.Items=Items;
        this.location={x:p5.prototype.windowWidth/2,y:p5.prototype.windowHeight/2};
        this.target={x:p5.prototype.windowWidth/2,y:p5.prototype.windowHeight/2};
        this.moving=false;
        this.speed=1;
        this.addSpeed=1;
        this.angle={x:0,y:0,t:0};
        this.points={}
    }
    show=()=>{
      if(!this.Items.body) return;
      for( let item of this.Items.body){
        item.points?this.points=item.points:{};
      }
      console.log(this.points);
      for(let key of Object.keys(this.points)){
        console.log(`this.Items:`);
        console.info(this.Items);
        
        if ( key in this.Items){
          const itemsArray = this.Items[key as keyof creaturePrams];
          if (!itemsArray) return;
          for( let item of itemsArray){
            const drawPoint = addPointPair(this.location,this.points[key]);
            console.log(`show on point ${drawPoint.x}, ${drawPoint.y}`);
            item.show(drawPoint);
          }
        }
      }
    }
    go=(target:Point)=>{
        this.target=target;
        this.moving=true;
        this.angle=getTan(this.location,this.target);
    }
    move=()=> {
      
      // Check if movement is enabled and the current position is not the target position
      if (!this.moving || !isSamePoint(this.location,this.target)) return;
        
        // Toggle the walk state
        
        // Calculate distances
        const distanceToTarget = dist(this.location,this.target);
        
        // Adjust speed based on distance traveled
        if ( distanceToTarget < 50) {
          this.speed--;
        } else if (this.addSpeed*10 > this.speed) {
          this.speed+=this.addSpeed;
        }
        
        // Apply the calculated speed
        this.moveBySpeed();
        
        // Check if the target is reached
        if (p5.prototype.abs(distanceToTarget) < 10) {
          this.location=this.target;
          this.moving = false;
          this.speed = 1;
        }
    }
    
    moveBySpeed=()=>{
      this.location.x += p5.prototype.map(this.speed, 0, this.angle.t , 0, this.angle.x);
      this.location.y += p5.prototype.map(this.speed, 0, this.angle.t , 0, this.angle.y);
    }
}
const getCreature = (v1:number, v2:number, v3:number, v4:number):Creatures=>{
  const Items:creaturePrams={};
  // head & body
  if (v1 > 1){
    Items.head = [items.heads.dic];
  }else{
    Items.body = [items.bodys.dic,items.bodys.dicDodo];
  }

  // accessorie
  if (v2 > 1){
    Items.accessorie = [items.accessories.horn];
  }

  // Hand & Leg
  if (v3 > 1){
    Items.leftHand = [items.leftHands.dic];
    Items.rightHand = [items.rightHands.dic];
    Items.leftLeg = [items.leftLegs.dic];
    Items.rightLeg = [items.rightLegs.dic];
  }

  // Eye & Mouth
  if (v4 > 1){
    Items.leftEye = [items.eyes.circle];
    Items.rightEye = [items.eyes.circle];
  }
  const creature = new Creatures(Items);
  return creature;
}
export { getCreature };