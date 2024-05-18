import React, { useState, useRef } from "react";
import Board from "./Board";
type processInstance={
    id:number,
    processName:string,
    image:any,
    data:object,
}
function Task(props:processInstance){
    const image = `<div>${props.image}</div>`;
    return (<div className="processInstance">
                <h1 className="title">Process Instance</h1>
                <h2 className="id">ID: {props.id}</h2>
                <h2>Name: {props.processName}</h2>
                <div title={`/server/containers/${props.data['container-id']}/images/processes/instances/${props.id}`} ref={props.image}></div>
                <Board data={props.data}></Board>
            </div>);
}

export default Task