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
function Lover(props){

    const [lover, setLover] = useState(()=>{
        const propsData = copy(props);
        return propsData;
    });
    
    const updateLover = ({id,display,point,description, ...kargs})=>{
        const newLover = {
            id: id ? id :lover.id,
            display: display ? display :lover.display,
            point: point ? point :lover.point,
            description: description ? description :lover.description
        };
        setLover(newLover);
    }

    const addPoint = add => {
        let newPoint = lover.point+add;
        updateLover({point:newPoint});
    };

    const hiddenInput = key => <input type="hidden" key={key} name={key} value={lover[key]}/>;
    const makeInputs = arry => arry.map(key => hiddenInput(key));
    return (<div className="lover">
                <h1 className="display">{lover.display}</h1>
                <h2>{lover.point}</h2>
                <button onClick={(e)=>addPoint(1)}>ADD</button>
                <button type="submit" form="lover">Send</button>
                <form id="lover" action="/get" method="post">
                    {makeInputs(Object.keys(lover))}
                </form>
            </div>);
}
Lover.propTypes = {
    id:PropTypes.number,
    display:PropTypes.string,
    point:PropTypes.number,
    description:PropTypes.string,
}
Lover.defaultProps = {
    display:`Lover`,
    description:``,
}

export default Lover