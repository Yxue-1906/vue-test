<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>我卖出的</span>
    </el-card>
    <div class="table-container">
      <el-table ref="sellingTable"
                :data="mySoldList"
                style="width: 100%"
                v-loading="listLoading"
                border>
        <el-table-column label="课程名称" min-width="40%" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="开课教师" min-width="20%" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.teacher }}</p>
          </template>
        </el-table-column>
        <el-table-column label="可选年级" min-width="10%" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.grade }}</p>
          </template>
        </el-table-column>
        <el-table-column label="可选专业" min-width="10%" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.grade }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="10%" align="center">
          <template slot-scope="scope">
            <p>
              <el-button size="mini"
                         v-if="hasPermission(scope.row)"
                         @click="handleDeleteSelling(scope.row)">删除
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyPurchase",
  data() {
    return {
      mySoldList: null,
      listLoading: true,
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
    this.getMyList();
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
    getMyList() {
      this.listLoading = true;
      getMyAskingList().then(response => {
        this.listLoading = false;
        this.mySoldList = response.data.items;
        // this.total = this.list.length;
      });
    },
    hasPermission(item) {
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
    handleCancelAdd() {
      this.addVisible = false;
      this.searchCourseData = defaultCourseQuery;
      this.updateCourseDetail()
    },
    handleAddSelling() {
      if (this.courses.length !== 1) {
        this.$message({message: "您提供的课程信息有误, 请检查后重新添加.", type: "error"});
        return;
      }
      addAsking({courseID: this.courses[0].course_id}).then(() => {
        this.addVisible = false;
        this.$message({message: "提交成功!", type: "success", duration: 2 * 1000})
        location.reload()
      }).catch(error => {
        this.addVisible = false;
        // this.$message({message: "error", type: "error"})
      })
    },
    handleDeleteSelling(row) {
      this.$confirm('是否要进行删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAsking({courseID: row.course.course_id}).then(() => {
          this.$message({message: "删除成功!", type: "success", duration: 2 * 1000})
          location.reload();
        })
      });
    },
  }
}

</script>
<style></style>
