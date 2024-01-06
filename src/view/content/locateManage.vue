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
          <a-form-model-item label="名称">
            <a-input
              v-model="searchForm.name"
              style="width: 250px"
              placeholder="请输入名称"
            />
          </a-form-model-item>
        </a-form-model>
        <a-button type="primary" @click="placepage()">查询</a-button>
        <a-button type="primary" @click="reset()">重置</a-button>
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
          <p slot="operation" slot-scope="text, record">
            <span @click="(addVisible = true), (addForm = record)"> 编辑 </span>
            <a-divider type="vertical" />
            <a-popconfirm
              title="确定删除?"
              ok-text="是"
              cancel-text="否"
              @confirm="placeDelete(record.id)"
            >
              <span>删除</span>
            </a-popconfirm>
          </p>
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
        <a-form-model-item label="地域名称" prop="name">
          <a-input v-model="addForm.name" />
        </a-form-model-item>
        <!-- <a-form-model-item label="长" prop="grow">
          <a-input v-model="addForm.grow" />
        </a-form-model-item>
        <a-form-model-item label="宽" prop="wide">
          <a-input v-model="addForm.wide" />
        </a-form-model-item> -->
      </a-form-model>
    </a-modal>
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
          title: "地域名称",
          dataIndex: "name",
          align: "center",
        },
        {
          title: "长",
          dataIndex: "grow",
          align: "center",
        },
        { title: "宽", dataIndex: "wide", align: "center" },
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
        grow: [
          {
            required: true,
            message: "请填写岗位",
            trigger: "blur",
          },
        ],
        wide: [
          {
            required: true,
            message: "宽",
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
    async placepage() {
      var data = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
        name: this.searchForm.name,
      };
      const res = await this.$api.placepage(data);
      if (res.success) {
        this.dataLists = res.data.records;
        this.pagination.total = res.data.total;
      }
    },
    // 新增编辑
    async addEditPlace() {
      const res = await this.$api.addEditPlace(this.addForm);
      if (res.success) {
        this.$message.success(res.msg);
        this.placepage();
      } else {
        this.$message.warn(res.msg);
      }
    },
    // 删除开发者项目
    async placeDelete(e) {
      const res = await this.$api.placeDelete({ id: e });
      if (res.success) {
        this.placepage();
        this.$message.success(res.msg);
      }
    },
    tablePageChange(pagination) {
      let { current, pageSize } = pagination;
      console.log("0", current);
      console.log("00", pageSize);
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.placepage();
    },
    reset() {
      this.searchForm = {};
      this.placepage();
    },
    handleOk(e) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.addVisible = false;
          if (e) {
            this.addForm.id = e;
          }
          this.addEditPlace();
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
    this.placepage();
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