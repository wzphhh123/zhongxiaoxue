module.exports ={
    JWTToken:'/useradmin/login', //登录

    showfindAllUser:'/api/show/findAllUser' , //人员统计
    FindHealthIndex:'/api/show/FindHealthIndex', //软件使用占比
    AreaFindAll:'/api/show/AreaFindAll', //区域管理
    findAllSoftware:'/api/show/findAllSoftware', //区域管理展示
    showHealthy:'/api/show', //健康体验管理
    findElectricity:'/api/show/findElectricity', //电量管理
    serialPortconsume: 'serialPort/consume', //电量占比
    findAllShow:'/api/show/findAllShow', //体验中心管理
    FindRankingSoftware:'/api/show/FindRankingSoftware',//区域列表
    FindRankingRight:'/api/show/FindRanking', //右侧排行榜

    electricity:'/api/electricity/page', //电量管理
    electricityFind:'/electricity/id', //查询电量
    addEditelectricity:'/electricity', //电量新增修改
    electricityDelete:'/electricity/delete', //电量删除

    softwareAll:'/software' , //获取软件全部
    softwarepage:'/software/page', //获取软件列表
    softwareAdd:'/software/save', //添加软件
    softwareDelete:'/software/delete', //删除软件

    districtpage:'/district/page', //获取区域列表
    districtsave:'/district/save', //添加、编辑区域
    districtfindAll:'/district/findAll', //查询区域列表
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
    areapage:'/area/page', // 获取展馆分页
    areaSave:'/area/save', // 添加展馆
    areaDelete:'/area/delete',//删除展馆
    areaAll:'/area/select' ,//获取展馆所有

    deploydistrictfindAll:'/deploydistrict/findAll' ,// 获取省市区三连
    deploydistrictAdd:'/deploydistrict', // 添加
    deploydistrictDelete:'/deploydistrict/delete', //删除

    bearuserpage:'/bearuser/page', //门禁用户管理
    addEditbearuser:'/bearuser', //门禁用户添加编辑
    entranceguardpage:'/entranceguard/page', // 门禁管理
    entranceguardsave:'/entranceguard/save', //添加编辑门禁
    entranceguarddelete:'/entranceguard/delete', //删除门禁

    subscribepage:'/subscribe/page', //预约管理
    subscribefindAllPage:'/subscribe/findAllPage', //批次
    subscribedelete:'/subscribe/delete', //预约删除
    experienceUserfindUser:'/experienceUser/findUserPage', //预约用户管理
    experienceUserdelete:'/experienceUser/delete', //预约用户删除
    experienceUserprint:'/experienceUser/print', //批量生成二维码

    fileuploadFlieImg:'/api/file/uploadFlieImg', //上传图片
    districtselect:'/district/select', //区域列表

  
}