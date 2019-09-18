
<template>
  <div>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#/home"><img src="../../public/assets/logo.png" width="30%"  /></b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item v-if="id" href="#/meuseventos">Criar Evento</b-nav-item>
                <b-nav-item v-if="id" href="#/eventos">Eventos</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto" v-if="id">
                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template v-if="id" v-slot:button-content>
                    <em>{{name}}</em>
                </template>
               <EditProfile />
                <b-dropdown-item  @click="handlerLogoff">Sair</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
  </div>

</template>

<script>
import EditProfile from "@/components/EditProfile";
export default{
    components:{
        EditProfile
    },
    data(){
        return{
            name:localStorage.getItem("nome"),
            id:localStorage.getItem("token_event")
        }
    },
    methods:{
        handlerLogoff(){
            localStorage.clear();
            window.location.reload(true);
        }
    }
}
</script>
<style>
  
</style>