
<style scoped>


</style>
<template>
  <div>
    
    <button @click="modalShow = !modalShow" class="btn btn-warning"  style="color:#ffffff; margin-left:10px">Editar</button>
    
    <b-modal title="Edite o Evento" v-model="modalShow" class="modal fade" hide-footer>
      <div>
         
      </div>
    </b-modal> 
  </div>
</template>

<script>
import api from "@/services/api";

  export default {
    props:{
      idEvent:''
    },
    data(){
        return{
          modalShow:false
        }
    }
  }
</script>

  