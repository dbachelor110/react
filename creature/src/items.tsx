import p5 from "p5";
export type Point = {
    x: number;
    y: number;
    [key: string]:unknown;
};
export type BezierVertex = Point & {
    firstPull?: undefined | Point;
    seccendPull?: undefined | Point;
}
export type PointsItems = {
    points?:{[key: string]:Point};
    show: (center: Point) => void;
};
export type ItemMap = { [key: string]: PointsItems };
export type Item = PointsItems[];

const makePoint = (x:number,y:number):Point=>({x:x, y: y});

const line = (fromPoint:Point, toPoint:Point)=>p5.prototype.line(fromPoint.x, fromPoint.y, toPoint.x, toPoint.y);

const getTextMarker = () => {
    let i = 0;
    const markPoint = (point: Point) => {
        p5.prototype.text(`${i}`, point.x - 5, point.y - 5);
        i += 1;
    }
    return markPoint
}
const addPointPair=(rootPoint:Point, addPoint:Point):Point=>{
    return {x: rootPoint.x+addPoint.x, y: rootPoint.y+addPoint.y};
};
const circle = (point:Point,R:number)=>{p5.prototype.circle(point.x,point.y,R)};
const drowPoints=(points:Point[],root:Point,drawer:(point:Point)=>void)=>{
    for(let point of points){
        drawer(addPointPair(root,point));
    }
}
const getBezierPointMarker = (point: BezierVertex, textMarker: (point: Point) => void = (point: Point) => { point }) => {
    let ExPoint: Point;
    const markBezierPoint = () => {
        if (point.firstPull && point.seccendPull && ExPoint) {
            p5.prototype.strokeWeight(5);
            p5.prototype.stroke(255, 0, 0);
            p5.prototype.point(point.firstPull.x, point.firstPull.y);
            p5.prototype.point(point.seccendPull.x, point.seccendPull.y);
            p5.prototype.strokeWeight(1);
            line(point.firstPull, ExPoint);
            line(point.seccendPull, point);
            p5.prototype.stroke(0, 0, 0);
            p5.prototype.strokeWeight(5);
            p5.prototype.point(point.x, point.y);
            p5.prototype.strokeWeight(1);
            textMarker(point.firstPull);
            textMarker(point.seccendPull);
            textMarker(point);
        }
        ExPoint = point;
    }
    return markBezierPoint;

}

const showBezier = (points: BezierVertex[], root: Point) => {
    p5.prototype.beginShape();
    points.forEach((point) => {
        if (point.firstPull && point.seccendPull) {
            p5.prototype.bezierVertex(
                root.x + point.firstPull.x,
                root.y + point.firstPull.y,
                root.x + point.seccendPull.x,
                root.y + point.seccendPull.y,
                root.x + point.x,
                root.y + point.y
            );
        } else {
            p5.prototype.vertex(root.x + point.x, root.y + point.y);
        }
    });
    p5.prototype.endShape();
}

