<style scoped>
    .invitationEvents{
        padding-top:5%
    }

    .invitationEventsCard{
        padding-bottom:1%;
    }

    .footerCard{
        padding:10px
    }

    .footerCard button{
        margin-right:10px
    }
    
    .headerCard{
        display: flex;
        flex-direction: row;
        justify-content: space-between
        
    }

     .footerCard{
        display:flex;
        flex-direction: row;
        margin:15px
    }

    .footerCard button{
        margin-left:10px;
    }
</style>
<template>
    <div>  
    <Header/>
    <div class="container invitationEvents">
        <h4 style="padding-bottom:3%" >Eventos confirmados</h4>
           <div v-if="events.length == 0" class="empty">
                <p>Ainda nao existem convites :(</p>
            </div>  
          <div class="row">
              <div class="col-sm-4 invitationEventsCard" v-for="(event,key) in events" :key="key">
                    <div class="card">
                        <div class="card-header headerCard">
                            <p style="font-weight:bolder; font-size:150%;  width: 10em; word-wrap: break-word;">{{ event.name }}</p>
                            <p v-if="state(event.end, event.start)" class="bg-success text-light" style="padding:5px; border-radius:7px">Aberto</p>
                            <p v-else class="bg-danger text-light" style="padding:5px; border-radius:7px">Fechado</p>
                        </div>
                        <div class="card-body">
                            <p> <b>Endereço</b>: {{ event.local }} </p>
                            <p> <b>Limite</b>: {{ event.limit }} </p>
                            <p> <b>Inicio</b>: {{ formatDate(event.start) }} </p>
                            <p> <b>Final</b>: {{ formatDate(event.end) }} </p>
                            <p> <b>Convite</b>: {{ `http://localhost:3000/guests/${event._id}` }} </p>
                        </div>
                        <div class="footerCard">
                            <InfoEvent :idEvent="event._id"/>
                            <button @click="recuseInvite(event._id)" class="btn btn-danger">Desconfirmar</button>
                        </div>
                    </div>
              </div>
          </div>
    </div>
    </div>
</template>

<script>
import Header from "@/components/Header";
import api from "@/services/api";
import moment from "moment";
import InfoEvent from "@/components/InfoEvents";

export default{
    components:{
        Header,
        InfoEvent
    },
    data(){
        return{
            event:this.$route.params.event,
            events:[]
        }
    },
    mounted(){
        this.acceptLogged();
        this.getEvents();
    },
    methods:{
        async getEvents(){
            const response = await api.get("/events/guest",{
                headers:{
                    Authorization:localStorage.getItem("token_event"),
                    user:localStorage.getItem("id")
                }
            });

            this.$data.events = response.data.event;
            console.log(this.$data.events);
        },
        async acceptLogged(){
            if(localStorage.getItem("token_event") && this.$data.event){
                const req = await fetch("http://localhost:3000/api/accept",{
                    method:'GET',
                    headers:{
                            Authorization:localStorage.getItem("token_event"),
                            events:this.$data.event,
                            guest:localStorage.getItem("id")
                        }
                });

                const response = await req.json();
                if(response.state != "aceito"){
                    this.$swal({
                            title:"Atenção",
                            text:response.message,
                            type: 'warning',
                            confirmButtonColor: '#DF4723'
                        });
                }else{
                    const date = moment.utc(response.message);

                    this.$swal({
                            title:"Parabéns",
                            text:`esse evento Começará dia ${date.format('DD/MM/YYYY HH:mm:ss')}`,
                            type: 'success',
                            confirmButtonColor: '#DF4723'
                        }).then(()=>{
                            window.location.reload(true);
                        });
                }
            }
        },
        state(end, start){
            const today = moment();
            if(moment(end) >= today){
                return 1;
            }else{
                return 0;
            }
        },
        formatDate(e){
           const date = moment.utc(e);
           return date.format('DD/MM/YYYY HH:mm:ss');
        },
        async recuseInvite(id){
            const response = await api.get("/cancel/invite",{
                headers:{
                    Authorization:localStorage.getItem("token_event"),
                    guest:localStorage.getItem("id"),
                    events:id
                }
            });

            console.log(response)
            this.$data.events = this.$data.events.filter((e)=>{
                return e._id != id;
            }); 
        }
    }
}


</script>
  