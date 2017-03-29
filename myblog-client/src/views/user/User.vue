
<template>
    <div>
    <div class=btns>
        <Button type="info" @click='add'>添加用户</Button>
        <Button type="success">删除用户</Button>
        <Input icon="search" placeholder="请输入..." style="width: 200px" v-model='filter.name'></Input>
        <Button type="ghost" @click='search' >搜索数据</Button>
    </div>
    <Modal
        v-model="modal1"
        title="普通的Modal对话框标题"
        >
        <div slot='footer' style='font-size:14px; color:#e2702b'>
            Tips: 本模块是用户添加及修改模块
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="姓名" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
        </Form-item>
        <Form-item label="密码" prop="password">
              <Input v-model="formValidate.password" placeholder="请输入密码"></Input>
          </Form-item>
        <Form-item label="邮箱" prop="mail">
            <Input v-model="formValidate.mail" placeholder="请输入邮箱"></Input>
        </Form-item>
        <Form-item label="城市" prop="city">
            <Select v-model="formValidate.city" placeholder="请选择所在地">
                <Option value="beijing">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
            </Select>
        </Form-item>
        <Form-item label="选择日期">
            <Row>
                <Col span="11">
                    <Form-item prop="date">
                        <Date-picker type="date" placeholder="选择日期" v-model="formValidate.date"></Date-picker>
                    </Form-item>
                </Col>
                
            </Row>
        </Form-item>
        <Form-item label="性别" prop="gender">
            <Radio-group v-model="formValidate.gender">
                <Radio label="male">男</Radio>
                <Radio label="female">女</Radio>
            </Radio-group>
        </Form-item>
        <Form-item label="爱好" prop="interest">
            <Checkbox-group v-model="formValidate.interest">
                <Checkbox label="吃饭"></Checkbox>
                <Checkbox label="睡觉"></Checkbox>
                <Checkbox label="跑步"></Checkbox>
                <Checkbox label="看电影"></Checkbox>
            </Checkbox-group>
        </Form-item>
        <Form-item label="介绍" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </Form-item>
    </Form>
    </Modal>
    <Table border :context="self" :columns="columns" :data="list"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="filter.total" :current="filter.page" :page-size="5" @on-change="changePage"></Page>
        </div>
    </div>
    </div>
</template>
<script>
    import CryptoJS from "crypto-js"
    export default {
        data () {
            return {
                list:[],
                modal1: false,
                filter: {
                    total: 0,
                    page: 1,
                    limit: 5,
                    name: ''
                },
                formValidate: {
                    _id: null,
                    name: '22',
                    password: '1',
                    mail: '22@qq.com',
                    city: 'shanghai',
                    gender: 'male',
                    interest: ['吃饭', '睡觉'],
                    date: '',
                    desc: '22222222222222222222222222222222222222222222222222222222222222222222'
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                        { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                    ]
                },
                self: this,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                   
                    {
                        title: '姓名',
                        key: 'name',
                        render (row, column, index) {
                            return `<Icon type="person"></Icon> <strong>${row.name}</strong>`;
                        }
                    },
                    {
                        title: '邮箱',
                        key: 'mail'
                    },
                    {
                        title: '城市',
                        key: 'city'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="show(${index})">查看</i-button> <i-button type="error" size="small" @click="remove(${index})">删除</i-button> <i-button type="error" size="small" @click="update(${index})">更新</i-button>`;
                        }
                    }
                ]
                
            }
        },
        methods: {
            show (index) {
                console.log(index)
                this.$Modal.info({
                    title: '用户信息',
                    content: `姓名：${this.list[index].name}<br>邮箱：${this.list[index].mail}<br>城市：${this.list[index].city}`
                })
            },
            
            remove (index) {
                var _this = this;
                console.log(index)
                console.log(_this.list[index])
                _this.$http.post('http://localhost:3000/users/delete', _this.list[index]).then(res=>{
                    console.log(res.data)
                })
                this.list.splice(index, 1);
            },
            add (){
                var _this = this;
                this.modal1 = true;
                
                
            },
            update (index) {
                var _this = this;
                this.modal1=true;
                var dataObj  = Object.assign({},_this.list[index]);
                _this.formValidate = dataObj;
                console.log(this.formValidate)
                
            },
            changePage(page){
                var _this = this;
                this.filter.page = page;
                this.getdata();
            },
            getdata(){
                var _this = this;
                _this.$http.post('http://localhost:3000/users/list', _this.filter).then(res=>{
                    console.log(res)
                    _this.list = res.data.docs;
                  _this.filter.total = res.data.total;
                    
                })
            },
            search(){
                this.getdata();
            },
             handleSubmit (name) {
                 console.log(this.formValidate)
                 var _this = this;
                 var submitUrl, submitMethod;
                 if(this.formValidate._id){
                     console.log('update')
                     submitUrl = 'http://localhost:3000/users/data/'+this.formValidate._id;
                     submitMethod = 'PUT'
                 }else{
                     submitUrl = 'http://localhost:3000/users/data';
                     submitMethod = 'POST'
                 }
                _this.$refs[name].validate((valid) => {
                    if (valid) {
                        _this.formValidate.password = CryptoJS.MD5(_this.formValidate.password, { asBytes: true }).toString();
                        _this.$http({
                            method: submitMethod,
                            url: submitUrl,
                            data: _this.formValidate
                        }).then(res=>{
                             _this.$Message.success('提交成功!');
                             _this.getdata();
                             _this.modal1=false;
                             Object.assign(_this.$data.formValidate, _this.$options.data().formValidate);
                             
                        })
                        
                        
                    } else {
                        _this.$Message.error('表单验证失败!');
                        
                    }
                    
                    
                })
                
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },
        created (){
                console.log('created')
                this.getdata()
            }
    }
</script>
<style lang='scss'>
    .btns{
        padding: 10px;
    }
</style>