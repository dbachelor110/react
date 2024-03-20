import PropTypes from 'prop-types'
const STYLE = {
    font: `1.5em bold sans-serif`
}

const toDay = new Date()
function Project({name, date}){
    let project = 
    <div className="Project">
        <h1 style={STYLE}>{name}</h1>
        <p>{date}</p>
    </div>
    return project
}

Project.propTypes = {
    name: PropTypes.string,
    date: PropTypes.number,
}

Project.defaultProps = {
    name: `Project Name`,
    date: toDay.getUTCFullYear()*10000 + toDay.getMonth()*100 + toDay.getDate(),
}

export default Project