const rightHands: ItemMap = {
    dic: {
        show: (center: Point = { x: 0, y: 0 }) => {
            const points = [{ "x": 0, "y": -16 }, { "x": -13.01, "y": 13.24, "firstPull": { "x": -5.47, "y": -5.13 }, "seccendPull": { "x": -9.89, "y": 4.850000000000001 } }, { "x": -14.89, "y": 18.58, "firstPull": { "x": -13.7, "y": 15.099999999999998 }, "seccendPull": { "x": -14.33, "y": 16.88 } }, { "x": -16.43, "y": 38.68, "firstPull": { "x": -18.59, "y": 29.769999999999996 }, "seccendPull": { "x": -19.37, "y": 37.22 } }, { "x": 10.510000000000002, "y": -9.740000000000002, "firstPull": { "x": -11.2, "y": 41.29 }, "seccendPull": { "x": 0.6799999999999997, "y": 26.259999999999998 } }];
            showBezier(points, center);
        }
    }
}
const leftHands: ItemMap = {
    dic:{
        show: (center: Point = { x: 0, y: 0 }) => {
            const points = [{ "x": -10, "y": 5 }, { "x": 10.11, "y": 30.47, "firstPull": { "x": 0.6300000000000008, "y": 23.11 }, "seccendPull": { "x": 4.91, "y": 33.47 } }, { "x": 0.879999999999999, "y": -18.410000000000004, "firstPull": { "x": 18.09, "y": 25.869999999999997 }, "seccendPull": { "x": 10.87, "y": -4.630000000000003 } }];
            showBezier(points, center);
        }
    }
}
const rightLegs: ItemMap = {
    dic:{
        show: (center: Point = { x: 0, y: 0 }) => {
            const points = [{ "x": 10, "y": 10 }, { "x": -1.0299999999999994, "y": 30.08, "firstPull": { "x": 7.9399999999999995, "y": 27.62 }, "seccendPull": { "x": 14.49, "y": 29.9 } }, { "x": -12.42, "y": -7.740000000000002, "firstPull": { "x": -12.51, "y": 30.209999999999997 }, "seccendPull": { "x": -15.85, "y": 30.419999999999998 } }];
            showBezier(points, center);
        }
    }
}
const leftLegs: ItemMap = {
    dic:{
        show: (center: Point = { x: 0, y: 0 }) => {
            const points = [{ "x": -10, "y": 10 }, { "x": 1.7200000000000006, "y": 30.08, "firstPull": { "x": -7.8100000000000005, "y": 27.62 }, "seccendPull": { "x": -14.77, "y": 29.9 } }, { "x": 13.770000000000001, "y": -17.46, "firstPull": { "x": 13.92, "y": 30.209999999999997 }, "seccendPull": { "x": 17.64, "y": 32.059999999999995 } }];
            showBezier(points, center);
        }
    }
}
const heads: ItemMap = {
    dic: {
        show: (center: Point = { x: 0, y: 0 }) => {
            const points = [{ "x": 29.1, "y": 77.34 }, { "x": 16, "y": 106.58, "firstPull": { "x": 23.630000000000003, "y": 88.21000000000001 }, "seccendPull": { "x": 19.21, "y": 98.19 } }, { "x": 14.210000000000004, "y": 111.92, "firstPull": { "x": 15.400000000000004, "y": 108.44 }, "seccendPull": { "x": 14.770000000000003, "y": 110.22 } }, { "x": 12.670000000000005, "y": 132.02, "firstPull": { "x": 10.510000000000005, "y": 123.11 }, "seccendPull": { "x": 9.730000000000004, "y": 130.56 } }, { "x": 39.61000000000001, "y": 83.60000000000001, "firstPull": { "x": 17.900000000000006, "y": 134.63000000000002 }, "seccendPull": { "x": 29.780000000000005, "y": 119.60000000000001 } }];
            showBezier(points, center);
        }
    }
}
const bodys: ItemMap = {
    dic: {
        points:{
            rightHand:makePoint(-50,-80),
            accessorie:makePoint(-5,-155),
            body:makePoint(0,-40),
            mouth:makePoint(-10,-140),
            rightLeg:makePoint(-35,-30),
            leftLeg:makePoint(35,-30),
            leftHand:makePoint(50,-80),
        },
        show: (center: Point = { x: 0, y: 0 }) => {
            const points = [{ "x": -50, "y": -50 }, { "x": -31.3, "y": -112.65, "firstPull": { "x": -52.01, "y": -96.12 }, "seccendPull": { "x": -43.04, "y": -106.58 } }, { "x": 35.18000000000001, "y": -104.68, "firstPull": { "x": -12.71, "y": -122.25 }, "seccendPull": { "x": 17.09, "y": -117.65 } }, { "x": 49.31000000000001, "y": 13.919999999999987, "firstPull": { "x": 62.24000000000001, "y": -85.29 }, "seccendPull": { "x": 61.39000000000001, "y": 2.509999999999991 } }, { "x": -47.12999999999999, "y": 14.239999999999988, "firstPull": { "x": 35.44000000000001, "y": 27.009999999999987 }, "seccendPull": { "x": -33.929999999999986, "y": 25.54999999999999 } }, { "x": -49.999999999999986, "y": -50.00000000000001, "firstPull": { "x": -53.50999999999999, "y": 8.779999999999987 }, "seccendPull": { "x": -48.73, "y": -20.76 } }];
            showBezier(points, center);
        }
    },
    dicDodo: {
        show: (center: Point = { x: 0, y: 0 }) => {
            const points = [{ "x": 25, "y": -25 }, { "x": -11, "y": 10.57, "firstPull": { "x": 25, "y": -5.149999999999999 }, "seccendPull": { "x": 21.05, "y": 11.159999999999997 } }, { "x": -38.620000000000005, "y": -25, "firstPull": { "x": -28.56, "y": 10.25 }, "seccendPull": { "x": -38.620000000000005, "y": -5.15 } }, { "x": -11.000000000000004, "y": -61.31, "firstPull": { "x": -38.620000000000005, "y": -44.85 }, "seccendPull": { "x": -28.570000000000004, "y": -61.31 } }, { "x": 24.999999999999996, "y": -25, "firstPull": { "x": 6.569999999999997, "y": -61.31 }, "seccendPull": { "x": 24.999999999999996, "y": -50.1 } }];
            showBezier(points, center);
        }
    }
}
const mouths: ItemMap = {
    dic: {
        show: (center: Point = { x: 0, y: 0 }) => {
            const points = [{ "x": -7, "y": 0 }, { "x": -3.93, "y": -4.36, "firstPull": { "x": -5.66, "y": -3.62 }, "seccendPull": { "x": -4.63, "y": -4.39 } }, { "x": -0.5700000000000003, "y": -1.1300000000000003, "firstPull": { "x": -2.5700000000000003, "y": -4.300000000000001 }, "seccendPull": { "x": -2.1900000000000004, "y": -1.2800000000000002 } }, { "x": 3.79, "y": -4.2700000000000005, "firstPull": { "x": 1.1799999999999997, "y": -0.9700000000000003 }, "seccendPull": { "x": 2.15, "y": -4.390000000000001 } }, { "x": 6.51, "y": -0.16000000000000014, "firstPull": { "x": 4.53, "y": -4.220000000000001 }, "seccendPull": { "x": 5.5, "y": -3.4400000000000004 } }];
            showBezier(points, center);
        }
    }
}
const accessories: ItemMap = {
    horn: {
        show: (center: Point = { x: 0, y: 0 }) => {
            const points = [{ "x": -5, "y": 0 }, { "x": 1.25, "y": -27.07, "firstPull": { "x": -3.3200000000000003, "y": -9.67 }, "seccendPull": { "x": -0.4500000000000002, "y": -27.76 } }, { "x": 5.68, "y": -0.7300000000000004, "firstPull": { "x": 4.24, "y": -25.88 }, "seccendPull": { "x": 4.539999999999999, "y": -10.080000000000002 } }, { "x": -5, "y": 0.009999999999999565, "firstPull": { "x": 6.09, "y": 2.6199999999999997 }, "seccendPull": { "x": -5.6, "y": 3.46 } }];
            showBezier(points, center);
        }
    }
}
const eyes: ItemMap = {
    circle: {
        show: (center: Point = { x: 0, y: 0 }) => {
            const points = [{ "x": 0, "y": 0 }];
            const drowEye=(point:Point)=>circle(point,5);
            drowPoints(points,center,drowEye);
        }
    },
    line: {
        show: (center: Point = { x: 0, y: 0 }) => {
            const points = [{ "x": -5, "y": 0 },{ "x": 5, "y": 0 }];
            showBezier(points, center);
        }
    }
}

// const items=;

export default { p5, addPointPair, rightHands, leftHands, rightLegs, leftLegs, heads, bodys, mouths, eyes, accessories };