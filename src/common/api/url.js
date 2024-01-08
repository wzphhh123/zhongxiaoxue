module.exports ={
    JWTToken:'/useradmin/login', //登录

    showfindAllUser:'/api/show/findAllUser' , //人员统计
    SoftwareFindAll:'/api/show/SoftwareFindAll', //软件使用占比
    AreaFindAll:'/api/show/AreaFindAll', //区域管理
    findAllSoftware:'/api/show/findAllSoftware', //区域管理展示
    showHealthy:'/api/show', //健康体验管理
    findAllElectricity:'/api/show/findAllElectricity', //电量管理
    findAllShow:'/api/show/findAllShow', //体验中心管理

    electricity:'/electricity/page', //电量管理
    addEditelectricity:'/electricity', //电量新增修改
    electricityDelete:'/electricity/delete', //电量删除

    softwarepage:'/software/page', //获取软件列表
    softwareAdd:'/software/save', //添加软件
    softwareDelete:'/software/delete', //删除软件

    getregion:'/region/page', //获取区域列表
    regionAddEdit:'/region', //添加、编辑区域
    regionDelete:'/region/delete', //删除区域

    userhealth:'/userhealth/page', //获取用户健康
    addEditHealth:'/userhealth',//增加修改用户健康
    userhealthDelete:'/userhealth/delete', //删除用户健康

    placepage:'/place/page', //位置管理
    addEditPlace:'/place' , //新增编辑地域
    placeDelete:'/place/delete',//删除地域

    ydtywebuseradmin: '/useradmin', // 机构列表查询
    useradminregister: '/useradmin/register', // 修改添加机构
    Delydtywebuseradmin: '/useradmin/delete', // 删除机构
}