<template>
  <div class="app-container">
    <el-form ref="form" v-loading="loading" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入管理员账号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" :placeholder="!isEdit ? '请输入管理员密码' : '无需修改密码，请留空'" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" placeholder="请输入管理员昵称" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入管理员邮箱" />
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validEmail } from '@/utils/validate'
import { create, update, fetchData } from '@/api/coreAdmin'

// 定义表单
const defaultForm = {
  username: '',
  password: '',
  nickname: '',
  email: '',
  status: 0
}

export default {
  name: 'CoreAdminDetail',
  // 定义参数
  props: {
    // 是否为编辑状态
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // 自定义验证规则 -> 必填
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('该项为必填项'))
      } else {
        callback()
      }
    }

    // 自定义验证规则 -> 邮箱
    const validateEmail = (rule, value, callback) => {
      if (value) {
        // 调用邮箱验证方法
        if (validEmail(value)) {
          callback()
        } else {
          callback(new Error('邮箱地址填写不正确'))
        }
      } else {
        callback()
      }
    }

    return {
      loading: false,
      // 绑定表单
      form: Object.assign({}, defaultForm),
      rules: {
        username: [{ validator: validateRequire }],
        password: [
          !this.isEdit ? { validator: validateRequire } : {},
          { min: 6, max: 20, message: '密码长度在 6 到 20 个字符之间', trigger: 'blur' }
        ],
        nickname: [{ validator: validateRequire }],
        // 邮箱验证，这里匹配多种验证情形，必填和邮箱，并且验证邮箱只在 blur 事件时触发
        email: [
          { validator: validateRequire },
          { validator: validateEmail, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 如果为编辑状态则加载详情
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.getData(id)
    }
  },

  methods: {
    getData(id) {
      this.loading = true
      fetchData(id).then(response => {
        this.form = response.data
        this.form.password = ''
        this.loading = false
      }, error => {
        if (error) {
          this.loading = false
        }
      })
    },

    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!this.isEdit) {
            this.onCreate()
          } else {
            this.onEdit()
          }
        } else {
          this.$message({
            message: '请检查表单并重新填写内容',
            type: 'warning'
          })
          return false
        }
      })
    },

    onCreate() {
      this.loading = true
      create(this.form).then(response => {
        this.$notify({
          title: '温馨提示',
          message: response.message,
          type: 'success',
          duration: 3000
        })
        this.loading = false
        // 表单重置
        this.$refs.form.resetFields()
      }, error => {
        if (error) {
          this.loading = false
        }
      })
    },

    onEdit() {
      this.loading = true
      update(this.form).then(response => {
        this.$notify({
          title: '温馨提示',
          message: response.message,
          type: 'info',
          duration: 3000
        })
        this.form.password = ''
        this.loading = false
      }, error => {
        if (error) {
          this.loading = false
        }
      })
    }
  }
}
</script>
