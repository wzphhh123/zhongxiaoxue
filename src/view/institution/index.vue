<template>
  <div>
    <div class="mb20">
      <a-button type="primary" @click="addVisible = true">新增</a-button>
    </div>
    <a-table
      bordered
      :columns="columns"
      :data-source="dataList"
      :rowKey="(record) => record.id">
        <template slot="operation" slot-scope="text, record">
          <a-tooltip>
            <template slot="title"> 编辑</template>
            <a-icon
              type="edit"
              theme="twoTone"
              @click="(addForm = record),addVisible=true "
            />
            <a-divider type="vertical" />
          </a-tooltip>

          <a-popconfirm
            title="确定删除？"
            ok-text="是"
            cancel-text="否"
            @confirm="Delydtywebuseradmin(record.id)"
          >
            <a-tooltip>
              <template slot="title"> 删除 </template>
              <a-icon type="delete" theme="twoTone" />
            </a-tooltip>
          </a-popconfirm>
        </template>
    </a-table>
    <a-modal
      :title="addForm.id ? '修改' : '新增'"
      :visible="addVisible"
      @ok="handleOk()"
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
        <a-form-model-item label="机构名称" prop="name">
          <a-input v-model="addForm.name" />
        </a-form-model-item>
        <a-form-model-item label="账号" prop="account">
          <a-input v-model="addForm.account" />
        </a-form-model-item>
        <a-form-model-item label="密码" prop="password">
          <a-input v-model="addForm.password" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  data(){
    return{
      columns: [
        {
          title: "机构名称",
          dataIndex: "name",
          align: "center",
        },
        {
          title: "账号",
          dataIndex: "account",
          align: "center",
        },
        {
          title: "操作",
          dataIndex: "operation",
          align: "center",
          scopedSlots: { customRender: "operation" },
        },
      ],
      dataList: [],
      // 新增、编辑
      labelCol2: { span: 6 },
      wrapperCol2: { span: 12 },
      addForm: {},
      rules: {
        name: [{required: true,message: "请填写机构名称",trigger: "blur",}],
        account: [{required: true,message: "请填写账号",trigger: "blur",}],
        password: [{required: true,message: "请填写密码",trigger: "blur",}],
      },
      addVisible: false,
    }
  },
  methods:{
    // 删除机构
    async Delydtywebuseradmin(id){
      const res = await  this.$api.Delydtywebuseradmin({id})
      if (res.success) {
        this.$message.success(res.msg);
        this.ydtywebuseradmin();
      } else {
        this.$message.warn(res.msg);
      }
    },
    handleOk() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.addVisible = false;
          this.useradminregister();
          this.addForm = {};
        }
      });
    },
    handleCancel(e) {
      this.addVisible = false;
      this.addForm = {};
    },
    // 修改/添加机构
    async useradminregister(){
      const res = await this.$api.useradminregister(this.addForm)
      if (res.success) {
        this.$message.success(res.msg);
        this.ydtywebuseradmin();
      } else {
        this.$message.warn(res.msg);
      }
    },
    // 查询机构列表
    async ydtywebuseradmin(){
      const res = await this.$api.ydtywebuseradmin()
      this.dataList = res.data
    }
  },
  created(){
    this.ydtywebuseradmin()
  }
}
</script>

<style>

</style>