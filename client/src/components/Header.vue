
<template>
  <div>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#/home"><img src="../../public/assets/logo.png" width="30%"  /></b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="#/meuseventos">Criar Evento</b-nav-item>
                <b-nav-item href="#/eventos">Meus Eventos</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                    <em>{{name}}</em>
                </template>
                <b-dropdown-item href="#">Perfil</b-dropdown-item>
                <b-dropdown-item @click="handlerLogoff">Logoff</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
  </div>

</template>

<script>
export default{
    data(){
        return{
            name:localStorage.getItem("nome")
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