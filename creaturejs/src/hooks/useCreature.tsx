import { type } from "os";
import { items } from "../lib/items";
import { useReducer, useState } from "react";
export type Point = { x: number, y: number };
export type BezierVertex = Point & {
    firstPull?: undefined | Point;
    seccendPull?: undefined | Point;
}
export type Angle = { x: number, y: number, t: number };
export type Skin = { v1: number, v2: number, v3: number, v4: number };
export type CreatureItems = {
    head?: any,
    body?: any,
    accessorie?: any,
    leftHand?: any,
    rightHand?: any,
    leftLeg?: any,
    rightLeg?: any,
    leftEye?: any,
    rightEye?: any,
    mouth?: any,
    roots?: {
        [key: string]: {
            x: number;
            y: number;
        }
    };
};
export type CreatureState = {
    (): void;
    state: {
        Items: CreatureItems,
        location: { x: 0, y: 0 },
        target: { x: 0, y: 0 },
        moving: false,
        speed: 1,
        addSpeed: 1,
        angle: { x: 0, y: 0, t: 0 },
        roots: { [key: string]: Point },
    };
    go(target: Point, angle: Angle): void;
    move(location: Point): void;
    updateSpeed(speed: number): void;
    stop(): void;
    setSkin(v1: number, v2: number, v3: number, v4: number): void;
}
export const addPointPair = (rootPoint: Point, addPoint: Point) => {
    return { x: rootPoint.x + addPoint.x, y: rootPoint.y + addPoint.y };
};
export const isSamePoint = (aPoint: Point, bPoint: Point) => {
    return aPoint.x == bPoint.x && aPoint.y == bPoint.y;
};

// const showBezier = (p5, points, root) => {
//     p5.beginShape();
//     points.forEach((point) => {
//         if (point.firstPull && point.seccendPull) {
//             p5.bezierVertex(
//                 root.x + point.firstPull.x,
//                 root.y + point.firstPull.y,
//                 root.x + point.seccendPull.x,
//                 root.y + point.seccendPull.y,
//                 root.x + point.x,
//                 root.y + point.y
//             );
//         } else {
//             p5.vertex(root.x + point.x, root.y + point.y);
//         }
//     });
//     p5.endShape();
// }

// const getBezierShower = (p5) => {
//     const showBezier = (points, root) => {
//         p5.beginShape();
//         points.forEach((point) => {
//             if (point.firstPull && point.seccendPull) {
//                 p5.bezierVertex(
//                     root.x + point.firstPull.x,
//                     root.y + point.firstPull.y,
//                     root.x + point.seccendPull.x,
//                     root.y + point.seccendPull.y,
//                     root.x + point.x,
//                     root.y + point.y
//                 );
//             } else {
//                 p5.vertex(root.x + point.x, root.y + point.y);
//             }
//         });
//         p5.endShape();
//     }

// }
// const moveBySpeed = () => {
//     tempState.location.x += tempState.p5.map(tempState.speed, 0, tempState.angle.t, 0, tempState.angle.x);
//     tempState.location.y += tempState.p5.map(tempState.speed, 0, tempState.angle.t, 0, tempState.angle.y);
// }
const creatureReduser = (state, action: { type: `go`, target: Point, angle: Angle } | { type: `move`, location: Point } | { type: `updateSpeed`, speed: number } | { type: `stop` }) => {
    if (action.type === 'go') {
        console.info(action.target);
        const temp = { ...state, target: action.target, moving: true, angle: action.angle };
        console.info(temp);
        return temp;
    } else if (action.type === 'move') {
        const tempState = { ...state };
        // Check if movement is enabled and the current position is not the target position
        if (!state.moving || !isSamePoint(state.location, state.target)) return state;
        return { ...state, location: action.location };
    }
    else if (action.type === 'updateSpeed') {
        return { ...state, speed: action.speed };
    }
    else if (action.type === 'stop') {
        return { ...state, location: state.target, moving: false, speed: 1 };
    }
}

