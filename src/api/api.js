import axios from '../utils/http'
// 登录
export function login(data){
    return axios.post("http://10.102.4.37:5678/login",data)
}
//获取周报
export function getWeekly(params){
    return axios.get("http://10.102.4.37:5678/weekly_reports",{
        params,
    })
}
//编辑周报
export function editWeekly(params){
    return axios({
        url: 'http://10.102.4.37:5678/weekly_reports',
        method: 'put',
        data: params,
        headers: {
          'Content-Type': 'application/json',
        },
      });
}
//添加周报
export function addWeekly(data){
    return axios.post("http://10.102.4.37:5678/weekly_reports",data)
}
//删除周报
export function delWeekly(params){
    return axios({
      url: 'http://10.102.4.37:5678/weekly_reports',
      method: 'delete',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    });

}