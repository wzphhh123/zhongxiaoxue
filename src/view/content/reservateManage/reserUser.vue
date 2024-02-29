<template>
  <div>
    <div class="content">
      <a-breadcrumb style="font-size: 18px; cursor: pointer; margin-left: 80%">
        <a-button type="primary" style="position: absolute;left:35px" @click="goback">返回上一页</a-button>
        <a-tooltip>
          <template slot="title"> 点击预约管理返回上一页 </template>
          <a-icon type="exclamation-circle" style="margin-right: 10px" />
        </a-tooltip>
        <a-breadcrumb-item>
          <!-- <a href="">区域管理</a> -->
          <span @click="goback">预约管理</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item style="color: #000">{{
          this.$route.params.name
        }}</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="line"></div>
      <div class="top">
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
          <template slot="type" slot-scope="text">
            <span v-if="text == 0">个人</span>
            <span v-if="text == 1">团队</span>
          </template>
          <template slot="state" slot-scope="text">
            <span v-if="text == 0">无效</span>
            <span v-if="text == 1">有效</span>
          </template>
          <template slot="operation" slot-scope="text, record">
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
              @confirm="experienceUserdelete(record.id)"
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
          title: "名称",
          dataIndex: "name",
          align: "center",
        },
        {
          title: "性别",
          dataIndex: "sex",
          align: "center",
        },
        {
          title: "年龄",
          dataIndex: "age",
          align: "center",
        },
        {
          title: "学号",
          dataIndex: "student",
          align: "center",
        },
        {
          title: "成绩",
          dataIndex: "mark",
          align: "center",
        },
        {
          title: "类型",
          dataIndex: "type",
          align: "center",
          scopedSlots: { customRender: "type" },
        },
        {
          title: "参观状态",
          dataIndex: "state",
          align: "center",
          scopedSlots: { customRender: "state" },
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
    async experienceUserfindUser() {
      var data = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
        id: this.$route.params.id,
      };
      const res = await this.$api.experienceUserfindUser(data);
      if (res.success) {
        this.dataLists = res.data;
        this.pagination.total = res.data.total
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
          this.addForm.name = item.name;
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
        this.experienceUserfindUser();
      } else {
        this.$message.warn(res.msg);
      }
    },
    // 删除开发者项目
    async experienceUserdelete(e) {
      const res = await this.$api.experienceUserdelete({ id: e });
      if (res.success) {
        this.experienceUserfindUser();
        this.$message.success(res.msg);
      }
    },
    goback() {
      this.$router.go(-1);
    },
    gotoInf(e) {
      this.$router.push({ path: `/regionInf/${e.id}/${e.name}` });
    },
    tablePageChange(pagination) {
      let { current, pageSize } = pagination;
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.searchForm.PageIndex = current;
      this.searchForm.PageSize = pageSize;
      this.experienceUserfindUser();
    },
    reset() {
      this.searchForm = {};
      this.experienceUserfindUser();
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
    this.experienceUserfindUser();
    this.areaAll();
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 15px;
  .line {
    width: 97%;
    height: 1px;
    background-color: rgb(180, 178, 178);
    margin-top: 10px;
    margin-bottom: 15px;
  }
  .top {
    display: flex;
    margin-bottom: 20px;
    .ant-btn {
      margin-top: 4px;
      margin-left: 10px;
    }
  }
  // .ant-table-wrapper {
  //   width: 1500px;
  // }
  p {
    span {
      color: rgb(10, 66, 187);
      cursor: pointer;
    }
  }
}
</style>