<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="sellingQuery" size="small" label-width="100px">
          <el-form-item label="课程名称：">
            <el-input style="width: 203px" v-model="sellingQuery.course_name" placeholder="课程名称"></el-input>
          </el-form-item>
          <el-form-item label="可选年级：">
            <el-select name="grade"
                       ref="grade"
                       v-model="sellingQuery.course_grade">
              <el-option v-for="grade in grades"
                         :key="grade.value"
                         :label="grade.label"
                         :value="grade.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="可选专业：">
            <el-select name="major"
                       ref="major"
                       v-model="sellingQuery.course_major">
              <el-option v-for="major in [{major_id: 0, major_name: '所有专业'},...majors]"
                         :key="major.major_id"
                         :label="major.major_name"
                         :value="major.major_id"></el-option>
            </el-select>
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
      <span>出售列表</span>
      <el-button
        class="btn-add"
        @click="addVisible = true"
        size="mini">
        添加出售
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="sellingTable"
                :data="sellingList"
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
        <el-table-column label="可选年级" min-width="10%" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.course.grade }}</p>
          </template>
        </el-table-column>
        <el-table-column label="可选专业" min-width="10%" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.course.major }}</p>
          </template>
        </el-table-column>
        <el-table-column label="出售者" min-width="10%" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.username }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="10%" align="center">
          <template slot-scope="scope">
            <p>
              <el-button size="mini"
                         v-if="hasBuyPermission(scope.row)"
                         @click="handleBuy(scope.row)">购买
              </el-button>
              <el-button size="mini"
                         v-if="hasDeletePermission(scope.row)"
                         @click="handleDeleteSelling(scope.row)">删除
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="添加出售" :visible.sync="addVisible">
      <el-form :model="searchCourseData">
        <el-form-item label="课程名称" :label-width="'120px'">
          <el-select v-model="searchCourseData.name"
                     filterable
                     clearable
                     remote
                     placeholder="请输入课程名称"
                     :remote-method="handleQueryByName"
                     @change="updateCourseDetail">
            <el-option v-for="course_name in new Set(courses.map(ele=>ele.name))"
                       :key="course_name"
                       :label="course_name"
                       :value="course_name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教师" :label-width="'120px'">
          <el-select v-model="searchCourseData.teacher"
                     filterable
                     clearable
                     remote
                     placeholder="请输入开课教师"
                     :remote-method="handleQueryByTeacher"
                     @change="updateCourseDetail">
            <el-option v-for="teacher_name in new Set(courses.map(ele=>ele.teacher))"
                       :key="teacher_name"
                       :label="teacher_name"
                       :value="teacher_name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="可选年级" :label-width="'120px'">
          <el-select v-model.number="searchCourseData.grade"
                     filterable
                     clearable
                     remote
                     placeholder="请输入可选年级"
                     :remote-method="handleQueryByGrade"
                     @change="updateCourseDetail">
            <el-option v-for="grade in new Set(courses.map(ele=>ele.grade))"
                       :key="grade"
                       :label="grade"
                       :value="grade"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="可选专业" :label-width="'120px'">
          <el-select v-model.number="searchCourseData.major"
                     filterable
                     clearable
                     placeholder="请选择专业">
            <el-option v-for="major in majors"
                       :key="major.major_id"
                       :label="major.major_name"
                       :value="major.major_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开课年份" :label-width="'120px'">
          <el-select v-model.number="searchCourseData.year"
                     filterable
                     remote
                     clearable
                     :remote-method="handleQueryByYear"
                     @change="updateCourseDetail"
                     placeholder="请选择开课年份">
            <el-option v-for="year in new Set(courses.map(e=>e.year))"
                       :key="year"
                       :label="year"
                       :value="year"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" :label-width="'120px'">
          <el-button @click="handleReset">重 置</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancelAdd">取 消</el-button>
        <el-button type="primary" @click="handleAddProduct">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
import {buySelling, addSelling, getSellingList, deleteSelling} from '../../api/trade'
import {getCourse, getMajors} from "../../api/info";

