<style scoped>
    .body{
        position:absolute;
        background-color: #e9e9e9;
        width:100%;
        height:100%
    }

    .dash{
        padding-top:10%;
    }

    .myEvent{
        padding:30px;
        background-color:#DF4723;
        height:130%;
        border-radius:20px
    }

    .myEvent p{
        font-size: 20pt
    }

    
</style>
<template>
  <div class="body">
      <Header/>
      <div class="container">
          
          <div class="row dash">
                <div class="col-6">
                   <div class="card text-white bg-dark mb-3 myEvent" style="max-width: 40rem;">
                        <div class="card-body">
                            <h1 class="card-title">Crie seu Evento</h1>
                            <p class="card-text" style="padding-top:20%">Cadastre seu evento e chame seus amigo para se divertir!</p>
                        </div>
                        <div>
                            <a class="btn btn-light" href="#/meuseventos">ENTRAR</a>
                        </div>
                    </div> 
                </div>
                <div class="col-6">
                    <div class="card text-white  mb-3 myEvent" style="max-width: 40rem;">
                        <div class="card-body">
                            <h1 class="card-title">Eventos que participarei</h1>
                            <p class="card-text" style="padding-top:20%">Não perca o eventos confirmados, confira a data e local.</p>
                        </div>
                        <div>
                            <a class="btn btn-light" href="#/eventos">ENTRAR</a>
                        </div>
                    </div> 
                </div>
          </div>
      </div>  
  </div>
  
</template>

<script>
import Header from "@/components/Header";

export default{
    components:{
        Header
    }
}

</script>
  