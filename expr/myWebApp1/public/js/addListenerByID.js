const addListenerByID=(id,type,listener)=>{
    const element=document.getElementById(id);
    // early return
    if (element == null) {
      console.log(`Unfinded ${id} > Early return.`);
      return;
    }
    element.addEventListener(type,listener);
  }
export { addListenerByID };