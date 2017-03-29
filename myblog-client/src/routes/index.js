import User from '../views/user/User.vue'
import Home from '../views/Home.vue'

export const routes = [
    {path:'/', component:Home},
    {path:'/user', component: User}
]