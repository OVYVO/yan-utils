const localStorage = window.localStorage
// 格式化参数
const formatParams = (data)=>{
  let arr=[];
  for(let key in data){
    arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
  }
  return arr.join("&");
}
// ajax封装
const ajax = (options = {})=>{
  let xhr = null
  // 创建ajax对象(兼容)
  if( window.XMLHttpRequest ){
    xhr = new XMLHttpRequest()
  }else if(window.ActiveObject){
    // eslint-disable-next-line no-undef
    xhr = new ActiveXobject('Microsoft.XMLHTTP')
  }
  xhr.open("post",options.url,true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
  xhr.send(options.data);
  // 请求过期时间
  const timer = setTimeout(()=>{
    if(xhr.readySate!=4){xhr.abort();}
  },options.timeout)
  // 请求结果
  xhr.onreadystatechange = ()=>{
    if(xhr.readyState == 4){
      let status=xhr.status
      if(status >= 200 && status<300 || status == 304){
        options.success && options.success(xhr.responseText,xhr.responseXML);
        clearTimeout(timer)
      }else{
        options.error && options.error(status);
        clearTimeout(timer)
      }
    }
  }
}
// localStorage存值
const setLocalData = (key, value, maxAge = 60 * 24 * 7)=> {
  const data = {
    value,
    maxAge: maxAge * 60000,
    timestamp: Date.now(),
  }
  localStorage.setItem(key, JSON.stringify(data))
}
// localStorage取值
const getLocalData = (key)=> {
  try {
    const dataStr = localStorage.getItem(key)
    if (!dataStr) return null
    const { value, maxAge, timestamp } = JSON.parse(dataStr)
    const data = maxAge + timestamp > Date.now() ? value : null
    if (!data) localStorage.removeItem(key)
    return data
  } catch (e) {
    localStorage.removeItem(key)
    return null
  }
}
// 获取cookie值
const getCookie = (key) => {
  const cookieArray = window.document.cookie.replace(/\s/g, "").split(';')
  const cookieObject = {}
  cookieArray.forEach(item => {
    let objArr = item.split("=");
    cookieObject[objArr[0]] = decodeURIComponent(objArr[1])
  })
  if (key) {
    return cookieObject[key]
  } else {
    return cookieObject
  }
}

class dataMonitor{
  constructor(options){
    this.reportUrl = options.reportUrl //上报地址
    this.reportTime = options.reportTime //上报时间间隔
    this.reportcodeMap = options.reportcodeMap //code映射关系
  }
  //初始化
  init(obj){
    window.dataMonitor = obj
    console.log('DataMonitor is runing')
    setLocalData('monitordata',[])
    setInterval(()=>{
      const payload = getLocalData('monitordata')
      this.dataReport(payload)
    },this.reportTime)
  }
  // 数据上报
  dataReport(val){
    if(!val.length) return
    ajax({
      url: this.reportUrl,
      type:'post',
      data: formatParams({monitordata:val}),
      dataType: "json", 
      timeout: 10000,
      contentType: "application/json",
      success:()=>{
        // 上报成功，清空事件栈数据
        setLocalData('monitordata',[])
      },
      error:(e)=>{
        console.log(e);
      }
    })
  }
  // 数据添加
  trackEvent(name,params){
    const eventItem = {
      code: this.reportcodeMap[name],
      s_token: getCookie('s_token') || '',
      parm: {...params}
    }
    let monitordataCopy = getLocalData('monitordata') || []
    monitordataCopy.push(eventItem)
    setLocalData('monitordata',monitordataCopy)
  }
}

export default dataMonitor