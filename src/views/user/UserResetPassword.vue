<script setup>
import { Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { updatePwdService } from '@/api/user.js'
import { useTokenStore } from '@/stores/token.js'

// 表单引用
const formRef = ref()

// 表单数据模型
const pwdData = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

// 校验新密码和确认密码是否一致
const checkRePwd = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请再次输入新密码'))
  } else if (value !== pwdData.value.new_pwd) {
    callback(new Error('两次输入的新密码不一致'))
  } else {
    callback()
  }
}

// 表单校验规则
const rules = {
  old_pwd: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 5, max: 16, message: '新密码长度为5~16位', trigger: 'blur' }
  ],
  re_pwd: [{ validator: checkRePwd, trigger: 'blur' }]
}

const router = useRouter()
const tokenStore = useTokenStore()

// 修改密码函数
const updatePwd = async () => {
  try {
    // 表单验证
    await formRef.value.validate()

    // 取 token
    const token = tokenStore.token
    if (!token) {
      ElMessage.error('登录已过期，请重新登录')
      router.push('/login')
      return
    }

    // 调用接口
    const result = await updatePwdService(pwdData.value, token)

    ElMessage.success(result.message || '密码修改成功，请重新登录')

    // 清空 token
    tokenStore.removeToken()

    // 跳转登录
    router.push('/login')
  } catch (error) {
    // 处理错误
    if (error?.response?.data?.message) {
      ElMessage.error(error.response.data.message)
    } else if (error?.message) {
      ElMessage.error(error.message)
    } else {
      ElMessage.error('修改失败，请稍后重试')
    }
  }
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form
        ref="formRef"
        size="large"
        autocomplete="off"
        :model="pwdData"
        :rules="rules"
      >
        <el-form-item>
          <h1>修改密码</h1>
        </el-form-item>

        <el-form-item prop="old_pwd">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入原密码"
            v-model="pwdData.old_pwd"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item prop="new_pwd">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入新密码"
            v-model="pwdData.new_pwd"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item prop="re_pwd">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请确认新密码"
            v-model="pwdData.re_pwd"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item>
          <el-button class="button" type="primary" @click="updatePwd">
            确认修改
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .button {
      width: 100%;
    }
  }
}
</style>
