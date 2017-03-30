import User from '../views/user/User.vue'
import Home from '../views/Home.vue'
import Comment from '../views/blog/Comment.vue'
import Upload from '../views/upload/Upload.vue'

export const routes = [
    {path:'/', component:Home},
    {path:'/user', component: User},
    {path:'/comment', component: Comment},
    {path:'/upload', component: Upload}
]