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
        <Upload action="http://localhost:3000/upload/filedata" type='drag' name='avatar'>
            <Button type="ghost" icon="ios-cloud-upload style='color:#3399ff'">上传文件</Button>
        </Upload>
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
            }
        },
        created(){
            console.log('created');
            this.$http.post('http://localhost:3000/upload/list').then(res=>{
                console.log(res)
                    this.list = res.data.docs;
                })
        }
    }
</script>