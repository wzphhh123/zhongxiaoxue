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
          <a-form-model-item label="地域Id">
            <a-input
              v-model="searchForm.areaId"
              style="width: 250px"
              placeholder="请输入地域Id"
              allow-clear
            />
          </a-form-model-item>
        </a-form-model>
        <a-button type="primary" @click="electricity()">查询</a-button>
        <!-- <a-button type="primary" @click="reset()">重置</a-button> -->
        <!-- <a-button type="primary" @click="addVisible = true">新增</a-button> -->
      </div>
      <div class="main">
        <a-table
          :columns="columns"
          :data-source="dataLists"
          :pagination="pagination"
          @change="tablePageChange"
          bordered
        >
          <template slot="operation" slot-scope="text, record">
            <!-- <span @click="(addVisible = true), (addForm = record)"> 编辑 </span>
            <a-divider type="vertical" /> -->

            <a-popconfirm
              title="确定删除？"
              ok-text="是"
              cancel-text="否"
              @confirm="electricityDelete(record.id)"
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
    <!-- <a-modal
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
        <a-form-model-item label="人员姓名" prop="name">
          <a-input v-model="addForm.name" />
        </a-form-model-item>
        <a-form-model-item label="岗位" prop="department">
          <a-input v-model="addForm.department" />
        </a-form-model-item>
        <a-form-model-item label="所属部门/组" prop="station">
          <a-input v-model="addForm.station" />
        </a-form-model-item>
      </a-form-model>
    </a-modal> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      labelCol2: { span: 6 },
      wrapperCol2: { span: 12 },
      columns: [
        {
          title: "地域Id",
          dataIndex: "areaId",
          align: "center",
        },
        {
          title: "总电量",
          dataIndex: "totalPower",
          align: "center",
        },
        { title: "剩余电量", dataIndex: "dumpEnergy", align: "center" },
        { title: "创建时间", dataIndex: "createTime", align: "center" },
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
            message: "请填写人员姓名",
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
      },
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      dataLists: [],
      searchForm: {},
      addForm: {},
      addVisible: false,
    };
  },
  methods: {
    //开发者管理列表
    async electricity() {
      var data = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
        name: this.searchForm.name,
      };
      const res = await this.$api.electricity(data);
      if (res.success) {
        this.dataLists = res.data.records;
        this.pagination.total = res.data.total;
      }
    },
    // 添加编辑电量
    async addEditelectricity() {
      const res = await this.$api.addEditelectricity(this.addForm);
      if (res.success) {
        this.$message.success(res.msg);
        this.electricity();
      } else {
        this.$message.warn(res.msg);
      }
    },
    // 删除电量
    async electricityDelete(e) {
      const res = await this.$api.electricityDelete({ id: e });
      if (res.success) {
        this.electricity();
        this.$message.success(res.msg);
      }
    },
    tablePageChange(pagination) {
      let { current, pageSize } = pagination;
      console.log("0", current);
      console.log("00", pageSize);
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.electricity();
    },
    reset() {
      this.searchForm = {};
      this.electricity();
    },
    handleOk(e) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.addVisible = false;
          if (e) {
            this.addForm.id = e;
          }
          this.addEditelectricity();
          this.addForm = {};
        }
      });
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.addVisible = false;
      this.addForm = {};
    },
    test() {
      var data = {
        name: "你好",
        sex: "男",
      };
      var fuzhi = "12";
      Object.defineProperty(data, "age", {
        get: function () {
          console.log("你获取到了");
          return fuzhi;
        },
        set(value) {
          fuzhi = value;
        },
      });
    },
  },
  mounted() {
    this.electricity();
    this.test();
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
  p {
    span {
      color: rgb(10, 66, 187);
      cursor: pointer;
    }
  }
}
</style>