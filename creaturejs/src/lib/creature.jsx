import { items } from "./items";
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
class Creatures {
    constructor(p5, Items) {
        this.p5 = p5;
        this.Items = Items;
        this.location = { x: p5.windowWidth / 2, y: p5.windowHeight / 2 };
        this.target = { x: p5.windowWidth / 2, y: p5.windowHeight / 2 };
        this.moving = false;
        this.speed = 1;
        this.addSpeed = 1;
        this.angle = { x: 0, y: 0, t: 0 };
        this.roots = {}
        if (this.Items.body) {
            for (let item of this.Items.body) {
                item.roots?this.roots = item.roots:{};
            }
        }
        console.log(`this.roots:`);
        console.info(this.roots);
        console.log(`this.Items:`);
        console.info(this.Items);
    }
    dist = (aPoint, bPoint) => {
        return this.p5.dist(aPoint.x, aPoint.y, bPoint.x, bPoint.y);
    };
    getTan = (fromPoint, toPoint) => {
        const t = this.dist(fromPoint, toPoint);
        return { x: toPoint.x - fromPoint.x, y: toPoint.y - fromPoint.y, t: t };
    };
    showBezier = (points, root) => {
        showBezier(this.p5, points, root);
    };
    showCircle = (points, root) => {
        for (let point of points) {
            const drowPoint = addPointPair(root, point);
            this.p5.circle(drowPoint.x, drowPoint.y, point.r);
        }
    };

    go = (target) => {
        this.target = target;
        this.moving = true;
        this.angle = this.getTan(this.location, this.target);
    };
    move = () => {

        // Check if movement is enabled and the current position is not the target position
        if (!this.moving || !isSamePoint(this.location, this.target)) return;

        // Toggle the walk state

        // Calculate distances
        const distanceToTarget = dist(this.location, this.target);

        // Adjust speed based on distance traveled
        if (distanceToTarget < 50) {
            this.speed--;
        } else if (this.addSpeed * 10 > this.speed) {
            this.speed += this.addSpeed;
        }

        // Apply the calculated speed
        this.moveBySpeed();

        // Check if the target is reached
        if (this.p5.abs(distanceToTarget) < 10) {
            this.location = this.target;
            this.moving = false;
            this.speed = 1;
        }
    }

    moveBySpeed = () => {
        this.location.x += this.p5.map(this.speed, 0, this.angle.t, 0, this.angle.x);
        this.location.y += this.p5.map(this.speed, 0, this.angle.t, 0, this.angle.y);
    }

    show = () => {
        for (let key of Object.keys(this.roots)) {
            if (key in this.Items) {
                const itemsArray = this.Items[key];
                if (!itemsArray) return;
                for (let item of itemsArray) {
                    const drawPoint = addPointPair(this.location, this.roots[key]);
                    if (item.type == 'bezier') {
                        this.showBezier(item.points, drawPoint);
                    } else if (item.type == 'circle') {
                        this.showCircle(item.points, drawPoint);
                    }
                }
            }
        }
        this.move();
    }
}
export const getCreature = (p5, v1, v2, v3, v4) => {
    const Items = {};
    // head & body
    if (v1 > 1) {
        Items.head = [items.heads.dic];
    } else {
        Items.body = [items.bodys.dic, items.bodys.dicDodo];
    }

    // accessorie
    if (v2 > 1) {
        Items.accessorie = [items.accessories.horn];
    }

    // Hand & Leg
    if (v3 > 1) {
        Items.leftHand = [items.leftHands.dic];
        Items.rightHand = [items.rightHands.dic];
        Items.leftLeg = [items.leftLegs.dic];
        Items.rightLeg = [items.rightLegs.dic];
    }

    // Eye & Mouth
    if (v4 > 1) {
        Items.leftEye = [items.eyes.circle];
        Items.rightEye = [items.eyes.circle];
        Items.mouth = [items.mouths.dic];
    }
    const creature = new Creatures(p5, Items);
    return creature;
}