<style scoped>
  .body{
    width: 100%;
    position: absolute;
    height: 100%;
    background-color:#000000
  }
</style>

<template >
   <div class="body">
        <Login v-if="component" :handlerComponent="()=>handlerComponent()"/>
        <Cadastro v-else  :handlerComponent="()=>handlerComponent()"/>
   </div>

</template>

<script>
    import Login from "@/components/Login";
    import Cadastro from "@/components/Cadastro";

    export default{
      components:{
        Login,
        Cadastro
      },
      data(){
        return{
          component:true
        }
      },
      methods:{
        handlerComponent(){
          this.$data.component ? this.$data.component = false : this.$data.component = true; 
        }
      }
    
    }

</script>
