<template>
  <div>
    <div class="content">
      <div class="top">
        <a-form-model
          :model="searchForm"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          layout="inline"
        >
          <a-form-model-item label="用户名称">
            <a-input
              v-model="searchForm.name"
              style="width: 250px"
              placeholder="请输入用户名称"
              allow-clear
            />
          </a-form-model-item>
        </a-form-model>
        <a-button type="primary" @click="bearuserpage()">查询</a-button>
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
          <template slot="state" slot-scope="text">
            <span v-if="text == 0" style="color:green">未使用</span>
            <span v-if="text == 1" style="color:red">使用</span>
          </template>
          <template slot="operation" slot-scope="text, record">
            <a-tooltip>
              <template slot="title"> 编辑</template>
              <a-icon
                type="edit"
                theme="twoTone"
                @click="(addVisible = true), (addForm = record)"
              />
              <a-divider type="vertical" />
            </a-tooltip>
            <a-popconfirm
              title="确定删除？"
              ok-text="是"
              cancel-text="否"
              @confirm="softwareDelete(record.id)"
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
        <a-form-model-item label="用户名称" prop="name">
          <a-input v-model="addForm.name" />
        </a-form-model-item>
        <a-form-model-item label="身份证号" prop="identity">
          <a-input v-model="addForm.identity" />
        </a-form-model-item>
        <a-form-model-item label="门禁编号" prop="softwareNumber">
          <a-input v-model="addForm.softwareNumber" />
        </a-form-model-item>     
        <a-form-model-item label="选择状态" prop="state">
          <a-select v-model="addForm.state" placeholder="请选择状态">
            <a-select-option :value="0"> 门禁 </a-select-option>
            <a-select-option :value="1"> 软件 </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
      labelCol2: { span: 6 },
      wrapperCol2: { span: 12 },
      columns: [
        {
          title: "用户名称",
          dataIndex: "name",
          align: "center",
        },

        {
          title: "身份证号",
          dataIndex: "identity",
          align: "center",
        },
        {
          title: "门禁编号",
          dataIndex: "softwareNumber",
          align: "center",
        },
        {
          title: "状态",
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
        name: [
          {
            required: true,
            message: "请填写人员用户名称",
            trigger: "blur",
          },
        ],
        softwareNumber: [
          {
            required: true,
            message: "请填写门禁编号",
            trigger: "blur",
          },
        ],
        identity: [
          {
            required: true,
            message: "请填写身份证号",
            trigger: "blur",
          },
        ],
        state: [
          {
            required: true,
            message: "请填写状态",
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
    async bearuserpage() {
      var data = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
        name: this.searchForm.name,
        type: this.searchForm.type,
      };
      const res = await this.$api.bearuserpage(data);
      if (res.success) {
        this.dataLists = res.data.records;
        this.pagination.total = res.data.total;
      }
    },
    // 添加编辑
    async addEditbearuser() {
      const res = await this.$api.addEditbearuser(this.addForm);
      if (res.success) {
        this.$message.success(res.msg);
        this.bearuserpage();
      } else {
        this.$message.warn(res.msg);
      }
    },
    // 删除开发者项目
    async softwareDelete(e) {
      const res = await this.$api.softwareDelete({ id: e });
      if (res.success) {
        this.bearuserpage();
        this.$message.success(res.msg);
      }
    },
    tablePageChange(pagination) {
      let { current, pageSize } = pagination;
      console.log("0", current);
      console.log("00", pageSize);
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.bearuserpage();
    },
    reset() {
      this.searchForm = {};
      this.bearuserpage();
    },
    handleOk(e) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.addVisible = false;
          if (e) {
            this.addForm.id = e;
          }
          this.addEditbearuser();
          this.addForm = {};
        }
      });
    },
    handleCancel(e) {
      this.addVisible = false;
      this.addForm = {};
      this.bearuserpage();
    },
  },
  mounted() {
    this.bearuserpage();
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
  // .ant-table-wrapper {
  //   width: 1500px;
  // }
  span {
  }
}
</style>