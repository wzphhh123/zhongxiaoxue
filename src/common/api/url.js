module.exports ={
    JWTToken:'/useradmin/login', //登录
    // 
    showfindAllUser:'/api/show/findAllUser' , //人员统计
    SoftwareFindAll:'/api/show/SoftwareFindAll', //软件使用占比
    AreaFindAll:'/api/show/AreaFindAll', //区域管理
    findAllSoftware:'/api/show/findAllSoftware', //区域管理展示
    showHealthy:'/api//show', //健康体验管理
    findAllElectricity:'/api/show/findAllElectricity', //电量管理
    findAllShow:'/api/show/findAllShow', //体验中心管理

    electricity:'/electricity', //电量管理
    softwarepage:'/software/page', //获取软件列表
    softwareAdd:'/software', //添加软件
    softwareDelete:'/software/{id}', //删除软件

    getregion:'/region', //获取区域列表
    regionAddEdit:'/region', //添加、编辑区域
    regionDelete:'/region/delete', //删除区域

    userhealth:'/userhealth', //获取用户健康
    
}