
<style scoped>
    .myEvents{
        padding-top:5%
    }

    .myEventsCard{
        margin-bottom:3%
    }

    .form{
        padding-bottom: 10%
    }
</style>
<template>
    <div class="form">
        <form>
            <div class="bg-danger text-light" v-if="validation" style="border-radius:10px">
                <p style="padding:10px">Preencha todos os campos!</p>
            </div>
            <div class="form-group">
                <label>Nome do Evento</label>
                <input type="text" v-model="form.name" class="form-control" placeholder="Nome do Evento">
            </div>
            <div class="form-group">
                <label>Endereço do evento</label>
                <input type="text" class="form-control" v-model="form.local"  placeholder="Endereço">
            </div>
             <div class="form-group">
                <label>Limite de Convidados</label>
                <input type="number" class="form-control" v-model="form.limit"  placeholder="Limite de Convidados">
            </div>
            <div class="form-group">
                <label>Data e Hora do Inicio</label>
                <small id="emailHelp" class="form-text text-muted">Insira as datas de forma correta se nao o evento nao sera cadastrado</small>
                <input type="date"  v-model="start.date" class="form-control datepicker"/>
                <input type="time" v-model="start.time" class="form-control datepicker"/>
            </div>
            <div class="form-group">
                <label>Data e Hora do Final</label>
                <input type="date" v-model="end.date" class="form-control datepicker"/>
                <input type="time" v-model="end.time" class="form-control datepicker"/>
            </div>
            <button @click="handlerEvent" class="btn btn-dark">Cadastrar Evento</button>
        </form>  
    </div>  
</template>

<script>
import api from "@/services/api";

export default{
    components:{
        api
    },
    data(){
        return{
            validation:0,
            form:{},
            start:{},
            end:{},
            link:""
        }
    },
    methods:{
        async handlerEvent(e){
            e.preventDefault();
            this.$data.form.start = `${this.$data.start.date} ${this.$data.start.time}`;
            this.$data.form.end = `${this.$data.end.date} ${this.$data.end.time}`;
            this.$data.form.organizer = localStorage.getItem("id");

            if(!this.$data.form.start || !this.$data.form.limit || !this.$data.form.end || !this.$data.form.name || !this.$data.form.local) return this.$data.validation = 1;
            const req = await fetch("http://localhost:3000/api/event",{
                method:'POST',
                body:JSON.stringify(this.$data.form),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization:localStorage.getItem("token_event")
                }
            });
            const response = await req.json();
            
            if(!response.event){
                this.$swal({
                    title:`Atenção`,
                    text:`${response.message} , confira os dados e tente novamente`,
                    type: 'warning',
                    confirmButtonColor: '#DF4723'
                }); 
                return;
            }

            this.$swal({
                title:`Parabéns`,
                text:`esse e o link para convidados http://localhost:8080/#/guests/?e=${response.event._id}`,
                type: 'success',
                confirmButtonColor: '#28a745'
            }).then(()=>{
                window.location.reload(true);
            }) 
        }
    }
}
</script>
  