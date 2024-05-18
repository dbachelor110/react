import ProcessInstance from "./ProcessInstance"
import { useJbpm,  } from "./hooks/useJbpm";

const itemStyle = {
  padding: `0.5rem 0.2rem`,
  display: `flex`,
  // 'justifyContent': `space-around`,
}

const unitStyle = {
  margin: `0 2rem 0 0`,
  width: `40%`,
}

const boardStyle = {
  padding: `1rem 0`,
}

const strToBool=(inputData=`true`)=>{
  const bools = {true:true,false:false};
  const lowerInput=inputData.toLowerCase();
  const boolValue=bools[lowerInput];
  return boolValue?boolValue:inputData;
}

const bodyObjectMaker = () => {
  const bodystr = document.getElementById('pushbody').value;
  const bodypares = bodystr.split(',').reduce((p, c) => {
    const pair = c.split('=');
    pair.length == 2 ? p[pair[0]] = strToBool(pair[1]): {};
    return p;
  }, {});
  return bodypares;
};

const makePushTitle=(inputTaskData)=>{
  const id = inputTaskData['task-id'];
  const status = inputTaskData['task-status'];
  const [lable,apiStatus] = status==`Ready`? [`start`,`started`]:[`complete`,`completed`];
  return {title:`/server/containers/base_1.0.0-SNAPSHOT/tasks/${id}/states/${apiStatus}`, lable:lable}
}

const pushButten=({title, lable, handler})=>{
  // lable==`complete`?
  return [
          <input style={unitStyle} type="text" name="" id="pushbody" />,
          <button title={title} style={unitStyle} onClick={handler} type="button">{lable}</button>
        ];
}

const makePushElement = (activeUserTasks, handler)=>{
  const{title, lable} = activeUserTasks?makePushTitle(activeUserTasks["task-summary"][0]):{title:`Clean up processes instances`,lable:`Clean up`};
  const button = pushButten({title,lable,handler});
  return button;
}

const Createbutton=(handler)=><button title={`/server/containers/base_1.0.0-SNAPSHOT/processes/base.choose/instances`} onClick={handler} type="button">Creat a Process Instance</button>;

function App() {
  const [JBPM, creatProcess, pushTask, getForm] = useJbpm();
  const pushTaskHandler = () => {
    pushTask(bodyObjectMaker());
  };

  return (
    <>
      <ProcessInstance id={JBPM.process['process-instance-id']} processName={JBPM.process['process-name']} image={JBPM.image} data={JBPM.process}></ProcessInstance>
      <div className="push" style={itemStyle}>
        {Object.keys(JBPM.process).length == 0 ? Createbutton(creatProcess) : makePushElement(JBPM.process["active-user-tasks"],pushTaskHandler)}
      </div>
    </>
  )
}

export default App
