import { items } from "../lib/items";
import { useReducer, useState } from "react";
const addPointPair = (rootPoint, addPoint) => {
    return { x: rootPoint.x + addPoint.x, y: rootPoint.y + addPoint.y };
};
const isSamePoint = (aPoint, bPoint) => {
    return aPoint.x == bPoint.x && aPoint.y == bPoint.y;
};

const showBezier = (p5, points, root) => {
    p5.beginShape();
    points.forEach((point) => {
        if (point.firstPull && point.seccendPull) {
            p5.bezierVertex(
                root.x + point.firstPull.x,
                root.y + point.firstPull.y,
                root.x + point.seccendPull.x,
                root.y + point.seccendPull.y,
                root.x + point.x,
                root.y + point.y
            );
        } else {
            p5.vertex(root.x + point.x, root.y + point.y);
        }
    });
    p5.endShape();
}

const getBezierShower = (p5) => {
    const showBezier = (points, root) => {
        p5.beginShape();
        points.forEach((point) => {
            if (point.firstPull && point.seccendPull) {
                p5.bezierVertex(
                    root.x + point.firstPull.x,
                    root.y + point.firstPull.y,
                    root.x + point.seccendPull.x,
                    root.y + point.seccendPull.y,
                    root.x + point.x,
                    root.y + point.y
                );
            } else {
                p5.vertex(root.x + point.x, root.y + point.y);
            }
        });
        p5.endShape();
    }

}
const creatureReduser = (state, action) => {
    if (action.type === 'go') {
        const angle = state.getTan(state.location, action.target);
        return { ...state, target: action.target, moving: true, angle: angle };
    } else if (action.type === 'move') {
        const tempState = { ...state };
        // Check if movement is enabled and the current position is not the target position
        if (!state.moving || !isSamePoint(state.location, state.target)) return;
        const moveBySpeed = () => {
            tempState.location.x += tempState.p5.map(tempState.speed, 0, tempState.angle.t, 0, tempState.angle.x);
            tempState.location.y += tempState.p5.map(tempState.speed, 0, tempState.angle.t, 0, tempState.angle.y);
        }

        // Toggle the walk state

        // Calculate distances
        const distanceToTarget = state.dist(state.location, state.target);

        // Adjust speed based on distance traveled
        if (distanceToTarget < 50) {
            tempState.speed--;
        } else if (state.addSpeed * 10 > state.speed) {
            tempState.speed += tempState.addSpeed;
        }

        // Apply the calculated speed
        moveBySpeed();

        // Check if the target is reached
        if (tempState.p5.abs(distanceToTarget) < 10) {
            tempState.location = tempState.target;
            tempState.moving = false;
            tempState.speed = 1;
        }
        return tempState;
    }
}

const getItemsBySkin=(skin)=>{
    const Items = {};
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
export const useCreature = (p5, v1, v2, v3, v4) => {
    const [p5, setP5] = useState(p5);
    const [skin, _setSkin] = useState({v1:v1, v2:v2, v3:v3, v4:v4});
    const [Items, setItems] = useState(getItemsBySkin(skin));
    const [creatureState, creatureDispatch] = useReducer(creatureReduser, {
        p5: p5,
        Items: Items,
        location: { x: p5.windowWidth / 2, y: p5.windowHeight / 2 },
        target: { x: p5.windowWidth / 2, y: p5.windowHeight / 2 },
        moving: false,
        speed: 1,
        addSpeed: 1,
        angle: { x: 0, y: 0, t: 0 },
        roots: {},
        dist: (fromPoint, toPoint) => {
            return p5.dist(fromPoint.x, fromPoint.y, toPoint.x, toPoint.y);
        },
        getTan: (fromPoint, toPoint) => {
            const t = p5.dist(fromPoint.x, fromPoint.y, toPoint.x, toPoint.y);
            return { x: toPoint.x - fromPoint.x, y: toPoint.y - fromPoint.y, t: t };
        }
    });
    const setSkin = (v1, v2, v3, v4)=>{
        _setSkin({v1:v1, v2:v2, v3:v3, v4:v4});
    }
    const showBezier = getBezierShower(p5);
    const showCircle = (points, root) => {
        for (let point of points) {
            const drowPoint = addPointPair(root, point);
            p5.circle(drowPoint.x, drowPoint.y, point.r);
        }
    }

    const creature = () => { };
    creature.state = creatureState;
    creature.go = (target) => creatureDispatch({ type: 'go', target: target });
    creature.move = () => creatureDispatch({ type: 'move' });
    creature.show = () => {
        for (let key of Object.keys(creatureState.roots)) {
            if (key in creatureState.Items) {
                const itemsArray = creatureState.Items[key];
                if (!itemsArray) return;
                for (let item of itemsArray) {
                    const drawPoint = addPointPair(creatureState.location, creatureState.roots[key]);
                    if (item.type == 'bezier') {
                        showBezier(item.points, drawPoint);
                    } else if (item.type == 'circle') {
                        showCircle(item.points, drawPoint);
                    }
                }
            }
        }
        creature.move();
    }
    return [creature, setP5, setSkin];
}