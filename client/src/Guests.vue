<template>
    <div class="body">
    <Header/>
    <div class="container-fluid banner">
        <div class="row content">
                <div class="col-md-3 itemText">
                    <h2>Voce foi convidado para Participar de um evento. Para confirmar sua participacao cadastre-se ou faca Login!</h2>
                </div>
                <div class="col-md-2 itemForm"> 
                    
                </div> 
                <div class="col-md-3 item" style=""> 
                    <div class="login-container" >
                        <h3>Login</h3>
                        <form>
                            <div id="validationLog" v-if="validationLog">
                                Todos os campos devem estar preenchidos
                            </div>
                            <input type="text" v-model="formLog.email" placeholder="E-mail" />
                            <input type="password" v-model="formLog.password" placeholder="Senha" />
                            <button @click="handlerLogin">Entrar</button>
                        </form>
                    </div>
                </div>
                <div class="col-md-3 item"> 
                    <div class="cadastro-container" >
                        <h3>Cadastro</h3>
                        <form>
                            <div id="validationReg" v-if="validationReg">
                                Todos os campos devem estar preenchidos
                            </div>
                            <input type="text" v-model="formReg.email" placeholder="E-mail" />
                            <input type="text" v-model="formReg.name" placeholder="Nome" />
                            <input type="password" v-model="formReg.password" placeholder="Senha" />
                            <input type="number" v-model="formReg.phone" placeholder="Telefone" />
                            <button @click="handlerRegister">Cadastrar</button>
                        </form>
                    </div>
                </div>
            </div>
    </div>
    </div>
</template>

<script>
import Header from "@/components/Header";
import Form from "@/components/Cadastro";
import api from "@/services/api";
import moment from "moment";

export default{
    components:{
        Header,
        Form, 
        api
    },
    data(){
        return{
            event:this.$route.params.event,
            validationLog:0,
            validationReg:0,
            formReg:{
                email:"",
                password:"",
                phone:"",
                name:""
            },
            formLog:{
                email:"",
                password:""
            }
        }
    },
    methods:{
         async handlerRegister(e){
           try{
                e.preventDefault();
                if(!this.$data.formReg.password || !this.$data.formReg.email || !this.$data.formReg.phone || !this.$data.formReg.name){
                    return this.$data.validationReg = 1;
                } 
                const response = await api.post("/user", this.$data.formReg);   
                
                this.$swal({
                    title:response.data.message,
                    text:"Aguarde...",
                    type: 'success'
                }).then(async()=>{
                    const data = {
                        email:this.$data.formReg.email,
                        password:this.$data.formReg.password
                    }
                
                    const response = await api.post("/auth", data);
                    localStorage.setItem("token_event", response.data.token)
                    localStorage.setItem("id", response.data.user._id);
                    localStorage.setItem("nome", response.data.user.name);
                    this.acceptInvite(response.data.user._id, response.data.token);
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

       async handlerLogin(e,path){
           e.preventDefault();
           if(!this.$data.formLog.password || !this.$data.formLog.email) return this.$data.validationLog = 1;
            try{
                const response = await api.post("/auth",this.$data.formLog);
        
                localStorage.setItem("token_event",response.data.token)
                localStorage.setItem("id", response.data.user._id);
                localStorage.setItem("nome", response.data.user.name);
                this.acceptInvite(response.data.user._id, response.data.token);

            }catch(e){
                console.log(e);
                this.$swal({
                    title:"Senha ou Email incorretos!",
                    type: 'warning',
                    confirmButtonColor: '#DF4723'
                });
            }    
       },

      async acceptInvite(user,token){
          
          const req = await fetch("http://localhost:3000/api/accept",{
              method:'GET',
              headers:{
                    Authorization:token,
                    events:this.$data.event,
                    guest:user
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
    }
}

</script>

<style>
    .body{
        position:absolute;
        background-color: #d3d3d3;
        width:100%;
        height:100%;
    }
    .content{
        margin-left: 15%;
    }
    .banner{
        background-color: #666666;
        height: auto;
    }
    .item{
        padding-top: 10%;
        padding-bottom: 10%;
        
    }
    .item h2,p{
        font-weight: bolder
    }
    .item a{
        padding-left: 30px;
        padding-right: 30px;
        padding-top:10px;
        padding-bottom:10px
    }
    .itemText{
        padding-top:5%;
        color:#d3d3d3
    }
    .item h3{
        color:#d3d3d3
    }
   

.cadastro-container form{
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    
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
</style>
  