const defaultSellingQuery = {
  course_name: "",
  course_grade: 0,
  course_major: 0
};
const defaultCourseQuery = {
  name: "",
  teacher: "",
}
export default {
  name: "AllSelling",
  data() {
    return {
      sellingQuery: Object.assign({}, defaultSellingQuery),
      sellingList: null,
      total: null,
      listLoading: true,
      addVisible: false,
      searchCourseData: {},
      majors: [],
      courses: [],
      grades: [
        {
          value: 0,
          label: "所有年级"
        },
        {
          value: 2018,
          label: '2018级'
        },
        {
          value: 2019,
          label: '2019级'
        },
        {
          value: 2020,
          label: '2020级'
        },
        {
          value: 2021,
          label: '2021级'
        }
      ],
      years: [2018, 2019, 2020, 2021],
    }
  },
  created() {
    this.getList();
    new Promise((resolve, reject) => {
      getMajors().then(response => {
        this.majors = response.data.items;
      })
      resolve();
    }).catch(err => {
      reject(err);
    })
    new Promise((resolve, reject) => {
      getCourse(defaultCourseQuery).then(response => {
        this.courses = response.data.items;
      })
      resolve();
    }).catch(err => {
      reject();
    })
  },
  methods: {
    getList() {
      this.listLoading = true;
      getSellingList(this.sellingQuery).then(response => {
        this.listLoading = false;
        this.sellingList = response.data.items;
        // this.total = this.list.length;
      });
    },
    hasBuyPermission(item) {
      return item.Account !== this.$store.getters.account;
    },
    hasDeletePermission(item) {
      if (this.$store.getters.authority < 2)
        return true;
      return item.Account === this.$store.getters.account;
    },
    handleQueryByName(name) {
      this.handleGetCoursesDetail({...this.searchCourseData, name: name});
    },
    handleQueryByTeacher(teacher) {
      this.handleGetCoursesDetail({...this.searchCourseData, teacher: teacher});
    },
    handleQueryByGrade(grade) {
      grade = parseInt(grade);
      this.handleGetCoursesDetail({...this.searchCourseData, grade: grade});
    },
    handleQueryByMajor(major) {
      major = parseInt(major);
      this.handleGetCoursesDetail({...this.searchCourseData, major: major});
    },
    handleQueryByYear(year) {
      year = parseInt(year);
      this.handleGetCoursesDetail({...this.searchCourseData, year: year});
    },
    updateCourseDetail() {
      if (!Number.isInteger(this.searchCourseData.year))
        delete this.searchCourseData.year
      if (!Number.isInteger(this.searchCourseData.major))
        delete this.searchCourseData.major;
      if (!Number.isInteger(this.searchCourseData.grade))
        delete this.searchCourseData.grade;
      getCourse(this.searchCourseData).then(response => {
        this.courses = response.data.items == null ? [] : response.data.items;
        if (this.courses.length === 1) {
          let course = this.courses[0];
          this.searchCourseData.name = course.name;
          this.searchCourseData.grade = course.grade;
          this.searchCourseData.major = course.major;
          this.searchCourseData.teacher = course.teacher;
          this.searchCourseData.year = course.year;
        }
      })
    },
    handleGetCoursesDetail(queryData) {
      if (!Number.isInteger(queryData.year))
        delete queryData.year
      if (!Number.isInteger(queryData.major))
        delete queryData.major;
      if (!Number.isInteger(queryData.grade))
        delete queryData.grade;
      getCourse(queryData).then(response => {
        this.courses = response.data.items == null ? [] : response.data.items;
        if (this.courses.length === 1) {
          let course = this.courses[0];
          this.searchCourseData.name = course.name;
          this.searchCourseData.grade = course.grade;
          this.searchCourseData.major = course.major;
          this.searchCourseData.teacher = course.teacher;
          this.searchCourseData.year = course.year;
        }
      })
    },
    handleSearchList() {
      this.getList();
    },
    handleReset() {
      this.searchCourseData = Object.assign({}, defaultCourseQuery);
      this.updateCourseDetail();
    },
    handleCancelAdd() {
      this.addVisible = false;
      this.handleReset();
    },
    handleAddProduct() {
      if (this.courses.length !== 1) {
        this.$message({message: "您提供的课程信息有误, 请检查后重新添加.", type: "error"});
        return;
      }
      addSelling({courseID: this.courses[0].course_id}).then(() => {
        this.addVisible = false;
        this.$message({message: "提交成功!", type: "success", duration: 2 * 1000})
        location.reload()
      }).catch(error => {
        this.addVisible = false;
        // this.$message({message: "error", type: "error"})
      })
    },
    handleResetSearch() {
      this.sellingQuery = Object.assign({}, defaultSellingQuery);
    },
    handleDeleteSelling(row) {
      this.$confirm('是否要进行删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSelling({courseID: row.course.course_id}).then(() => {
          this.$message({message: "删除成功!", type: "success", duration: 2 * 1000})
          location.reload();
        })
      });
    },
    handleBuy(item) {
      console.log(item);
      buySelling({account: item.Account, courseID: item.course.course_id}).then(() => {
        this.$message({message: "购买成功!", type: "success", duration: 2 * 1000})
        location.reload();
      })
    }
  }
}

</script>
<style></style>


