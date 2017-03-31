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
               
                self: this
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
                _this.$http.post(`http://localhost:3000/${this.module}/delete`, _this.list[index]).then(res=>{
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
                _this.$http.post(`http://localhost:3000/${this.module}/list`, _this.filter).then(res=>{
                    console.log(res)
                    _this.list = res.data.docs;
                  _this.filter.total = res.data.total;
                    
                })
            },
            search(){
                this.getdata();
            },
             handleSubmit (name) {
                 console.log(this.formValidate._id)
                 var _this = this;
                 var submitUrl, submitMethod;
                 if(this.formValidate._id){
                     console.log('update')
                     console.log(this.formValidate._id)
                     submitUrl = `http://localhost:3000/${this.module}/data/`+ this.formValidate._id;
                     submitMethod = 'PUT'
                     console.log(_this.formValidate)
                 }else{
                     submitUrl = `http://localhost:3000/${this.module}/data`;
                     submitMethod = 'POST'
                 }
                _this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.log('验证通过')
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
                             this.formValidate._id = null;
                             
                        }).catch(e=>{
                            console.log("error")
                            console.log(e)
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