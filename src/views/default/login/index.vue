<template>
  <section class="login login-container">
    <div class="login-mask" />
    <div class="login-form">
      <div class="login-form-box">
        <div class="login-form-content">
          <header>
            <h1>{{ title }}</h1>
          </header>
          <el-form ref="refForm" :model="loginForm" :rules="loginRules" autocomplete="on" label-position="left">
            <el-form-item prop="name">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input v-model="loginForm.name" placeholder="账号" name="name" type="text" tabindex="1" autocomplete="on" autofocus />
            </el-form-item>
            <el-tooltip v-model="capsTooltip" content="大写锁定已开启" placement="right" manual>
              <el-form-item prop="password">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="密码" name="password"
                  tabindex="2" autocomplete="on" @keyup="checkCapslock" @blur="capsTooltip = false" @keyup.enter="handleLogin"
                />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
              </el-form-item>
            </el-tooltip>

            <el-button :loading="loading" type="primary" class="loginBtn" @click.prevent="handleLogin">登陆</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, unref, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { ElForm, ElMessage } from 'element-plus';
import config from '@/config';
import { userStore } from '@/store/modules/user';

const validateUsername = (rule: string, value: string, callback: Function) => {
  if (!value || !value.trim().toString().length) {
    callback(new Error('请输入正确的用户名'));
  } else {
    callback();
  }
};

const validatePassword = (rule: string, value: string, callback: Function) => {
  if (value.length < 6) {
    callback(new Error('密码是域账户密码'));
  } else {
    callback();
  }
};

export default defineComponent({
  name: 'Login',

  setup() {
    const { currentRoute, replace } = useRouter();
    const loading = ref(false);
    const loginRules = {
      name: [{ required: true, trigger: 'blur', validator: validateUsername }],
      password: [{ required: true, trigger: 'blur', validator: validatePassword }]
    };
    const { title } = config;
    const refForm = ref<Nullable<typeof ElForm>>(null);
    const passwordType = ref('password');
    const capsTooltip = ref(false);
    const loginForm = reactive({
      name: '',
      password: ''
    });

    const showPwd = () => {
      passwordType.value = passwordType.value === 'password' ? '' : 'password';
    };

    /*
    * 登陆处理
    * */
    const handleLogin = async () => {
      const form = unref(refForm);
      if (!form) return;
      loading.value = true;
      try {
        await form.validate();
        const userInfo = await userStore.login(toRaw(loginForm));
        if (userInfo) {
          const { redirect, ...query } = currentRoute.value.query;
          replace({
            path: redirect as string || '/',
            query: {
              ...query
            }
          });
          ElMessage.success('登陆成功！');
        }
      } catch (e) {
        console.log(e);
      } finally {
        loading.value = false;
      }
    };

    const checkCapslock = (e: KeyboardEvent) => {
      const { key } = e;
      capsTooltip.value = !!(key && key.length === 1 && (key >= 'A' && key <= 'Z'));
    };

    return {
      title,
      loading,
      refForm,
      loginRules,
      loginForm,
      passwordType,
      capsTooltip,
      showPwd,
      handleLogin,
      checkCapslock
    };
  }
});
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#FFF;
$light_gray:#343434;
$cursor: #343434;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(66, 66, 66, 0.2); margin-bottom: 30px;
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style lang="scss" scoped>
  @mixin media {
    @media only screen and (min-width: 576px) {
      @content
    }
  }
  .login {
    position: relative; height: 100vh; background: url('../../../assets/images/login/login-bg.png') no-repeat; background-size: 100% 100%;
    &-mask {
      display: none; height: 100%; background: url('../../../assets/images/login/login-in.png') no-repeat; background-position: 30% 30%; background-size: 80% 80%;
      @include media {
        display: block;
      }
    }
    &-form {
      position: absolute; top: 0; right: 0; display: flex; width: 100%; height: 100%; justify-content: center; align-items: center;
      @include media {
        justify-content: flex-end;
      }
      &-box {
        position: relative; bottom: 60px; max-width: 400px; width: 95%; background: #ffffff; border: 10px solid rgba(255, 255, 255, 0.5);
        border-radius: 4px; background-clip: padding-box;
        @include media {
          margin: 0 120px 0 50px
        }
      }
      &-content {
        position: relative; width: 100%; height: 100%; padding: 60px 0 40px 0; border: 1px solid #999; border-radius: 2px;
        header {
          display: flex; justify-content: center; align-items: center;
        }
        h1 {
          margin-bottom: 50px; font-size: 24px; text-align: center; font-weight: normal;
        }
        form {
          width: 80%; margin: 0 auto;
        }
        .svg-container {
          padding: 6px 5px 6px 15px; color: #889aa4; vertical-align: middle; width: 30px; display: inline-block;
        }
        .show-pwd {
          position: absolute; right: 10px; top: 7px; font-size: 16px; color: #889aa4; cursor: pointer; user-select: none;
        }
        .loginBtn{
          width: 100%; height: 45px; letter-spacing: 10px;
        }
      }
    }
  }
</style>
