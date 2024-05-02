import { useState, useEffect, useRef } from "react";
import JBPM from '../modules/jbpm';

type jbpmDate = {
    "java.util.Date": number
}

type task = {
    "task-id": number,
    "task-name": string,
    "task-subject": string,
    "task-description": string,
    "task-status": "Ready"|"InProgress"|"Completed"|"Failed"|string,
    "task-priority": number,
    "task-is-skipable": null|boolean,
    "task-actual-owner": string,
    "task-created-by": string,
    "task-created-on": jbpmDate,
    "task-activation-time": jbpmDate,
    "task-expiration-time": null|jbpmDate,
    "task-proc-inst-id": number,
    "task-proc-def-id": string,
    "task-container-id": string,
    "task-parent-id": null|number,
    [key: string]: unknown
}

type processInstance = {
    'process-instance-id': number,
    'process-id': string,
    'process-name': string,
    'process-version': string,
    'process-instance-state': number,
    'container-id': string,
    'initiator': string,
    'start-date': jbpmDate,
    "active-user-tasks" : {
        "task-summary" : task[]
    }|null,
    [key: string]: unknown

}

type formProperty = {
    "name": string,
    "typeInfo": {
      "type": string,
      "className": string,
      "multiple": boolean,
    },
    [key: string]: unknown
  };
type formfield = {
    "id": string,
    "name":string,
    "label": string,
    "required": boolean,
    "readOnly": boolean,
    "validateOnChange": boolean,
    "binding": string,
    "standaloneClassName": string,
    "code": string,
    "serializedFieldClassName": string,
    [key: string]: unknown
  }
type form = {
      "id": string,
      "name": string,
      "model": {
        "taskName": string,
        "processId": string,
        "properties": formProperty[],
        [key: string]: unknown
      },
      "fields": formfield[],
      [key: string]: unknown
    }


const getForm = async(inputData:task)=>{
    const form:form = await JBPM.getTaskForm(inputData["task-id"]).then(result => result?.json()).then(json => json);
    return form;
}


const getProcessInstance = async (ProcessInstanceID: string | number) => {
    const processInstance:processInstance = await JBPM.getProcessInstance(ProcessInstanceID).then(result => result?.json()).then(json => json);
    return processInstance;
}
const postAndGetProcessInstance = async () => {
    const processInstance:processInstance = await JBPM.getProcessInstanceID().then(id => getProcessInstance(id));
    return processInstance;
};

const pushTask = async (task:task|undefined, body:object) => {
    if (!task) { return 'done'; }
    body = body ? body : {};
    if (task['task-status'] == `Ready`) {
        return await JBPM.putTasksStarted(task['task-id'], body).catch(error => console.log(error));
    } else {
        // if(task['task-status']==`InProgress`)
        return await JBPM.putTasksCompleted(task['task-id'], body).catch(error => console.log(error));
    }
}

const useJbpm = () => {
    const imageRef = useRef<HTMLImageElement>();
    const [jbpm, setJbpm] = useState({
        process: {},
        image: imageRef,
    });
    const makeImageRef = (imageStr:string|undefined) => {
        imageRef.current?imageRef.current.innerHTML=imageStr?imageStr:``:{};
        return imageRef
    };

    const setProcess = async (processInstance?:processInstance) => {
        if (processInstance) {
            const process = processInstance;
            const imageStr = await JBPM.getImage(processInstance['process-instance-id']).then(result => result?.text());
            setJbpm({ process: process, image: makeImageRef(imageStr) ,});
        } else {
            console.log(`clean`);
            setJbpm({
                process: {},
                image: makeImageRef(``),
            });
        }

    }
    
    const addProcess = (processInstance) => {
        setProcess(processInstance);
    };
    const cleanProcess = () => {
        console.log(`cleanProcess`);
        setProcess();
    };
    const reflashProcess = async () => {
        const processInstance = await getProcessInstance(jbpm.process['process-instance-id']);
        setProcess(processInstance);
    };
    const getFirstUnCompletedTask = ()=>{
        const tasks:task[] = jbpm.process["active-user-tasks"];
        for(let task of tasks){
            if(task["task-status"]=="Ready"||task["task-status"]=="InProgress"){
                return task;
            }
        }
    }
    const pushFirstTask = async (body:object) => {
        const task = getFirstUnCompletedTask();
        return pushTask(task, body).then((result) => {
            result == `done` ? cleanProcess() : reflashProcess();
        });
    };
    const creatProcessInstance = () => {
        console.log(`In creatProcessInstance`);
        postAndGetProcessInstance().then(processInstance => addProcess(processInstance))
    };

    return [jbpm, creatProcessInstance, pushFirstTask, getForm];
}
export { useJbpm ,processInstance, task, form};