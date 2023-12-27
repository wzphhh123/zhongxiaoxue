import http from "@/common/request";
const url = require("../url");

//登录
export function JWTToken(params) {
    return http.get(url.JWTToken, params)
}
//人员统计
export function showfindAllUser(params) {
    return http.get(url.showfindAllUser, params)
}

//软件使用占比
export function SoftwareFindAll(params) {
    return http.get(url.SoftwareFindAll, params)
}

//区域管理
export function AreaFindAll(params) {
    return http.get(url.AreaFindAll, params)
}

//区域管理展示
export function findAllSoftware(params) {
    return http.get(url.findAllSoftware, params)
}

//健康体验管理
export function showHealthy(params) {
    return http.get(url.showHealthy, params)
}

//电量管理
export function findAllElectricity(params) {
    return http.get(url.findAllElectricity, params)
}

//体验中心管理
export function findAllShow(params) {
    return http.get(url.findAllShow, params)
}


// 健康检测
export function healthrecordQuery(data) {
    return http.post(url.healthrecordQuery, data)
}