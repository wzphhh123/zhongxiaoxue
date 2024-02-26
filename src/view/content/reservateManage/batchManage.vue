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
          <a-form-model-item label="预约人">
            <a-input
              v-model="searchForm.name"
              placeholder="请输入预约人"
              allow-clear
            />
          </a-form-model-item>
          <a-form-model-item label="手机号码">
            <a-input
              v-model="searchForm.phone"
              placeholder="请输入手机号码"
              allow-clear
            />
          </a-form-model-item>

          <a-form-model-item label="预约时间">
            <!-- <a-input
              v-model="searchForm.name"
              style="width: 250px"
              placeholder="请输入预约人"
              allow-clear
            /> -->
            <a-date-picker
              valueFormat="YYYY-MM-DD HH:mm:ss"
              @change="changetime"
            />
          </a-form-model-item>
        </a-form-model>
        <a-button type="primary" @click="subscribefindAllPage()">查询</a-button>
        <a-button type="primary" @click="reset()">重置</a-button>
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
          <template slot="state" slot-scope="text">
            <span v-if="text == 0" style="color: green">未使用</span>
            <span v-if="text == 1" style="color: red">使用</span>
          </template>
          <template slot="operation" slot-scope="text, record">
            <a-tooltip>
              <template slot="title"> 生成二维码</template>
              <a-icon
                type="down-square"
                theme="twoTone"
                @click="experienceUserprint(record.id)"
              />
              <a-divider type="vertical" />
            </a-tooltip>
            <a-popconfirm
              title="确定删除？"
              ok-text="是"
              cancel-text="否"
              @confirm="subscribedelete(record.id)"
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
      title="导出二维码"
      :visible="erweimaVisible"
      @ok="handleOk()"
      @cancel="erweimaVisible = false"
      okText="导出"
      cancelText="取消"
    >
      <div id="myPrint" class="bigZindex">
        <div v-for="(item, index) in erweimaData" :key="index" class="erweima">
          <div class="name">{{ item.name }}</div>
          <div class="photo">
            <vue-qr :text="item.mark" :size="120"></vue-qr>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import vueQr from "vue-qr";
export default {
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 },
      labelCol2: { span: 6 },
      wrapperCol2: { span: 12 },
      columns: [
        {
          title: "预约人",
          dataIndex: "name",
          align: "center",
        },
        {
          title: "展馆名称",
          dataIndex: "areaName",
          align: "center",
        },

        {
          title: "参观人数",
          dataIndex: "quantity",
          align: "center",
        },
        {
          title: "电话",
          dataIndex: "phone",
          align: "center",
        },
        {
          title: "预约时间",
          dataIndex: "makeTime",
          align: "center",
        },

        {
          title: "开始-结束时间",
          dataIndex: "time",
          align: "center",
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
            message: "请填写人员预约人",
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
      erweimaData: [],
      QRcodeInfo: "",
      erweimaVisible: false,
    };
  },
  components: {
    vueQr,
  },
  methods: {
    // 批量生成二维码
    async experienceUserprint(e) {
      const res = await this.$api.experienceUserprint({ subscribeId: e });
      if (res.success) {
        // this.subscribefindAllPage();
        this.erweimaData = res.data;
        this.$message.success(res.msg);
        this.erweimaVisible = true;
      }
    },
    // 导出
    handlePrint() {
      var newWin = window.open(""); //新打开一个空窗口
      // for (var i = 0; i < this.tableData.length; i++) {
      //     var imageToPrint = document.getElementById("myPrint" + i); //获取需要打印的内容
      //     newWin.document.write(imageToPrint.outerHTML); //将需要打印的内容添加进新的窗口
      // }
      var imageToPrint = document.getElementById("myPrint"); //获取需要打印的内容
      newWin.document.write(imageToPrint.outerHTML); //将需要打印的内容添加进新的窗口
      const styleSheet = `<style>body{-webkit-print-color-adjust: exact;text-align:center;}.erweima{display: inline-block;}</style>`;
      newWin.document.head.innerHTML = styleSheet; //给打印的内容加上样式
      newWin.document.close(); //在IE浏览器中使用必须添加这一句
      newWin.focus(); //在IE浏览器中使用必须添加这一句
      setTimeout(function () {
        newWin.print(); //打印
        newWin.close(); //关闭窗口
      }, 100);
    },
    changetime(date, dateString) {
      console.log("e", dateString);
      this.searchForm.time = dateString;
      console.log("shijian", this.searchForm.time);
    },
    //批次列表
    async subscribefindAllPage() {
      var data = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
        name: this.searchForm.name,
        // type: this.searchForm.type,
        phone: this.searchForm.phone,
        time: this.searchForm.time,
      };
      const res = await this.$api.subscribefindAllPage(data);
      if (res.success) {
        this.dataLists = res.data.records;
        res.data.records.forEach((item) => {
          item.time = item.startTime + "~" + item.endTime;
        });
        this.pagination.total = res.data.total;
      }
    },
    // 删除开发者项目
    async subscribedelete(e) {
      const res = await this.$api.subscribedelete({ id: e });
      if (res.success) {
        this.subscribefindAllPage();
        this.$message.success(res.msg);
      }
    },
    tablePageChange(pagination) {
      let { current, pageSize } = pagination;
      console.log("0", current);
      console.log("00", pageSize);
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.subscribefindAllPage();
    },
    reset() {
      this.searchForm = {};
      this.subscribefindAllPage();
    },
    handleOk() {
      this.handlePrint();
      this.erweimaVisible = false;
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.addVisible = false;
      this.addForm = {};
    },
  },
  mounted() {
    this.subscribefindAllPage();
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
  span {
  }
}
.bigZindex {
  display: flex;
  justify-content: space-around;
   flex-wrap: wrap;
  .erweima {
    // margin-bottom: -20px;

    width: 100px;
   
    .name {
      text-align: center;
    }
    .photo {
      text-align: center;
      // margin-bottom: -20px;
    }
  }
}
</style>