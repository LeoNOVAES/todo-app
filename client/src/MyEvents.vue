<style scoped>
    .myEvents{
        padding-top:5%
    }

    .myEventsCard{
        margin-bottom:3%
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

      <div class="container myEvents">  
            <div v-if="activeForm">
                <button class="btn btn-light" @click="activeForm = 0" style="margin-left:-10px">X</button>
                <Form />
            </div>    
            <button v-else class="btn" @click="activeForm = 1" style="margin-bottom:10%; background-color:#a9a9a9; color:#ffffff">Deseja Cadastrar algum evento ?</button>
            <h4 style="padding-bottom:3%" >Meus Eventos</h4>
            <div v-if="events.length == 0" class="empty">
                <p>Ainda nao existem eventos cadastrados :(</p>
            </div>
            <div v-else class="row" >
                <div class="col-sm-4 myEventsCard" v-for="(event, key) in events" :key="key">
                    <div class="card text-white bg-dark">
                        <div class="card-header headerCard">
                            <p style="font-weight:bolder; font-size:150%">{{ event.name }}</p>
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
                            <EditEvent :idEvent="event._id"/>
                            <button  class="btn btn-danger">Excluir</button>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    </div>  
</template>

<script>
import Header from "@/components/Header";
import Form from "@/components/FormEvents";
import InfoEvent from "@/components/InfoEvents";
import EditEvent from "@/components/EditEvents";
import moment from "moment";
import api from "@/services/api";

export default{
    components:{
        Header,
        Form,
        api,
        InfoEvent,
        EditEvent
    },
    data(){
        return{
            activeForm:0,
               events:[]
        }
        
    },
    mounted(){
        this.getMyEvents();
    },
    methods:{
        async getMyEvents(){
            
            const response = await api.get("/events/organizer",{
                headers:{
                    Authorization:localStorage.getItem("token_event"),
                    id:localStorage.getItem("id")
                }
            });

            this.$data.events = response.data.events;
        },

        formatDate(e){
           const date = moment.utc(e);
           return date.format('DD/MM/YYYY HH:mm:ss');
        },

        state(end, start){
            const today = moment();
            if(moment(end) >= today){
                return 1;
            }else{
                return 0;
            }
        },

        async deleteEvent(id){
            await api.delete('/event',{
                headers:{
                    Authorization:localStorage.getItem("token_event"),
                    id:id,
                    user:localStorage.getItem("id")
                }
            });

            this.$data.events = this.$data.events.filter((e)=>{
                return e._id != id;
            });
        }
    }
}


</script>
  