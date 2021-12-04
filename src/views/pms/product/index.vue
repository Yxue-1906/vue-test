<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="100px">
          <el-form-item label="课程名称：">
            <el-input style="width: 203px" v-model="listQuery.crsName" placeholder="课程名称"></el-input>
          </el-form-item>
          <el-form-item label="可选年级：">
            <el-input style="width: 203px" v-model.number="addForm.crsGrade" placeholder="可选年级"></el-input>
          </el-form-item>
          <el-form-item label="可选专业：">
            <el-input style="width: 203px" v-model.number="listQuery.crsMajor" placeholder="可选专业"></el-input>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-form-item>
                <el-button
                  style="float: right"
                  @click="handleSearchList()"
                  type="primary"
                  size="small">
                  查询
                </el-button>
              </el-form-item>
              <el-form-item>
                <el-button
                  style="float: right;margin-right: 15px"
                  @click="handleResetSearch()"
                  size="small">
                  重置
                </el-button>
              </el-form-item>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addVisible = true"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="课程编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.courseID }}</template>
        </el-table-column>
        <el-table-column label="教师名称" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.teacher }}</p>
          </template>
        </el-table-column>
        <el-table-column label="出售者" width="120" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.seller_username }}</p>
          </template>
        </el-table-column>
        <!--        <el-table-column label="出售者学号" width="120" align="center">-->
        <!--          <template slot-scope="scope">-->
        <!--            <p>价格：￥{{ scope.row.sellerID }}</p>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>
    </div>

    <!--    <div class="batch-operate-container">-->
    <!--      <el-select-->
    <!--        size="small"-->
    <!--        v-model="operateType" placeholder="批量操作">-->
    <!--        <el-option-->
    <!--          v-for="item in operates"-->
    <!--          :key="item.value"-->
    <!--          :label="item.label"-->
    <!--          :value="item.value">-->
    <!--        </el-option>-->
    <!--      </el-select>-->
    <!--      <el-button-->
    <!--        style="margin-left: 20px"-->
    <!--        class="search-button"-->
    <!--        @click="handleBatchOperate()"-->
    <!--        type="primary"-->
    <!--        size="small">-->
    <!--        确定-->
    <!--      </el-button>-->
    <!--    </div>-->
    <!--    <div class="pagination-container">-->
    <!--      <el-pagination-->
    <!--        background-->
    <!--        @size-change="handleSizeChange"-->
    <!--        @current-change="handleCurrentChange"-->
    <!--        layout="total, sizes,prev, pager, next,jumper"-->
    <!--        :page-size="listQuery.pageSize"-->
    <!--        :page-sizes="[5,10,15]"-->
    <!--        :current-page.sync="listQuery.pageNum"-->
    <!--        :total="total">-->
    <!--      </el-pagination>-->
    <!--    </div>-->
    <el-dialog title="添加出售" :visible.sync="addVisible">
      <el-form :model="addForm">
        <el-form-item label="课程编号" :label-width="'120px'">
          <el-input v-model="addForm.crsID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="教师" :label-width="'120px'">
          <el-input v-model="addForm.teacher" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddProduct">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
import {getSellingList} from '../../../api/trade'
import {addSale} from "../../../api/product";

const defaultListQuery = {
  crsName: "",
  crsGrade: 0,
  crsMajor: 0
};
export default {
  name: "courseList",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: true,
      addVisible: false,
      // selectProductCateValue: null,
      // multipleSelection: [],
      // productCateOptions: [],
      // brandOptions: [],
      // publishStatusOptions: [{
      //   value: 1,
      //   label: '上架'
      // }, {
      //   value: 0,
      //   label: '下架'
      // }],
      addForm: {
        crsID: "",
        teacher: "",
      }
    }
  },
  created() {
    this.getList();
    this.addForm.crsID = '';
    this.addForm.teacher = '';
  },
  watch: {
    //   selectProductCateValue: function (newValue) {
    //     if (newValue != null && newValue.length == 2) {
    //       this.listQuery.productCategoryId = newValue[1];
    //     } else {
    //       this.listQuery.productCategoryId = null;
    //     }
    //   }
    // },
    // filters: {
    //   verifyStatusFilter(value) {
    //     if (value === 1) {
    //       return '审核通过';
    //     } else {
    //       return '未审核';
    //     }
    //   }
  },
  methods: {
    getList() {
      this.listLoading = true;
      //todo:
      let queryAttr = {};
      if (this.listQuery.crsName == null || this.listQuery.crsName === "") {
        queryAttr.course_name = '';
      } else {
        queryAttr.course_name = this.listQuery.crsName;
      }
      queryAttr.course_major = this.listQuery.crsMajor;
      queryAttr.course_grade = this.listQuery.crsGrade;
      queryAttr.year = 0;
      getSellingList(queryAttr).then(response => {
        this.listLoading = false;
        this.list = response.data.items;
        console.log(this.list)
        this.total = this.list.length;
      });
    },
    handleSearchList() {
      this.getList();
    },
    handleAddProduct() {
      // this.$router.push({path: '/pms/addProduct'});
      addSale(this.addForm).then(() => {
        this.addVisible = false;
        this.$message({message: "提交成功!", type: "success", duration: 2 * 1000})
        location.reload()
      }).catch(error => {
        this.addVisible = false;
        this.$message({message: "error", type: "error"})
      })
    },
    // handleCurrentChange(val) {
    //   this.listQuery.pageNum = val;
    //   this.getList();
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleResetSearch() {
      this.selectProductCateValue = [];
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleDelete(index, row) {
      this.$confirm('是否要进行删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = [];
        ids.push(row.id);
        this.updateDeleteStatus(1, ids);
      });
    },
    handleShowProduct(index, row) {
      console.log("handleShowProduct", row);
    },
    //   updateDeleteStatus(deleteStatus, ids) {
    //     let params = new URLSearchParams();
    //     params.append('ids', ids);
    //     params.append('deleteStatus', deleteStatus);
    //     updateDeleteStatus(params).then(response => {
    //       this.$message({
    //         message: '删除成功',
    //         type: 'success',
    //         duration: 1000
    //       });
    //     });
    //     this.getList();
    //   }
  }
}

</script>
<style></style>


