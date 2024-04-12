import ProcessInstance from "./ProcessInstance"
import { useState, useEffect } from "react";
import JBPM from './modules/jbpm';

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
