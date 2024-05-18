import React from "react";
import { processInstance, task} from "./hooks/useJbpm";
const itemStyle = {
    padding: `0.5rem 0.2rem`,
    display: `flex`,
    'justifyContent': `space-around`,
}

const unitStyle = {
    width: `50%`,
}

const boardStyle = {
    padding: `1rem 0`,
}
const configObject = (OB:processInstance) => {
    return Object.entries(OB).reduce((p, c) => {
        const key = c[0].replace(/-/g, '');
        console.log(key);
        const value = typeof c[1] == 'object' ? JSON.stringify(c[1]) : c[1];
        p[key] = value;
        return p;
    }, {});
}

const objectToBoard = (processInstance:processInstance) => {
    // const noDashObject = configObject(OB);
    // console.log(noDashObject);
    // if (Object.entries(noDashObject).length == 0) { return [] }
    // const { processinstanceid, processname, processinstancestate, containerid, ...kargs } = noDashObject;
    // const selectObject = { InstanceidID: processinstanceid, Name: processname, State: processinstancestate, ContainerID: containerid };
    // const selectObject = { State: processinstancestate, ContainerID: containerid };
    const selectAttrs = Object.entries(processInstance);
    if (selectAttrs.length == 0) { return [] }

    const attrs = selectAttrs.map((pair) => {
        const [key, preValue] = pair;
        const value = typeof preValue == 'object' ? JSON.stringify(preValue) : preValue;
        return <div className="attr" style={itemStyle} key={key}>
            <div className="key" key={`${key}:key`} style={unitStyle}>{key}</div>
            <div className="value" key={`${key}:value`} style={unitStyle}>{value}</div>
        </div>;
    });
    return attrs;
}
type BoardProps = {
    data:processInstance,
}
function Board(props:BoardProps) {
    return <div className="board" style={boardStyle}>{objectToBoard(props.data)}</div>;
}

export default Board