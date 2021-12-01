<template>
  <div class="fillContainer">
    <div>
      <!-- 添加按钮 -->
      <el-form :inline="true" ref="add_data">
        <el-form-item class="btnRight">
          <el-button
            type="primary"
            size="small"
            icon="view"
            @click="handleAdd()"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        max-height="450"
        border
        v-if="tableData.length > 0"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column align="center" type="index" label="序号" width="70">
        </el-table-column>
        <el-table-column
          align="center"
          prop="date"
          label="创建时间"
          width="230"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="type"
          label="收支类型"
          width="140"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="describe"
          label="收支描述"
          width="150"
        >
        </el-table-column>
        <el-table-column align="center" prop="incode" label="收入" width="130">
          <template slot-scope="scope">
            <span style="color: #00d053">{{ scope.row.incode }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="expend" label="支出" width="130">
          <template slot-scope="scope">
            <span style="color: #f56767">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="cash"
          label="账户现金"
          width="130"
        >
          <template slot-scope="scope">
            <span style="color: #4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="remark" label="备注" width="180">
        </el-table-column>
        <el-table-column
          label="操作"
          prop="operation"
          align="center"
          fixed="right"
          width="150"
        >
          <template slot-scope="scope">
            <el-button
              type="warning"
              icon="edit"
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              icon="delete"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Dialog :formData="formData" :dialog="dialog" @update="getProfile" />
  </div>
</template>

<script>
import Dialog from "../components/Dialog";
export default {
  name: "fundList",
  data() {
    return {
      formData: {
        type: "",
        describe: "",
        incode: "",
        expend: "",
        cash: "",
        remark: "",
        id: "", //序号
      },
      tableData: [],
      dialog: {
        show: false, //默认隐藏弹窗，点击按钮后show改为true
        title: "", //用于添加或修改操作
        option: "edit", //点击按钮时默认为edit
      },
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      //获取表格数据
      this.$axios
        .get("/api/profiles")
        .then((res) => {
          //获取response，里面包含了表格数据
          // console.log(res);
          this.tableData = res.data;
        })
        .catch((err) => console.log(err));
    },
    handleEdit(index, row) {
      //编辑
      console.log(this.dialog); //输出data中的dialog
      this.dialog = {
        show: true, //弹窗
        title: "修改资金信息",
        option: "edit",
      };

      //获取当前行的formData
      this.formData = {
        type: row.type,
        describe: row.describe,
        incode: row.incode,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id,
      };
    },
    handleDelete(index, row) {
      this.$axios.delete(`/api/profiles/delete/${row._id}`).then((res) => {
        this.$message("删除成功！");
        this.getProfile();
      });
    },
    handleAdd() {
      this.dialog = {
        show: true, //弹窗
        title: "添加资金信息",
        option: "add",
      };
      this.formData = {
        type: "",
        describe: "",
        incode: "",
        expend: "",
        cash: "",
        remark: "",
        id: "",
      };
    },
  },
  components: {
    Dialog,
  },
};
</script>

<style scoped>
.fillContainer {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
</style>