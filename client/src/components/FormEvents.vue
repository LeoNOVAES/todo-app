
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
            <div class="form-group">
                <label>Nome do Evento</label>
                <input type="text" class="form-control" placeholder="Nome do Evento">
            </div>
            <div class="form-group">
                <label>Endereço do evento</label>
                <input type="text" class="form-control"  placeholder="Endereço">
            </div>
            <div class="form-group">
                <label>Data do evento</label>
                <input type="date" class="form-control datepicker"/>
            </div>
            <div class="form-group">
                <label>Hora que começa o evento</label>
                <input type="time" class="form-control datepicker"/>
            </div>
            <button type="submit" class="btn btn-dark">Cadastrar Evento</button>
        </form>  
    </div>  
</template>

<script>

</script>
  