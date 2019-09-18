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
                <div class="col-4 myEventsCard" v-for="(event, key) in events.event" :key="key">
                    <b-card      bg-variant="dark"  text-variant="white" class="text">
                        <div class="headerCard">
                            <p>nome: {{ event.name }}</p>
                            <p v-if="state(event.end, event.start)" class="bg-success" style="padding:5px; border-radius:7px">Aberto</p>
                            <p v-else class="bg-danger" style="padding:5px; border-radius:7px">Fechado</p>  
                        </div>
                        <b-card-text>Endereco: {{ event.local }}</b-card-text>
                        <b-card-text v-if="state(event.end, event.start)">Convidar: http://localhost:8080/#/guests/?e={{ event._id }}</b-card-text>
                        <b-card-text v-else>Convidar: ############################################</b-card-text>
                        <b-card-text>Inicio: {{ formatDate(event.start) }}</b-card-text>
                        <b-card-text>Fim: {{ formatDate(event.end) }}</b-card-text>
                        <b-card-text>Limite de convidados: {{ event.limit }}</b-card-text>
                        <b-card-text>Lista de convidados:</b-card-text>
                        <b-card-text v-for="(guest,key) in events.guests" :key="key">{{ key+1 }} -> {{ guest.data.users[0].name}}</b-card-text>
                        <b-button class="btn btn-warning" style="color:#ffffff; margin-right:10px">Editar</b-button>
                        <b-button @click="deleteEvent(event._id)" style="background-color:#DF4723;">Excluir</b-button>
                    </b-card>
                </div>
            </div>
      </div>
    </div>  
</template>

<script>
import Header from "@/components/Header";
import Form from "@/components/FormEvents";
import moment from "moment";
import api from "@/services/api";

export default{
    components:{
        Header,
        Form,
        api
    },
    data(){
        return{
            activeForm:0,
               events:{
                   event:[],
                   guests:[]
               }
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
        
            this.$data.events.event = response.data.events;
        },

        async getGuests(id){
            const response = await api.get("/guests",{
                headers:{
                    Authorization:localStorage.getItem("token_event"),
                    id:id
                }
            });
            return response.data.users;

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
  