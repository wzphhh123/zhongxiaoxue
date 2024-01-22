<template>
  <div>
    <div class="content">
      <a-button
        type="primary"
        style="position: absolute; left: 35px"
        @click="goback"
        >返回上一页</a-button
      >
      <a-breadcrumb style="font-size: 18px; cursor: pointer; margin-left: 80%">
        <a-tooltip>
          <template slot="title"> 点击区域管理返回上一页 </template>
          <a-icon type="exclamation-circle" style="margin-right: 10px" />
        </a-tooltip>
        <a-breadcrumb-item>
          <!-- <a href="">区域管理</a> -->
          <span @click="goback">区域管理</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item style="color: #000">{{
          this.$route.params.name
        }}</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="line"></div>
      <div class="top">
        <a-form-model
          :model="searchForm"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          layout="inline"
        >
          <a-form-model-item label="软件名称">
            <a-input
              v-model="searchForm.name"
              style="width: 250px"
              placeholder="请输入软件名称"
              allow-clear
            />
          </a-form-model-item>
        </a-form-model>
        <a-button type="primary" @click="softwarepage()">查询</a-button>
        <!-- <a-button type="primary" @click="reset()">重置</a-button> -->
        <a-button type="primary" @click="addVisible = true">新增</a-button>
        <!-- <a-button type="primary" @click="goback">返回</a-button> -->
      </div>
      <div class="main">
        <a-table
          :columns="columns"
          :data-source="dataLists"
          :pagination="pagination"
          @change="tablePageChange"
          bordered
        >
          <template slot="type" slot-scope="text">
            <span v-if="text == 0">门禁</span>
            <span v-if="text == 1">软件</span>
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
        <a-form-model-item label="软件名称" prop="name">
          <a-input v-model="addForm.name" />
        </a-form-model-item>
        <a-form-model-item label="软件编号" prop="softwareNumber">
          <a-input v-model="addForm.softwareNumber" />
        </a-form-model-item>
        <a-form-model-item label="序列号" prop="number">
          <a-input v-model="addForm.number" />
        </a-form-model-item>
        <!-- <a-form-model-item label="选择类型">
          <a-select
            v-model="addForm.type"
            style="width: 250px"
            placeholder="请选择类型"
          >
            <a-select-option :value="0"> 门禁 </a-select-option>
            <a-select-option :value="1"> 软件 </a-select-option>
          </a-select>
        </a-form-model-item> -->
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
          title: "区域名称",
          dataIndex: "areaName",
          align: "center",
        },
        {
          title: "软件名称",
          dataIndex: "name",
          align: "center",
        },
        {
          title: "软件编号",
          dataIndex: "softwareNumber",
          align: "center",
        },
        { title: "数量", dataIndex: "number", align: "center" },
        {
          title: "类型",
          dataIndex: "type",
          align: "center",
          scopedSlots: { customRender: "type" },
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
            message: "请填写人员软件名称",
            trigger: "blur",
          },
        ],
        softwareNumber: [
          {
            required: true,
            message: "请填写软件数量",
            trigger: "blur",
          },
        ],
        number: [
          {
            required: true,
            message: "请填写数量",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "请填写类型",
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
    async softwarepage() {
      var data = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
        type: this.$route.params.id,
      };
      const res = await this.$api.softwarepage(data);
      if (res.success) {
        this.dataLists = res.data.records;
        this.pagination.total = res.data.total;
      }
    },
    // 添加编辑
    async softwareAdd() {
      var data = {
        areaId: this.$route.params.id,
        areaName: this.$route.params.name,
        name: this.addForm.name,
        number: this.addForm.number,
        softwareNumber: this.addForm.softwareNumber,
      };
      const res = await this.$api.softwareAdd(data);
      if (res.success) {
        this.$message.success(res.msg);
        this.softwarepage();
      } else {
        this.$message.warn(res.msg);
      }
    },
    // 删除开发者项目
    async softwareDelete(e) {
      const res = await this.$api.softwareDelete({ id: e });
      if (res.success) {
        this.softwarepage();
        this.$message.success(res.msg);
      }
    },
    goback() {
      this.$router.go(-1);
    },
    tablePageChange(pagination) {
      let { current, pageSize } = pagination;
      console.log("0", current);
      console.log("00", pageSize);
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.softwarepage();
    },
    reset() {
      this.searchForm = {};
      this.softwarepage();
    },
    handleOk(e) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.addVisible = false;
          if (e) {
            this.addForm.id = e;
          }
          this.softwareAdd();
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
    this.softwarepage();
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
  .main {
    // text-align: center;
    margin-top: 20px;
  }
  .ant-table-wrapper {
    width: 1500px;
  }
  span {
    color: rgb(10, 66, 187);
    cursor: pointer;
  }
}
</style>