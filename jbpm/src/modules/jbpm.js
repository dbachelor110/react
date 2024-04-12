import { proxyFetcher } from './fetcher';

const JBPMBASEURL = `http://192.168.51.208:8086/kie-server/services/rest`;
const containerID = `base_1.0.0-SNAPSHOT`;
const processID = `base.choose`;
const username = `wbadmin`;
const password = `wbadmin`;

const FetchINIT = ({ headers = { 'accept': `application/json`, 'Content-Type': `application/json`, 'Authorization': `Basic ${btoa(`${username}:${password}`)}` }, method = `GET`, ...kargs }) => {
    const init = {
        headers: headers,
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
const getTasks = async (processInstanceID) => {
    return await _fetch(`/server/queries/tasks/instances/process/${processInstanceID}`);
};
const putTasksStarted = async (taskInstanceID, body) => {
    return await _fetch(`/server/containers/${containerID}/tasks/${taskInstanceID}/states/started`, { method: `PUT`, body: body });
};
const putTasksCompleted = async (taskInstanceID, body) => {
    return await _fetch(`/server/containers/${containerID}/tasks/${taskInstanceID}/states/completed`, { method: `PUT`, body: body });
};
const getProcessInstanceID = async () => {
    const ID = await postProcessInstance().then((result) => result.text());
    console.log(`ID:`);
    console.log(ID);
    const intID = parseInt(ID);
    return intID;
};

export { _fetch, postProcessInstance, getTasks, putTasksStarted, putTasksCompleted, getProcessInstanceID };