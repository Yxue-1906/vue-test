<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>课程列表</span>
      <el-button
        class="btn-add"
        @click="addVisible = true"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="adminTable"
                :data="courseList"
                style="width: 100%"
                border>
        <el-table-column label="课程名称" min-width="15%" align="center" h>
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="开课老师" min-width="15%" align="center">
          <template slot-scope="scope">{{ scope.row.teacher }}</template>
        </el-table-column>
        <el-table-column label="可选年级" min-width="15%" align="center">
          <template slot-scope="scope">{{ scope.row.grade }}</template>
        </el-table-column>
        <el-table-column label="可选专业" min-width="15%" align="center">
          <template slot-scope="scope">{{ scope.row.major }}</template>
        </el-table-column>
        <el-table-column label="开课年份" min-width="15%" align="center">
          <template slot-scope="scope">{{ scope.row.year }}</template>
        </el-table-column>
        <el-table-column label="操作" min-width="15%" align="center">
          <template slot-scope="scope">
            <p>
              <el-button @click="handleDeleteCourse(scope.row)">删除</el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="添加课程" :visible.sync="addVisible">
      <el-form :rules="addCourseRules"
               :model="courseDetail"
               ref="addCourseForm">
        <el-form-item prop="course_id" label="课程ID" :label-width="'120px'">
          <el-input @keyup.enter.native="handleAddCourse"
                    v-model="courseDetail.course_id"
                    placeholder="请输入课程ID"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="课程名称" :label-width="'120px'">
          <el-input @keyup.enter.native="handleAddCourse"
                    v-model="courseDetail.name"
                    placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item prop="teacher" label="开课老师" :label-width="'120px'">
          <el-input @keyup.enter.native="handleAddCourse"
                    v-model="courseDetail.teacher"
                    placeholder="请输入开课老师"></el-input>
        </el-form-item>
        <el-form-item prop="major" label="可选专业" :label-width="'120px'">
          <el-select v-model.number="courseDetail.major"
                     placeholder="请选择可选专业">
            <el-option v-for="major in majorList"
                       :label="major.major_name"
                       :value="major.major_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="grade" label="可选年级" :label-width="'120px'">
          <el-select v-model.number="courseDetail.grade"
                     placeholder="请选择可选年级">
            <el-option v-for="grade in grades"
                       :label="grade"
                       :value="grade"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="year" label="开课年份" :label-width="'120px'">
          <el-input @keyup.enter.native="handleAddCourse"
                    v-model.number="courseDetail.year"
                    placeholder="请输入开课年份"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancelAdd">取 消</el-button>
        <el-button type="primary" @click="handleAddCourse">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {addCourse, deleteCourse, getCourseList, getMajorList} from "../../../api/info";
import {MessageBox} from "element-ui";

export default {
  name: "CoursePanel",
  data() {
    return {
      courseDetail: {},
      courseList: [],
      majorList: [],
      grades: [2018, 2019, 2020, 2021],
      addVisible: false,
      addCourseRules: {
        course_id: [{required: true, trigger: 'blur', message: "请提供课程ID"}],
        name: [{required: true, trigger: 'blur', message: "请提供课程名称"}],
        teacher: [{required: true, trigger: 'blur', message: "请提供开课老师"}],
        major: [{required: true, trigger: 'blur', message: "请选择可选专业"}],
        grade: [{required: true, trigger: 'blur', message: "请选择可选年级"}],
        year: [{required: true, trigger: 'blur', message: "请选择开课年份"}],
      }
    }
  },
  created() {
    getCourseList({}).then(response => {
      this.courseList = response.data.items;
    });
    getMajorList().then(response => {
      this.majorList = response.data.items;
    })
  },
  methods: {
    handleCancelAdd() {
      this.addVisible = false;
      this.courseDetail = Object.assign({}, {});
      this.repeatPassword = "";
    },
    handleAddCourse() {
      this.$refs.addCourseForm.validate(valid => {
        if (valid) {
          addCourse(this.courseDetail).then(response => {
            this.$message({message: "添加成功!", type: "success", duration: 1000});
            this.courseDetail = Object.assign({}, {});
            this.addVisible = false;
            getCourseList().then(response => {
              this.courseList = response.data.items;
            })
          }).catch(err => {

          })
        } else {
          this.$message({message: "输入的课程信息不合法, 请检查后重新提交", type: "error", duration: 1000})
        }
      })
    },
    handleDeleteCourse(courseRow) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        console.log(courseRow)
        deleteCourse(courseRow.course_id).then(() => {
          this.$message({message: "删除成功!", type: "success", duration: 2 * 1000})
          getCourseList({}).then(response => {
            this.courseList = response.data.items;
          });
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .user-block {

    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username {
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;

    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {

      &:hover,
      &:focus {
        color: #999;
      }
    }
  }

}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>
