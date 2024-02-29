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
          <a-form-model-item label="门禁名称">
            <a-input
              v-model="searchForm.name"
              style="width: 250px"
              placeholder="请输入门禁名称"
              allow-clear
            />
          </a-form-model-item>
          <a-form-model-item label="展馆名称" style="margin-left: 20px">
            <a-select
              v-model="searchForm.id"
              style="width: 250px"
              placeholder="请选择展馆名称"
              allow-clear
            >
              <a-select-option v-for="(item,index) in addressNameList" :key="index" :value="item.id"> {{item.name}} </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-form-model>
        <a-button type="primary" @click="entranceguardpage()">查询</a-button>
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
          <template slot="type" slot-scope="text">
            <span v-if="text == 0">进门</span>
            <span v-if="text == 1">出门</span>
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
              @confirm="entranceguarddelete(record.id)"
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
        <a-form-model-item label="门禁编号" prop="number">
          <a-input v-model="addForm.number" />
        </a-form-model-item>
        <a-form-model-item label="token" prop="token">
          <a-input v-model="addForm.token" />
        </a-form-model-item>
        <a-form-model-item label="展馆地址" prop="areaId">
          <a-select
            v-model="addForm.areaId"
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
        <a-form-model-item label="选择类型" prop="type">
          <a-select
            v-model="addForm.type"
            placeholder="请选择类型"
          >
            <a-select-option :value="0"> 进门 </a-select-option>
            <a-select-option :value="1"> 出门 </a-select-option>
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
          title: "门禁编号",
          dataIndex: "number",
          align: "center",
        },
        {
          title: "token",
          dataIndex: "token",
          align: "center",
        },
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
        number: [
          {
            required: true,
            message: "请填写门禁编号",
            trigger: "blur",
          },
        ],
        token: [
          {
            required: true,
            message: "请填写token",
            trigger: "blur",
          },
        ],
        areaId: [
          {
            required: true,
            message: "请填写展馆列表",
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
      addressNameList: [], //展馆列表
    };
  },
  methods: {
    // 展馆名称
    async areaAll() {
      const res = await this.$api.areaAll();
      if (res.success) {
        this.addressNameList = res.data;
      }
    },
    //开发者管理列表
    async entranceguardpage() {
      var data = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
        name: this.searchForm.name,
        id: this.searchForm.id,
      };
      const res = await this.$api.entranceguardpage(data);
      if (res.success) {
        this.dataLists = res.data.records;
        this.pagination.total = res.data.total;
      }
    },
    change(e) {
      this.addressNameList.forEach((item) => {
        if (item.id == e) {
          this.addForm.areaName = item.name;
        }
      });
    },
    // 添加编辑
    async entranceguardsave() {
      const res = await this.$api.entranceguardsave(this.addForm);
      if (res.success) {
        this.$message.success(res.msg);
        this.entranceguardpage();
      } else {
        this.$message.warn(res.msg);
      }
    },
    // 删除开发者项目
    async entranceguarddelete(e) {
      const res = await this.$api.entranceguarddelete({ id: e });
      if (res.success) {
        this.entranceguardpage();
        this.$message.success(res.msg);
      }
    },
    tablePageChange(pagination) {
      let { current, pageSize } = pagination;
      console.log("0", current);
      console.log("00", pageSize);
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.entranceguardpage();
    },
    reset() {
      this.searchForm = {};
      this.entranceguardpage();
    },
    handleOk(e) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.addVisible = false;
          if (e) {
            this.addForm.id = e;
          }
          this.entranceguardsave();
          this.addForm = {};
        }
      });
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.addVisible = false;
      this.addForm = {};
       this.entranceguardpage();
    },
  },
  mounted() {
    this.entranceguardpage();
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
  .main {
    // text-align: center;
  }
  // .ant-table-wrapper {
  //   width: 1500px;
  // }
  span {
    color: rgb(10, 66, 187);
  }
}
</style>