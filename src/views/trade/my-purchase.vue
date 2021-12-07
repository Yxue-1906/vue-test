<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>我买到的</span>
    </el-card>
    <div class="table-container">
      <el-table ref="sellingTable"
                :data="myPurchaseList"
                style="width: 100%"
                v-loading="listLoading"
                border>
        <el-table-column label="课程名称" min-width="40%" align="center">
          <template slot-scope="scope">{{ scope.row.course.name }}</template>
        </el-table-column>
        <el-table-column label="开课教师" min-width="20%" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.course.teacher }}</p>
          </template>
        </el-table-column>
        <el-table-column label="可选年级" min-width="15%" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.course.grade + '级' }}</p>
          </template>
        </el-table-column>
        <el-table-column label="开课年份" min-width="15%" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.course.year }}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {getMyPurchaseList} from "../../api/trade";

export default {
  name: "MyPurchase",
  data() {
    return {
      myPurchaseList: null,
      listLoading: true,
    }
  },
  created() {
    this.getLIst();
  },
  methods: {
    getLIst() {
      this.listLoading = true;
      getMyPurchaseList().then(response => {
        this.listLoading = false;
        this.myPurchaseList = response.data.items;
      });
    },
  }
}

</script>
<style></style>
