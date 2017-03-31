<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
    }
    
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
   
</style>
<template>
    <div>
  {{login}}
  <div v-if='login' class="layout">
    <Headerbar></Headerbar>
    <div class="layout-content">
      <Row>
        <Asidebar></Asidebar>
        <i-col span="19">
          <div class="layout-content-main"><router-view></router-view></div>
        </i-col>
      </Row>
    </div>
    <Footerbar></Footerbar>
    
  </div>
  <template v-else>
  <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <Form-item prop="name">
            <Input type="text" v-model="formInline.name" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </Form-item>
        <Form-item prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
        </Form-item>
    </Form>
</template>
    </div>
</template>
<script>
    import Headerbar from './components/layout/Headerbar.vue'
    import Footerbar from './components/layout/Footerbar.vue'
    import Asidebar from './components/layout/Asidebar.vue'
    import {mapGetters, mapActions} from "vuex"
    var CryptoJS = require("crypto-js");
    export default {
        data () {
            return {
                formInline: {
                    name: '',
                    password: ''
                },
                ruleInline: {
                    name: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        components: {
          Headerbar,
          Footerbar,
          Asidebar
        },
        methods: {
            ...mapActions(['checklogin']),
             handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var _this = this;
                        this.formInline.password = CryptoJS.MD5(this.formInline.password, { asBytes: true }).toString();
                        this.$http.post('http://localhost:3000/users/login', this.formInline).then(res=>{
                            console.log(this.formInline.password)
                            console.log(res)
                            if(res.data){
                                _this.checklogin(true)
                                _this.$Message.success('提交成功!');
                            }else{
                                _this.$Message.success('账号或者密码错误!');
                            }
                        })
                        
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }

        },
        computed: {
            ...mapGetters(['login'])
        }
    }
</script>
