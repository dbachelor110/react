import {useState} from "react"
import PropTypes from "prop-types"
const copy = (OB)=>{
    const valueArry = Object.keys(OB).map(key => [key, OB[key]]);
    const kargs = valueArry.reduce((pv, cv) => {
        pv[cv[0]] = cv[1];
        return pv;
    },{});
    return kargs;
};
function ProcessInstance(props){
    return (<div className="processInstance">
                <h1 className="id">{props.id}</h1>
                <h2>{props.processName}</h2>
            </div>);
}
Lover.propTypes = {
    id:PropTypes.number,
    processName:PropTypes.string,
}

export default ProcessInstance