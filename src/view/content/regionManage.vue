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
          <a-form-model-item label="姓名">
            <a-input
              v-model="searchForm.name"
              style="width: 250px"
              placeholder="请输入姓名"
            />
          </a-form-model-item>
        </a-form-model>
        <a-button type="primary" @click="getregion()">查询</a-button>
        <a-button type="primary" @click="reset()">重置</a-button>
        <a-button type="primary" @click="addVisible = true">新增</a-button>
      </div>
      <div class="main">
        <!-- <a-table
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
              @confirm="regionDelete(record.id)"
            >
              <span>删除</span>
            </a-popconfirm>
          </p>
        </a-table> -->
        <a-table
          bordered
          :columns="columns"
          :data-source="dataLists"
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
              <template slot="title"> 添加子级专题 </template>
              <a-icon
                type="plus-circle"
                theme="twoTone"
                @click="(addForm.fatherId = record.id), (addVisible = true)"
              />
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
      >
        <a-form-model-item label="人员姓名" prop="name">
          <a-input v-model="addForm.name" />
        </a-form-model-item>
        <a-form-model-item label="grow" prop="name">
          <a-input v-model="addForm.grow" />
        </a-form-model-item>
        <a-form-model-item label="wide" prop="name">
          <a-input v-model="addForm.wide" />
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
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      labelCol2: { span: 6 },
      wrapperCol2: { span: 12 },
      columns: [
        {
          title: "名称",
          dataIndex: "name",
          align: "center",
        },
        {
          title: "grow",
          dataIndex: "grow",
          align: "center",
        },
        {
          title: "wide",
          dataIndex: "wide",
          align: "center",
        },
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
      addActive: true,
    };
  },
  methods: {
    //开发者管理列表
    async getregion() {
      var data = {
        // pageNum: this.pagination.current,
        // pageSize: this.pagination.pageSize,
        name: this.searchForm.name,
      };
      const res = await this.$api.getregion(data);
      if (res.success) {
        this.dataLists = res.data;
        // this.pagination.total = res.data.total;
      }
    },
    edit(e) {
      console.log("e", e);
      // this.addForm.name = e.name;
      // this.addForm.heatNetworkName = e.label;
      // this.addForm.heatNetworkId = e.Id;
      // this.addForm.type = e.type;
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
    async regionAddEdit() {
      const res = await this.$api.regionAddEdit(this.addForm);
      if (res.success) {
        this.$message.success(res.msg);
        this.getregion();
      } else {
        this.$message.warn(res.msg);
      }
    },
    // 删除开发者项目
    async regionDelete(e) {
      const res = await this.$api.regionDelete({ id: e });
      if (res.success) {
        this.getregion();
        this.$message.success(res.msg);
      }
    },
    tablePageChange(pagination) {
      let { current, pageSize } = pagination;
      console.log("0", current);
      console.log("00", pageSize);
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.getregion();
    },
    reset() {
      this.searchForm = {};
      this.getregion();
    },
    handleOk(e) {
      console.log("EE",e);
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.addVisible = false;
          if (e) {
            this.addForm.id = e;
          }
          this.regionAddEdit();
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
    this.getregion();
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