import Vue from "vue";
import Router from "vue-router";

const Index = () => import("@/Index");
const Home = () => import("@/Home");
const MyEvents = () => import("@/MyEvents");
const InvitationEvents = () => import("@/InvitationEvents");
const Guests = () => import("@/Guests");

Vue.use(Router);
let token = localStorage.getItem("token_event");

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
        {
            path: "/guests/:event",
            name: "Guests",
            component: token ? InvitationEvents : Guests
        }
    ]
});

export default router;