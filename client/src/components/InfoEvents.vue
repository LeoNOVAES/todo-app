
<style scoped>


</style>
<template>
  <div>
    <b-button  @click="modalShow = !modalShow">Open Modal</b-button>
    <b-modal v-model="modalShow">
        <ul>
            <li >{{ guests[0] }}</li>
        </ul>    
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
   
    methods:{
        async getGuests(){
            
            const response = await api.get("/guests",{
                headers:{
                    Authorization:localStorage.getItem("token_event"),
                    id:this.$props.idEvent
                }
            });

            this.$data.getGuests = response.data.users;
            console.log( this.$data.getGuests )
        }
    }
  }
</script>

</script>
  