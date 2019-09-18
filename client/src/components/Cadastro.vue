<style scoped>
.cadastro-container{
    height: 100%;
    display:flex;
    justify-content: center;
    align-items: center
}

.cadastro-container form{
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: column
}

.cadastro-container form input{
    margin-top: 20px;
    height: 40px;
    padding:0 20px;
    font-size: 16px;
    color:#a0a0a0;
    background-color:#3F3F3F;
    border:1px solid #a0a0a0 !important;
    border-radius: 4px 

}

.cadastro-container form input::placeholder{
    color:#999
}


.cadastro-container form button{
    margin-top:10px;
    border: 0;
    border-radius: 4px;
    height: 48px;
    font-size: 16px;
    background-color: #DF4723;
    color:#ffffff;
    cursor: pointer;

}

.cadastro-container form p{
    padding-top:5px; 
    font-size:15pt; 
    color:#e9e9e9
}
#validation{
    background-color: #DF4723;
    padding:10px;
    border-radius: 7px;
    margin:10px;
    color:#ffffff
}
</style>

<template>
    <div class="cadastro-container" >
        <form>
            <img src="../../public/assets/logo.png" width="100px" alt="events"/>
            <div id="validation" v-if="validation">
                Todos os campos devem estar preenchidos
            </div>
            <input type="text" v-model="form.email" placeholder="E-mail" />
            <input type="text" v-model="form.name" placeholder="Nome" />
            <input type="password" v-model="form.password" placeholder="Senha" />
            <input type="number" v-model="form.phone" placeholder="Telefone" />
            <button @click="handlerRegister">Cadastrar</button>
            <p @click="handlerComponent" style="cursor:pointer" >VOLTAR</p>
        </form>
    </div>
</template>

<script>
import api from "@/services/api";

export default{
   components:{
       api
   }, 
   props:{
       handlerComponent:''
   },
    data(){
       return{
           validation:0,
           form:{
               email:"",
               password:"",
               phone:"",
               name:""
           }
       } 
   },
   methods:{
       async handlerRegister(e){
           try{
                e.preventDefault();
                if(!this.$data.form.password || !this.$data.form.email || !this.$data.form.phone || !this.$data.form.name){
                    return this.$data.validation = 1;
                } 
                const response = await api.post("/user", this.$data.form);   
                
                this.$swal({
                    title:response.data.message,
                    text:"Aguarde...",
                    type: 'success'
                }).then(()=>{
                    this.handlerLogin();
                });
                
            }catch(e){
               console.log(e)
               this.$swal({
                    title:"usuário já existe!",
                    type: 'warning',
                    confirmButtonColor: '#DF4723'
                });
           }
       },

       async handlerLogin(e){
            e.preventDefault();
             const data = {
                email:this.$data.form.email,
                password:this.$data.form.password
            }
    
            const response = await api.post("/auth", data);
            localStorage.setItem("token_event", response.data.token)
            localStorage.setItem("id", response.data.user._id);
            localStorage.setItem("nome", response.data.user.name);
            window.location.reload(true);
       }
   }
    
}
</script>

