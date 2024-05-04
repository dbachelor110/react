import { proxyFetcher } from './fetcher';

// const JBPMBASEURL = `http://192.168.51.208:8086/kie-server/services/rest`;
const JBPMBASEURL = `/jbpm`;
const containerID = `base_1.0.0-SNAPSHOT`;
const processID = `base.choose`;
const username = `wbadmin`;
const password = `wbadmin`;

const headersMaker=({ accept=`application/json`, ContentType= `application/json`, Authorization= `Basic ${btoa(`${username}:${password}`)}`, ...kargs})=>{
    return { accept, 'Content-Type':ContentType, Authorization, ...kargs };
}

const FetchINIT = ({ headers, method = `GET`, ...kargs }) => {
    const init = {
        headers: headers?headersMaker(headers):headersMaker({}),
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        ...kargs,
    }
    return init
};

const _fetch = proxyFetcher(JBPMBASEURL, FetchINIT);
const postProcessInstance = async () => {
    return await _fetch(`/server/containers/${containerID}/processes/${processID}/instances`, { method: `POST` });
};
const getProcessInstance = async (processInstanceID) => {
    return await _fetch(`/server/containers/${containerID}/processes/instances/${processInstanceID}`);
};
const getTasks = async (processInstanceID) => {
    return await _fetch(`/server/queries/tasks/instances/process/${processInstanceID}`);
};

const getTaskForm = async (taskInstanceID) => {
    return await _fetch(`/server/containers/${containerID}/forms/tasks/${taskInstanceID}?lang=en&type=ANY&marshallContent=true`);
};

const putTasksStarted = async (taskInstanceID, body) => {
    return await _fetch(`/server/containers/${containerID}/tasks/${taskInstanceID}/states/started`, { method: `PUT`, body: JSON.stringify(body) });
};
const putTasksCompleted = async (taskInstanceID, body) => {
    return await _fetch(`/server/containers/${containerID}/tasks/${taskInstanceID}/states/completed`, { method: `PUT`, body: JSON.stringify(body) });
};
const getProcessInstanceID = async () => {
    const ID = await postProcessInstance().then((result) => result.text()).catch(error=>console.log(error));
    console.log(`ID:`);
    console.log(ID);
    const intID = parseInt(ID);
    return intID;
};

const getImage = async (processInstanceID) => {
    return await _fetch(`/server/containers/${containerID}/images/processes/instances/${processInstanceID}`,{headers:{'accept':'*/*','Content-Type': 'image/svg+xml'}});
};

export default { _fetch, postProcessInstance, getProcessInstance, getTasks, getTaskForm, putTasksStarted, putTasksCompleted, getProcessInstanceID, getImage };