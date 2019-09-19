
<style scoped>
.cardFooter{
  display: flex;
  justify-content: flex-end
}

</style>
<template>
  <div>
    
     <b-dropdown-item  @click="modalShow = true">Editar</b-dropdown-item>
    
    <b-modal title="Perfil" v-model="modalShow" class="modal fade" hide-footer>
      <div>
        <form>
          <div class="form-group">
            <label>Nome</label>
            <input type="text" v-model="form.name" class="form-control"  placeholder="Nome">
          </div>
          <div class="form-group">
            <label>Telefone</label>
            <input type="number" v-model="form.phone" class="form-control" placeholder="Telefone">
          </div>
          <div class="form-group">
            <label >Senha</label>
            <input type="password" v-model="password" class="form-control" placeholder="Senha">
          </div>
          <div class="cardFooter">
            <button @click="handlerEdit" class="btn btn-success">Salvar</button>
          </div>
      </form>
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
          modalShow:false,
          form:[],
          password:""
        }
    },
    mounted(){
      this.getUser();
    },
    methods:{
      async getUser(){
        const response = await api.get("/user",{
          headers:{
            Authorization:localStorage.getItem("token_event"),
            id:localStorage.getItem("id")
          }
        });
        
        this.$data.form = response.data.user;
      },

      async handlerEdit(){

        if(this.$data.password.length > 0) this.$data.form.password = this.$data.password;

        const response = await api.put("/user",this.$data.form,{
          headers:{
            Authorization:localStorage.getItem("token_event"),
            id:localStorage.getItem("id")
          }
        });
        
        if(this.$data.form.name){
          localStorage.setItem("nome", this.$data.form.name);
        }
        this.$data.modalShow = false;
        window.location.reload(true);
      }
    }
  }
</script>

  
