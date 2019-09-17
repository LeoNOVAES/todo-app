<style scoped>
    .invitationEvents{
        padding-top:5%
    }

    .invitationEventsCard{
        padding-bottom:1%;
    }
</style>
<template>
    <div>  
    <Header/>
    <div class="container invitationEvents">
        <h4 style="padding-bottom:3%" >Eventos que irei</h4>
          <div class="row">
              <div class="col-4 invitationEventsCard">
                  <b-card bg-variant="light" header="light" text-variant="dark" class="text">
                      <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
                  </b-card>
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
  