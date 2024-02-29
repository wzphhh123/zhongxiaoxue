<template>
  <div>
    <div class="content">
      <div class="top">
        <!-- <a-button type="primary">添加</a-button> -->
        <a-form-model
          :model="searchForm"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          layout="inline"
        >
          <a-form-model-item label="展馆名称">
            <a-input
              v-model="searchForm.name"
              style="width: 250px"
              placeholder="请输入展馆名称"
              allow-clear
            />
          </a-form-model-item>
        </a-form-model>
        <a-button type="primary" @click="areapage()">查询</a-button>
        <!-- <a-button type="primary" @click="reset()">重置</a-button> -->
        <a-button type="primary" @click="addVisible = true">新增</a-button>
      </div>
      <div class="main">
        <a-table
          :columns="columns"
          :data-source="dataLists"
          :pagination="pagination"
          @change="tablePageChange"
          bordered
        >
        <template slot="url" slot-scope="text" >
          <img :src="text" alt="" style="width:80px">
        </template>
          <template slot="operation" slot-scope="text, record">
            <a-popconfirm
              title="确定删除？"
              ok-text="是"
              cancel-text="否"
              @confirm="areaDelete(record.id)"
            >
              <a-tooltip>
                <template slot="title"> 删除 </template>
                <a-icon type="delete" theme="twoTone" />
              </a-tooltip>
            </a-popconfirm>
          </template>
        </a-table>
      </div>
    </div>
    <a-modal
      :title="addForm.id ? '修改' : '新增'"
      :visible="addVisible"
      @ok="handleOk(addForm.id)"
      @cancel="handleCancel"
      okText="确定"
      cancelText="取消"
      ><a-form-model
        ref="ruleForm"
        :rules="rules"
        :model="addForm"
        :label-col="labelCol2"
        :wrapper-col="wrapperCol2"
      >
        <a-form-model-item label="展馆名称" prop="name">
          <a-input v-model="addForm.name" style="width: 300px" />
        </a-form-model-item>
        <a-form-model-item label="展馆地址" prop="county">
          <a-select
            v-model="addForm.province"
            placeholder="省份"
            style="width: 100px"
            @change="getCity(addForm.province)"
          >
            <a-select-option
              :value="item.code"
              v-for="item in shengList"
              :key="item.code"
              >{{ item.name }}</a-select-option
            >
          </a-select>
          <a-select
            v-model="addForm.city"
            placeholder="市级"
            style="width: 100px"
            @change="getQuyu(addForm.city)"
          >
            <a-select-option
              :value="item.code"
              v-for="item in cityList"
              :key="item.code"
              >{{ item.name }}</a-select-option
            >
          </a-select>
          <a-select
            v-model="addForm.county"
            placeholder="区/县"
            style="width: 100px"
            @change="getQu(addForm.county)"
          >
            <a-select-option
              :value="item.code"
              v-for="item in quList"
              :key="item.code"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="经度">
          <a-input v-model="addForm.longitude" style="width: 300px" />
        </a-form-model-item>
        <a-form-model-item label="纬度">
          <a-input v-model="addForm.latitude" style="width: 300px" />
        </a-form-model-item>
        <!-- fileuploadFlieImg  

