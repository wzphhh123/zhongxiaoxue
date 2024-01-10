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
          <a-form-model-item label="用户信息">
            <a-input
              v-model="searchForm.identity"
              style="width: 250px"
              placeholder="请输入用户信息"
              allow-clear
            />
          </a-form-model-item>
        </a-form-model>
        <a-button type="primary" @click="userhealth()">查询</a-button>
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
            <span v-if="text == 0" style="color: red">不健康</span>
            <span v-if="text == 1" style="color: #10c30c">健康</span>
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
              @confirm="userhealthDelete(record.id)"
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
        <a-form-model-item label="用户信息" prop="identity">
          <a-input v-model="addForm.identity" />
        </a-form-model-item>
        <a-form-model-item label="心率(次/分钟)" prop="heartRate">
          <a-input v-model="addForm.heartRate" />
        </a-form-model-item>
        <a-form-model-item label="血氧(mol/l)" prop="bloodOxygen">
          <a-input v-model="addForm.bloodOxygen" />
        </a-form-model-item>
        <a-form-model-item label="身高(cm)" prop="stature">
          <a-input v-model="addForm.stature" />
        </a-form-model-item>
        <a-form-model-item label="体重(Kg)" prop="weight">
          <a-input v-model="addForm.weight" />
        </a-form-model-item>
        <a-form-model-item label="选择状态" prop="state">
          <a-select v-model="addForm.state" placeholder="请选择状态">
            <a-select-option :value="0"> 不健康 </a-select-option>
            <a-select-option :value="1"> 健康 </a-select-option>
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
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      labelCol2: { span: 6 },
      wrapperCol2: { span: 12 },
      columns: [
        {
          title: "用户信息",
          dataIndex: "identity",
          align: "center",
        },
        {
          title: "心率（次/分钟）",
          dataIndex: "heartRate",
          align: "center",
        },
        { title: "血氧（mol/l）", dataIndex: "bloodOxygen", align: "center" },
        { title: "身高(cm)", dataIndex: "stature", align: "center" },
        { title: "体重(Kg)", dataIndex: "weight", align: "center" },
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
        identity: [
          {
            required: true,
            message: "请填写用户信息",
            trigger: "blur",
          },
        ],
        heartRate: [
          {
            required: true,
            message: "请填写心率",
            trigger: "blur",
          },
        ],
        bloodOxygen: [
          {
            required: true,
            message: "请填写血氧",
            trigger: "blur",
          },
        ],
        weight: [
          {
            required: true,
            message: "请填写体重",
            trigger: "blur",
          },
        ],
        stature: [
          {
            required: true,
            message: "请填写身高",
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
    async userhealth() {
      var data = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
        identity: this.searchForm.identity,
      };
      const res = await this.$api.userhealth(data);
      if (res.success) {
        this.dataLists = res.data.records;
        this.pagination.total = res.data.total;
      }
    },
    // 增加修改
    async addEditHealth() {
      const res = await this.$api.addEditHealth(this.addForm);
      if (res.success) {
        this.$message.success(res.msg);
        this.userhealth();
      } else {
        this.$message.warn(res.msg);
      }
    },
    // 删除开发者项目
    async userhealthDelete(e) {
      const res = await this.$api.userhealthDelete({ id: e });
      if (res.success) {
        this.userhealth();
        this.$message.success(res.msg);
      }
    },
    tablePageChange(pagination) {
      let { current, pageSize } = pagination;
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.userhealth();
    },
    reset() {
      this.searchForm = {};
      this.userhealth();
    },
    handleOk(e) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.addVisible = false;
          if (e) {
            this.addForm.id = e;
          }
          this.addEditHealth();
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
    this.userhealth();
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