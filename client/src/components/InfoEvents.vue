
<style scoped>


</style>
<template>
  <div>
    
    <button @click="modalShow = !modalShow" class="btn btn-primary"  style="color:#ffffff">Ver Convidados</button>
    
    <b-modal title="Lista de convidados" v-model="modalShow" class="modal fade" centered   hide-footer>
      <div v-if="guests.length == 0" >Ainda não existem convidados :(</div>
      <div v-for="(guest,key) in guests" :key="key">
         <p>{{ key+1 }} - {{ guest.name }}</p>
      </div>
    </b-modal> 
  </div>
</template>

<script>
import api from "@/services/api";

  export default {
    props:{
        idEvent:""
    },  
    data() {
      return {
        modalShow: false,
        guests:[],
        
      }
    },
    mounted(){
      this.getGuests();
    },
    methods:{
        async getGuests(){
           
            const response = await api.get("/guests",{
                headers:{
                    Authorization:localStorage.getItem("token_event"),
                    id:this.$props.idEvent
                }
            });
          
            this.$data.guests = response.data.users;
           
        }
    }
  }
</script>

  