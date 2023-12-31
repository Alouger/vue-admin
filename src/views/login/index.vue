<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <lang-select class="lang-select"></lang-select>
      </div>

      <!-- 用户名 -->
      <!-- Form 组件提供了表单验证的功能，只需为 rules 属性传入约定的验证规则，
        并将 form-Item 的 prop 属性设置为需要验证的特殊键值即可。 -->
      <el-form-item prop="username">
        <!-- 用户名图标 -->
        <span class="svg-container">
          <svg-icon icon="user" />
        </span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password">
        <!-- 密码图标 -->
        <span class="svg-container">
          <svg-icon icon="password" />
        </span>
        <el-input
          placeholder="password"
          name="password"
          v-model="loginForm.password"
          :type="passwordType"
        ></el-input>
        <span class="show-pwd" @click="onChangePwdType">
          <!-- <span class="svg-container"> -->
          <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'" />
          <!-- </span> -->
        </span>
      </el-form-item>

      <!-- 登录按钮 -->
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click="handleLogin"
        :loding="loading"
        >{{ $t('msg.login.loginBtn') }}</el-button
      >

      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup>
// 导入的组件可以直接使用，不用通过component来进行注册了
// import { Avatar } from '@element-plus/icons'
// import SvgIcon from '@/components/SvgIcon/index.vue'
import { ref } from 'vue'
import { validatePassword } from './rules'
import { useStore } from 'vuex'
import LangSelect from '@/components/LangSelect'
import { useI18n } from 'vue-i18n'

// 数据源
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})

// 验证规则
const i18n = useI18n()
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      // message: '用户名为必填项'
      message: i18n.t('msg.login.usernameRule')
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      // 新建一个文件写一个函数来验证
      validator: validatePassword()
    }
  ]
})

// 密码框状态
const passwordType = ref('password')
// template中绑定的方法，直接声明即可
// 使用 ref 声明的数据，在script中使用时，需要加value来获取具体的值，但是在tempalte中使用的时候，不需要加 value
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

// 处理登录
const loading = ref(false)
// 通过useStore()获得vuex实例
const store = useStore()
// 通过创建一个值为null的ref变量，会自动取template中找相同变量名的引用ref，而不是像Vue2那样，写this.$refs.loginFormRef
const loginFormRef = ref(null)
const handleLogin = () => {
  // 触发user.js中的login这个action
  // 1. 进行表单校验
  loginFormRef.value.validate((valid) => {
    // 如果表单校验没有通过
    if (!valid) return
    // 2. 如果表单验证通通过，则触发登录动作
    loading.value = true
    store
      .dispatch('user/login', loginForm.value)
      .then(() => {
        loading.value = false
        // 3. 进行登录后处理
      })
      .catch((err) => {
        console.log(err)
        loading.value = false
      })
  })
}
</script>

<style lang="scss" scoped>
// 定义样式变量
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    // template中我们用到了el-form-item，它会自动带有一个类名，也就是class="el-form-item"，
    // 因为它是我们当前组件中的一个子组件的一个类名，
    // 所以我们想在父组件里面为子组件指定样式的话就要用到深度选择器::v-deep来选择到子组件里面一个具体的类名
    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      line-height: 47px;

      // el-input内部的input
      input {
        background: transparent;
        // background-color: none;
        border: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        // 光标颜色
        caret-color: $cursor;
      }
      .el-input__wrapper {
        background-color: transparent;
        box-shadow: none;
      }
    }
  }
  .tips {
      font-size: 16px;
      color: white;
      line-height: 24px;
    }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    // 对齐
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    use-select: none;
  }

  /* 教程里加了::v-deep，但我没加::v-deep的话也能正确显示LangSelect组件 */
  ::v-deep .lang-select {
    position: absolute;
    top: 4px;
    right: 0px;
    font-size: 22px;
    background-color: #fff;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