const getItemsBySkin = (skin: Skin) => {
    const Items: CreatureItems = {};
    if (skin.v1 > 1) {
        Items.head = [items.heads.dic];
    } else {
        Items.body = [items.bodys.dic, items.bodys.dicDodo];
        Items.roots = items.bodys.dic.roots;
    }

    // accessorie
    if (skin.v2 > 1) {
        Items.accessorie = [items.accessories.horn];
    }

    // Hand & Leg
    if (skin.v3 > 1) {
        Items.leftHand = [items.leftHands.dic];
        Items.rightHand = [items.rightHands.dic];
        Items.leftLeg = [items.leftLegs.dic];
        Items.rightLeg = [items.rightLegs.dic];
    }

    // Eye & Mouth
    if (skin.v4 > 1) {
        Items.leftEye = [items.eyes.circle];
        Items.rightEye = [items.eyes.circle];
        Items.mouth = [items.mouths.dic];
    }
    return Items;
}
export const useCreature = (inputSkin: Skin) => {
    const [skin, _setSkin] = useState(inputSkin);
    const [Items, setItems] = useState(getItemsBySkin(skin));
    const [location, _setLocation] = useState({ x: 0, y: 0 });
    const [target, _setTarget] = useState({ x: 0, y: 0 });
    const [moving, _setMoving] = useState(false);
    const [speed, _setSpeed] = useState(1);
    const [addSpeed, _setAddSpeed] = useState(1);
    const [angle, _setAngle] = useState({ x: 0, y: 0, t: 0 });
    const [roots, _setRoots] = useState(Items.roots);
    // const [creatureState, creatureDispatch] = useReducer(creatureReduser, {
    //     Items: Items,
    //     location: ,
    //     target: { x: 0, y: 0 },
    //     moving: false,
    //     speed: 1,
    //     addSpeed: 1,
    //     angle: { x: 0, y: 0, t: 0 },
    //     roots: Items.roots,
    // });
    const creatureState = {
        Items: Items,
        location: location,
        target: target,
        moving: moving,
        speed: speed,
        addSpeed: addSpeed,
        angle: angle,
        roots: roots,
    }

    const creature = () => { };
    creature.state = creatureState;
    creature.go = (target: Point, angle: Angle) => {
        _setMoving(true);
        _setTarget(target);
        _setAngle(angle);
    };
    creature.move = (location: Point) => _setLocation(location);
    creature.updateSpeed = (speed: number) => _setSpeed(speed);
    creature.stop = () => {
        _setLocation(target);
        _setSpeed(1);
        _setMoving(false);
    };
    // creature.go = (target: Point, angle: Angle) => creatureDispatch({ type: 'go', target: target, angle: angle });
    // creature.move = (location: Point) => creatureDispatch({ type: 'move', location: location });
    // creature.updateSpeed = (speed: number) => creatureDispatch({ type: `updateSpeed`, speed: speed });
    // creature.stop = () => creatureDispatch({ type: `stop` });
    creature.setSkin = (v1: number, v2: number, v3: number, v4: number) => {
        _setSkin({ v1: v1, v2: v2, v3: v3, v4: v4 });
    }
    // creature.show = () => {
    //     for (let key of Object.keys(creatureState.roots)) {
    //         if (key in creatureState.Items) {
    //             const itemsArray = creatureState.Items[key];
    //             if (!itemsArray) return;
    //             for (let item of itemsArray) {
    //                 const drawPoint = addPointPair(creatureState.location, creatureState.roots[key]);
    //                 if (item.type == 'bezier') {
    //                     showBezier(item.points, drawPoint);
    //                 } else if (item.type == 'circle') {
    //                     showCircle(item.points, drawPoint);
    //                 }
    //             }
    //         }
    //     }
    //     creature.move();
    // }
    return [creature];
}