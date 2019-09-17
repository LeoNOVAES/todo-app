<style scoped>
    .myEvents{
        padding-top:5%
    }

    .myEventsCard{
        margin-bottom:3%
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
            <div class="row">
                <div class="col-4 myEventsCard">
                    <b-card bg-variant="dark" header="Dark" text-variant="white" class="text">
                        <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
                        <b-button style="background-color:#DF4723;">Editar</b-button>
                    </b-card>
                </div>
            </div>
      </div>
    </div>  
</template>

<script>
import Header from "@/components/Header";
import Form from "@/components/FormEvents";

export default{
    components:{
        Header,
        Form
    },
    data(){
        return{
            activeForm:0
        }
        
    }
}


</script>
  