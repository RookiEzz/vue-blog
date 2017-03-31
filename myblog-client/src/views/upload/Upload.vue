<template>
    <div class="container">
      <h2>Upload file</h2>
      <vue-base64-file-upload 
        class="v1"
        accept="image/png,image/jpeg"
        image-class="v1-image"
        input-class="v1-input"
        :max-size="customImageMaxSize"
        @size-exceeded="onSizeExceeded"
        @file="onFile"
        @load="onLoad" />
        <button @click='uploadImage' type="primary">图片上传</button>
        <template v-for='pic in list'>
            <img :src="pic.data" alt="">
        </template>
        <Upload ref='upload' multiple action="http://localhost:3000/upload/filedata" type='drag' name='avatar' :format="['jpg','jpeg','png']" :on-format-error="handleFormatError">
            <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击或将文件拖拽到这里上传</p>
            </div>
        </Upload>
        <Tree :data="baseData" show-checkbox @on-select-change='getClickNode' @on-check-change='getCheckNodes'></Tree>
        <Button type="primary">获取树桩</Button>
    </div>
</template>
<script>
    import VueBase64FileUpload from 'vue-base64-file-upload';
    export default{
        components:{
            VueBase64FileUpload
        },
        data(){
            return{
                
                baseData: [{
                    expand: true,
                    title: 'parent 1',
                    children: [{
                        title: 'parent 1-0',
                        expand: true,
                        disabled: true,
                        children: [{
                            title: 'leaf',
                            disableCheckbox: true
                        }, {
                            title: 'leaf',
                        }]
                    }, {
                        title: 'parent 1-1',
                        expand: true,
                        checked: true,
                        children: [{
                            title: '<span style="color: red">leaf</span>',
                        }]
                    }]
                }],
                file:{
                    lastModified:'',
                    name:'',
                    size:0,
                    type:'',
                    data:''
                    
                },
                list:[],
                customImageMaxSize: 3
            }
        },
        methods: {
            onFile(file) {
                this.file = file;
                console.log(this.file)
            },

            onLoad(dataUri) {
                this.file = Object.assign(this.file, {"data":dataUri});
                console.log(this.file)
            },

            onSizeExceeded(size) {
                alert(`Image ${size}Mb size exceeds limits of ${this.customImageMaxSize}Mb!`);
            },
            uploadImage(){
                var _this = this;
                console.log(typeof _this.file)
                
                console.log(_this.file)
                this.$http.post('http://localhost:3000/upload/data', {name:_this.file.name, data: _this.file.data}).then(res=>{
                    console.log(res);
                })
            },
            handleFormatError (file) {
                console.log('wenjian geshi ')
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            getTree (){
                var _this = this;
                this.$http.post('http://localhost:3000/cate').then(res=>{
                    _this.baseData = res.data;
                    console.log(res)
                })
            },
             getClickNode (node){
                console.log(node)
            },
            getCheckNodes (nodes){
                console.log(nodes)
            }
        },
        created(){
            this.getTree();
            console.log('created');
            this.$http.post('http://localhost:3000/upload/list').then(res=>{
                console.log(res)
                    this.list = res.data.docs;
                })
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
        }
    }
</script>