-->
        <a-form-model-item label="展馆图片" prop="url">
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :data="{ isup: 1 }"
            :before-upload="beforeUpload"
            :customRequest="imgBodyupload"
          >
            <img
              style="width: 100px"
              v-if="addForm.url"
              :src="addForm.url"
              alt="avatar"
            />
            <div v-else>
              <a-icon type="plus" />
              <div class="ant-upload-text">上传图片</div>
            </div>
          </a-upload>
        </a-form-model-item>
        <a-form-model-item label="地址详情">
          <a-input v-model="addForm.particulars" style="width: 300px" />
        </a-form-model-item>
        <a-form-model-item label="单位电话">
          <a-input v-model="addForm.phone" style="width: 300px" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      labelCol2: { span: 6 },
      wrapperCol2: { span: 16 },
      columns: [
        {
          title: "展馆名称",
          dataIndex: "name",
          align: "center",
        },
        {
          title: "省",
          dataIndex: "province",
          align: "center",
        },
        { title: "市", dataIndex: "city", align: "center" },
        { title: "区/县", dataIndex: "county", align: "center" },
        { title: "经纬度", dataIndex: "jwd", align: "center" },
        {
          title: "展馆图片",
          dataIndex: "url",
          align: "center",
          scopedSlots: { customRender: "url" },
        },
        { title: "地址详情", dataIndex: "particulars", align: "center" },
        { title: "单位电话", dataIndex: "phone", align: "center" },
        {
          title: "操作",
          dataIndex: "operation",
          align: "center",
          scopedSlots: { customRender: "operation" },
        },
      ],
      rules: {
        name: [
          {
            required: true,
            message: "请填写名称",
            trigger: "blur",
          },
        ],
        county: [
          {
            required: true,
            message: "请填写地址",
            trigger: "blur",
          },
        ],

        url: [
          {
            required: true,
            message: "请上传展馆图片",
            trigger: "blur",
          },
        ],
      },
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      dataLists: [],
      searchForm: {},
      addForm: {
        longitude: "",
        latitude: "",
        url: "",
      },
      addVisible: false,
      code: "",
      shengList: [], //省
      cityList: [], //市
      quList: [], //区
      province: "",
      city: "",
      county: "",
    };
  },
  methods: {
    // 图片上传前校验
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("图片格式错误，请上传jpg或png格式");
      }
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error("图片大小要小于10MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    // 上传课程封面
    imgBodyupload(file) {
      const formData = new FormData();
      formData.append("file", file.file);
      // formData.append("SavePath", "event/banner");
      this.fileuploadFlieImg(formData);
    },
    // 上传图片
    async fileuploadFlieImg(formData) {
      const res = await this.$api.fileuploadFlieImg(formData);
      if (res.success) {
        this.addForm.url = res.data;
        this.$message.success(res.msg);
      } else {
        this.$message.warning(res.msg);
      }
    },
    //开发者管理列表
    async areapage() {
      var data = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
        name: this.searchForm.name,
      };
      const res = await this.$api.areapage(data);
      if (res.success) {
        this.dataLists = res.data.records;
        res.data.records.forEach((item) => {
          item.jwd = "(" + item.longitude + "，" + item.latitude + ")";
        });
        this.pagination.total = res.data.total;
      }
    },
    //获取省
    async getShengfen(e) {
      if (e >= 0) {
        this.code = e;
      }
      var data = {
        parentCode: this.code,
      };
      const res = await this.$api.deploydistrictfindAll(data);
      if (res.success) {
        this.shengList = res.data;
      }
    },
    //获取市
    async getCity(e) {
      console.log("城市", e);
      this.shengList.forEach((val) => {
        if (val.code == e) {
          this.province = val.name;
        }
      });
      var data = {
        parentCode: e,
      };
      const res = await this.$api.deploydistrictfindAll(data);
      if (res.success) {
        this.cityList = res.data;
      }
    },
    //获取区
    async getQuyu(e) {
      console.log("区域", e);
      this.cityList.forEach((val) => {
        if (val.code == e) {
          console.log(val);
          this.city = val.name;
        }
      });
      var data = {
        parentCode: e,
      };
      const res = await this.$api.deploydistrictfindAll(data);
      if (res.success) {
        this.quList = res.data;
        res.data.forEach((item) => {
          this.addForm.longitude = item.longitude;
          this.addForm.latitude = item.latitude;
        });
      }
    },
    async getQu(e) {
      console.log("000", e);
      this.quList.forEach((val) => {
        if (val.code == e) {
          console.log(val);
          this.county = val.name;
        }
      });
    },
    // 新增编辑
    async areaSave() {
      var data = {
        name: this.addForm.name,
        province: this.province,
        city: this.city,
        county: this.county,
        longitude: this.addForm.longitude,
        latitude: this.addForm.latitude,
        url: this.addForm.url,
        particulars: this.addForm.particulars,
        phone: this.addForm.phone,
      };
      const res = await this.$api.areaSave(data);
      if (res.success) {
        this.$message.success(res.msg);
        this.areapage();
      } else {
        this.$message.warn(res.msg);
      }
    },
    // 删除开发者项目
    async areaDelete(e) {
      const res = await this.$api.areaDelete({ id: e });
      if (res.success) {
        this.areapage();
        this.$message.success(res.msg);
      }
    },
    tablePageChange(pagination) {
      let { current, pageSize } = pagination;
      console.log("0", current);
      console.log("00", pageSize);
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.areapage();
    },
    reset() {
      this.searchForm = {};
      this.areapage();
    },
    handleOk(e) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.addVisible = false;
          if (e) {
            this.addForm.id = e;
          }
          this.areaSave();
          this.addForm = {};
        }
      });
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.addVisible = false;
      this.addForm = {};
    },
  },
  mounted() {
    this.areapage();
    this.getShengfen(0);
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 15px;
  .top {
    display: flex;
    margin-bottom: 20px;
    .ant-btn {
      margin-top: 4px;
      margin-left: 10px;
    }
  }
  .main {
    // text-align: center;
  }
  .ant-table-wrapper {
    // width: 1500px;
  }
  span {
    color: rgb(10, 66, 187);
    cursor: pointer;
  }
}
</style>