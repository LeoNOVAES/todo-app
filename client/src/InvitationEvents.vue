<style scoped>
    .invitationEvents{
        padding-top:5%
    }

    .invitationEventsCard{
        padding-bottom:1%;
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
              <div class="col-4 invitationEventsCard" v-for="(event,key) in events" :key="key">
                  <b-card bg-variant="light" :header="event.name" text-variant="dark" class="text">
                      <p> endereco - {{ event.local }} </p>
                  </b-card>
                  <button @click="recuseInvite(event._id)" class="btn btn-primary">Desconfirmar</button>
              </div>
          </div>
    </div>
    </div>
</template>

<script>
import Header from "@/components/Header";
import api from "@/services/api";
import moment from "moment";

export default{
    components:{
        Header
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
  