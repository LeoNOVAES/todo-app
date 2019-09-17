import Vue from "vue";
import Router from "vue-router";

const Index = () => import("@/Index");
const Home = () => import("@/Home");
const MyEvents = () => import("@/MyEvents");
const InvitationEvents = () => import("@/InvitationEvents");

Vue.use(Router);
let token = localStorage.getItem("token");

let router = new Router({
    routes:[       
        {
            path:"/",
            name:"Index",
            component: token ? Home : Index 
        },
        {
            path: "/home",
            name: "Index",
             beforeEnter:(to,from,next)=>{
                if(token) next(true)
                else next('/')
            },
            component:Home           
        },
        {
            path: "/meuseventos",
            name: "MeusEventos",
             beforeEnter:(to,from,next)=>{
                if(token) next(true)
                else next('/')
            },
            component:MyEvents           
        },
        {
            path: "/eventos",
            name: "Convites",
             beforeEnter:(to,from,next)=>{
                if(token) next(true)
                else next('/')
            },
            component:InvitationEvents           
        },
    ]
});

export default router;