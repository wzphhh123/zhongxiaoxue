import http from "@/common/request"
const url = require('../url')

// 登录
export function JWTToken(data) {
    return http.post(url.JWTToken, data);
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

//      后台管理    //////
// 电量管理
export function electricity(params) {
    return http.get(url.electricity, params);
}
// 添加编辑电量
export function addEditelectricity(data) {
    return http.post(url.addEditelectricity, data);
}
// 删除电量
export function electricityDelete(params) {
    return http.delete(url.electricityDelete, params);
}
// 获取全部软件列表
export function softwareAll(params) {
    return http.get(url.softwareAll, params);
}
// 获取软件列表
export function softwarepage(params) {
    return http.get(url.softwarepage, params);
}

// 添加软件
export function softwareAdd(data) {
    return http.post(url.softwareAdd, data);
}
// 删除软件
export function softwareDelete(params) {
    return http.delete(url.softwareDelete, params);
}

// 获取区域列表
export function districtpage(params) {
    return http.get(url.districtpage, params);
}
// 添加编辑区域
export function districtsave(data) {
    return http.post(url.districtsave, data);
}
// 查询区域列表
export function districtfindAll(params) {
    return http.get(url.districtfindAll, params);
}
// 删除区域
export function regionDelete(params) {
    return http.delete(url.regionDelete, params);
}

// 获取用户健康列表
export function userhealth(params) {
    return http.get(url.userhealth, params);
}
// 添加编辑健康
export function addEditHealth(data) {
    return http.post(url.addEditHealth, data);
}
// 删除健康
export function userhealthDelete(params) {
    return http.delete(url.userhealthDelete, params);
}
// 获取位置列表
export function placepage(params) {
    return http.get(url.placepage, params);
}
// 添加编辑地域
export function addEditPlace(data) {
    return http.post(url.addEditPlace, data);
}
// 删除地域
export function placeDelete(params) {
    return http.delete(url.placeDelete, params);
}
// 机构列表查询
export function ydtywebuseradmin(params){
    return http.get(url.ydtywebuseradmin,params)
}
// 修改添加机构
export function useradminregister(data){
    return http.post(url.useradminregister,data)
}
// 删除机构
export function Delydtywebuseradmin(params){
    return http.delete(url.Delydtywebuseradmin,params)
}
// 获取展馆列表
export function areapage(params) {
    return http.get(url.areapage, params);
}
// 添加展馆
export function areaAdd(data) {
    return http.post(url.areaAdd, data);
}
// 删除展馆
export function areaDelete(params) {
    return http.delete(url.areaDelete, params);
}
// 获取展馆所有
export function areaAll(params) {
    return http.get(url.areaAll, params);
}
// 获取省市区
export function deploydistrictfindAll(params) {
    return http.get(url.deploydistrictfindAll, params);
}
// 添加
export function deploydistrictAdd(data) {
    return http.post(url.deploydistrictAdd, data);
}
// 删除
export function deploydistrictDelete(params) {
    return http.delete(url.deploydistrictDelete, params);
}
// 获取门禁列表
export function bearuserpage(params) {
    return http.get(url.bearuserpage, params);
}


  
