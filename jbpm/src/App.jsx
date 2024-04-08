import ProcessInstance from "./ProcessInstance"
import { useState } from "react";
const JBPMBASEURL = `http://192.168.51.208:8086/kie-server/services/rest`;
const containerID = `base_1.0.0-SNAPSHOT`;
const processID = `base.choose`;
const getJBPMFetcher = (jbpmbaseurl)=>{
  const BASEURL = jbpmbaseurl;
  const fetcher = async(apiUrl,init)=>{
    return await fetch(`/get/${JBPMBASEURL}${apiUrl}`,init);
  }
  return fetcher
}
const FetchINIT = ({headers={'Content-Type':`application/json`,},method=`GET`,...kargs})=>{
  const init ={
    headers: headers,
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    ...kargs,
  }
  return init
};
const JBPM = getJBPMFetcher(JBPMBASEURL);
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

const ProcessInstanceID = postProcessInstance().then((result)=>result.text());

function App() {
  const {pID, setPID} = useState(0);
  return (
    <>
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
