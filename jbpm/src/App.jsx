import ProcessInstance from "./ProcessInstance"
import { useState, useEffect } from "react";
const JBPMBASEURL = `http://192.168.51.208:8086/kie-server/services/rest`;
const containerID = `base_1.0.0-SNAPSHOT`;
const processID = `base.choose`;
const username = `wbadmin`;
const password = `wbadmin`;
const JBPMFetcher = (jbpmbaseurl)=>{
  const BASEURL = jbpmbaseurl;
  const fetcher = async(apiUrl,init)=>{
    return await fetch(`/jbpm${apiUrl}`,init).catch(error=>console.log(error));
    // return await fetch(`/api/${JBPMBASEURL}${apiUrl}`,init).catch(error=>console.log(error));
  }
  return fetcher
}
// Buffer.from(`${username}:${password}`, "utf-8").toString("base64")
const FetchINIT = ({headers={'accept':`application/json`,'Content-Type':`application/json`,'Authorization':`Basic ${btoa(`${username}:${password}`)}`},method=`GET`,...kargs})=>{
  const init ={
    headers: headers,
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    ...kargs,
  }
  return init
};
const JBPM = JBPMFetcher(JBPMBASEURL);
const postProcessInstance=async()=>{
  return await JBPM(`/server/containers/${containerID}/processes/${processID}/instances`,FetchINIT({method:`POST`}));
};
const getTasks=async(processInstanceID)=>{
  return await JBPM(`/server/queries/tasks/instances/process/${processInstanceID}`,FetchINIT({}));
};
const putTasksStarted=async(taskInstanceID,body)=>{
  return await JBPM(`/server/containers/${containerID}/tasks/${taskInstanceID}/states/started`,FetchINIT({method:`PUT`,body:body}));
};
const putTasksCompleted=async(taskInstanceID,body)=>{
  return await JBPM(`/server/containers/${containerID}/tasks/${taskInstanceID}/states/completed`,FetchINIT({method:`PUT`,body:body}));
};
const getProcessInstanceID = async()=>{
  const ID = await postProcessInstance().then((result)=>result.text());
  console.log(`ID:`);
  console.log(ID);
  const intID = parseInt(ID);
  return intID;
};
function App() {
  const [pID, setPID] = useState(0);
  
  useEffect(() => {
      if(pID==0){
        setPID(-1);
        console.log(`useEffect now id = ${pID}`);
        getProcessInstanceID().then(id=>setPID(id));
      }
  }, []); // Empty dependency array ensures this effect runs only once on initial render

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ProcessInstance id={pID} processName={processID}></ProcessInstance>
      )}
      <ProcessInstance id={pID} processName={processID}></ProcessInstance>
    </>
  )
}

export default App

{/* {
  "task-summary" : [ {
    "task-id" : 39,
    "task-name" : "Choose Email or not.",
    "task-subject" : "Choose Email or not",
    "task-description" : "need input email as bool var.",
    "task-status" : "Ready",
    "task-priority" : 0,
    "task-is-skipable" : false,
    "task-actual-owner" : null,
    "task-created-by" : null,
    "task-created-on" : {
  "java.util.Date" : 1712557462193
},
    "task-activation-time" : {
  "java.util.Date" : 1712557462193
},
    "task-expiration-time" : null,
    "task-proc-inst-id" : 39,
    "task-proc-def-id" : "base.choose",
    "task-container-id" : "base_1.0.0-SNAPSHOT",
    "task-parent-id" : -1,
    "correlation-key" : "39",
    "process-type" : 1
  } ]
} */}
