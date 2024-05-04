const proxyFetcher = (baseurl,initConfiger=(object={})=>object)=>{
    const BASEURL = baseurl;
    const fetcher = async(apiUrl,init)=>{
        const initData = init?initConfiger(init):initConfiger({});
    //   return await fetch(`/api/${BASEURL}${apiUrl}`,initData).catch(error=>console.log(error));
      return await fetch(`${BASEURL}${apiUrl}`,initData).catch(error=>console.log(error));
    }
    return fetcher
  }
  
  
  export { proxyFetcher };