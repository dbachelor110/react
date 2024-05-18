import React, { useState, useRef } from "react";
import { processInstance, task} from "./hooks/useJbpm";
import Board from "./Board";
type processInstanceProps={
    id:number,
    processName:string,
    image:any,
    data:processInstance,
}
function ProcessInstance(props:processInstanceProps){
    const image = `<div>${props.image}</div>`;
    return (<div className="processInstance">
                <h1 className="title">Process Instance</h1>
                <h2 className="id">ID: {props.id}</h2>
                <h2>Name: {props.processName}</h2>
                <div title={`/server/containers/${props.data['container-id']}/images/processes/instances/${props.id}`} ref={props.image}></div>
                <Board data={props.data}></Board>
            </div>);
}

export default ProcessInstance