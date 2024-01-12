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
            <a-select
              v-model="searchForm.id"
              placeholder="展馆名称"
              style="width: 200px"
              allow-clear
            >
              <a-select-option
                :value="item.id"
                v-for="item in addressNameList"
                :key="item.id"
                >{{ item.name }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-form-model>
        <a-button type="primary" @click="districtfindAll()">查询</a-button>
        <!-- <a-button type="primary" @click="reset()">重置</a-button> -->
        <a-button type="primary" @click="(isOpen = false), (addVisible = true)"
          >新增</a-button
        >
      </div>
      <div class="main">
        <a-table
          bordered
          :columns="columns"
          :data-source="dataLists"
          :pagination="pagination"
          @change="tablePageChange"
          :rowKey="(record) => record.id"
        >
          <template slot="normalUrl" slot-scope="text">
            <img :src="text" height="50" alt="" />
          </template>

          <template slot="clickUrl" slot-scope="text">
            <img :src="text" height="50" alt="" />
          </template>
          <template slot="operation" slot-scope="text, record">
            <a-tooltip>
              <template slot="title"> 详情 </template>
              <a-icon type="snippets" theme="twoTone" @click="gotoInf(record)" />
              <a-divider type="vertical" />
            </a-tooltip>
            <a-tooltip>
              <template slot="title"> 编辑</template>
              <a-icon
                type="edit"
                theme="twoTone"
                @click="(addForm = record), edit(record)"
              />
              <a-divider type="vertical" />
            </a-tooltip>

            <a-popconfirm
              title="确定删除？"
              ok-text="是"
              cancel-text="否"
              @confirm="regionDelete(record.id)"
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
        ><a-form-model-item label="区域名称" prop="name">
          <a-input v-model="addForm.name" />
        </a-form-model-item>
        <a-form-model-item label="展馆地址" prop="addressName">
          <a-select
            v-model="addForm.id"
            placeholder="展馆地址"
            @change="change(addForm.id)"
          >
            <a-select-option
              :value="item.id"
              v-for="item in addressNameList"
              :key="item.id"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-form-model-item>
       
        <a-form-model-item label="正常照片" prop="name">
          <a-input v-model="addForm.normalUrl" />
        </a-form-model-item>
        <a-form-model-item label="变色照片" prop="name">
          <a-input v-model="addForm.clickUrl" />
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
      wrapperCol: { span: 18 },
      labelCol2: { span: 6 },
      wrapperCol2: { span: 12 },
      columns: [
        
        {
          title: "展馆名称",
          dataIndex: "areaName",
          align: "center",
        },
        {
          title: "名称",
          dataIndex: "name",
          align: "center",
        },
        // {
        //   title: "长",
        //   dataIndex: "grow",
        //   align: "center",
        // },
        // {
        //   title: "宽",
        //   dataIndex: "wide",
        //   align: "center",
        // },
        {
          title: "正常照片",
          dataIndex: "normalUrl",
          align: "center",
          scopedSlots: { customRender: "normalUrl" },
        },
        {
          title: "变色照片",
          dataIndex: "clickUrl",
          align: "center",
          scopedSlots: { customRender: "clickUrl" },
        },
        {
          title: "操作",
          dataIndex: "operation",
          align: "center",
          scopedSlots: { customRender: "operation" },
        },
      ],
      rules: {
        addressName: [
          {
            required: true,
            message: "请选择展馆地址名称",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请填写区域名称",
            trigger: "blur",
          },
        ],
        department: [
          {
            required: true,
            message: "请填写岗位",
            trigger: "blur",
          },
        ],
        station: [
          {
            required: true,
            message: "所属部门/组",
            trigger: "blur",
          },
        ],

        softwareName: [
          {
            required: true,
            message: "软件名称",
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
      searchForm: {
        PageIndex: 1,
        PageSize: 10,
      },
      addForm: {},
      addVisible: false,
      addActive: true,
      addressNameList: [],
      // softwareList: [],
      loading: false,
      imageUrl: "",
      detailVisible: false,
    };
  },
  methods: {
    //开发者管理列表
    async districtpage() {
      var data = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
        id: 2,
      };
      const res = await this.$api.districtpage(data);
      if (res.success) {
        this.dataLists = res.data.records;
        this.pagination.total = res.data.total;
      }
    },
    // 查询
    async districtfindAll() {
      var data = {
        id: this.searchForm.id,
      };
      const res = await this.$api.districtfindAll(data);
      if (res.success) {
        this.dataLists = res.data;
        // this.dataLists = res.data.records;
        // this.pagination.total = res.data.total;
      }
    },
    // 获取全部软件列表
    // async softwareAdd() {
    //   const res = await this.$api.softwareAdd();
    //   if (res.success) {
    //     this.softwareList = res.data;
    //   }
    // },
    async areaAll() {
      const res = await this.$api.areaAll();
      if (res.success) {
        this.addressNameList = res.data;
      }
    },
    change(e) {
      this.addressNameList.forEach((item) => {
        if (item.id == e) {
          this.addForm.areaName = item.name;
        }
      });
    },
    edit(e) {
      this.addVisible = true;
      this.addActive = false;
      // 第一层，没有父节点
      if (e.fatherId == 0) {
        this.addForm.fatherId = 0;
      } else {
        this.addForm.fatherId = e.fatherId;
      }
    },
    // 添加编辑
    async districtsave() {
      const res = await this.$api.districtsave(this.addForm);
      if (res.success) {
        this.$message.success(res.msg);
        this.districtpage();
      } else {
        this.$message.warn(res.msg);
      }
    },
    // 删除开发者项目
    async regionDelete(e) {
      const res = await this.$api.regionDelete({ id: e });
      if (res.success) {
        this.districtpage();
        this.$message.success(res.msg);
      }
    },
    gotoInf(e) {
      this.$router.push({ path: `/regionInf/${e.id}/${e.name}`});
    },
    tablePageChange(pagination) {
      let { current, pageSize } = pagination;
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.searchForm.PageIndex = current;
      this.searchForm.PageSize = pageSize;
      this.districtpage();
    },
    reset() {
      this.searchForm = {};
      this.districtpage();
    },
    handleOk(e) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.addVisible = false;
          if (e) {
            this.addForm.id = e;
          }
          this.districtsave();
          this.addForm = {};
        }
      });
    },
    handleCancel(e) {
      this.addVisible = false;
      this.addForm = {};
    },
  },
  mounted() {
    this.districtpage();
    this.areaAll();
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
  .ant-table-wrapper {
    width: 1500px;
  }
  p {
    span {
      color: rgb(10, 66, 187);
      cursor: pointer;
    }
  }
}
</style>