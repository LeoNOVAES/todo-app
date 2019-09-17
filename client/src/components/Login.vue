<style scoped>
.login-container{
    height: 100%;
    display:flex;
    justify-content: center;
    align-items: center
}

.login-container form{
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: column
}

.login-container form input{
    margin-top: 20px;
    height: 40px;
    padding:0 20px;
    font-size: 16px;
    color:#a0a0a0;
    background-color:#3F3F3F;
    border:1px solid #a0a0a0 !important;
    border-radius: 4px 
}

.login-container form input::placeholder{
    color:#999
}


.login-container form button{
    margin-top:10px;
    border: 0;
    border-radius: 4px;
    height: 48px;
    font-size: 16px;
    background-color: #DF4723;
    color:#ffffff;
    cursor: pointer;

}

.login-container form p{
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
    <div class="login-container" >
        <form>
            <img src="../../public/assets/logo.png" width="100px" alt="events"/>
            <div id="validation" v-if="validation">
                Todos os campos devem estar preenchidos
            </div>
            <input type="text" v-model="form.email" placeholder="E-mail" />
            <input type="password" v-model="form.password" placeholder="Senha" />
            <button @click="handlerLogin">Entrar</button>
            <p>Não tem conta? <a @click="handlerComponent()" style="color:#DF4723; cursor:pointer">Registre-se</a></p>
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
       handlerComponent:""
   },
   data(){
       return{
           validation:0,
           form:{}
       }    
   },
   methods:{
       async handlerLogin(){
            
           if(!this.$data.form.password || !this.$data.form.email) return this.$data.validation = 1;
            
            try{
                const response = await api.post("/auth",this.$data.form);
        
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("id", response.data.user._id);
                localStorage.setItem("nome", response.data.user.name);
                window.location.reload(true);

            }catch(e){
                console.log(e);
                this.$swal({
                    title:"Senha ou Email incorretos!",
                    type: 'warning',
                    confirmButtonColor: '#DF4723'
                });
            }    
       }
   }
    
}
</script>

