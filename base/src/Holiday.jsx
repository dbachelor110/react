// https://quality.data.gov.tw//dq_download_json.php?nid=145708&md5_url=c668969cc230c529ab9ec5700d9eab9e
// import PropTypes from 'prop-types'
// import { useState } from "react";
// const toDay = new Date()
// import 

// const client = axios.create({
//    baseURL: "https://jsonplaceholder.typicode.com/posts" 
// });
function Holiday(){
    // const [holidayData, setHolidayData] = useState([])
    fetch(`/gov/dq_download_json.php?nid=145708&md5_url=c668969cc230c529ab9ec5700d9eab9e`,{
        
        headers: new Headers({
            'Content-Type':`application/json`,
        }),
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
    })
    .then(function (response) {
        const data = response.text()
        console.log(data)
        // setHolidayData([data]);
    });
    fetch('/api/posts?_limit=10')
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
    fetch('/qas/workhour/week')
        .then((response) => response.json())
        .then((data) => {
        console.log(data);
        })
        .catch((err) => {
        console.log(err.message);
        });
    const project = 
    <div className="Holiday">
        {`holidayData`}
    </div>
    return project
}

// Project.propTypes = {
//     name: PropTypes.string,
//     date: PropTypes.number,
// }

// Project.defaultProps = {
//     name: `Project Name`,
//     date: toDay.getUTCFullYear()*10000 + toDay.getMonth()*100 + toDay.getDate(),
// }

export default Holiday