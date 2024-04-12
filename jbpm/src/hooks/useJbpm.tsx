import { useState, useEffect } from "react";
import JBPM from '../modules/jbpm';
interface processInstance {
    'process-instance-id': number;
    'process-id': string;
    'process-name': string;
    'process-version': string;
    'process-instance-state': number;
    'container-id': string;
    'initiator': string;
    'start-date': {
        'java.util.Date': number,
    };
}
interface jbpmBoard {
    processInstances: processInstance[];
    focuseProcessInstance: processInstance;
}
const useJbpm = () => {
    const jbpm = {};
}