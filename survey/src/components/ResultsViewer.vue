<script>
export default {
  //fetch('http://localhost:3001/results')
  //.then(res=>res.json()).then(json=>{.....}) 

  props: ['options'],

  data() {
    return {
      stillOpen: true,
      numParticipants: 0,
      responses: [],
      color: '',
    }

  },

  mounted() {

    fetch('http://localhost:3001/results')
    .then(res=>res.json())
    .then(json=>{
      this.numParticipants = json.participants
      this.responses = json.responses
      this.stillOpen = false
      if(this.numParticipants < 3){
        this.color = 'yellow'
      }
      else {
        this.color = 'lime'
      }
    }) 

  },

  computed: {
    bgColor() {
      return `background-color: ${this.color}`
    }
  }


}
</script>

<template>
  <div>
    Survey Results:
    <!-- show it just when there are no results-->
    <span v-if="stillOpen">Still Opened</span>
    <!-- show it just when there are results-->
    <div v-if="!stillOpen">
      <div class="results" v-for="(item, index) in options"><span>{{item}}:</span><span>{{responses[index]}}</span></div>
      <br />
      <div class="participants" :style="bgColor"><span>Participants: </span><span>{{numParticipants}}</span></div>
    </div>
    
  </div>
</template>

<style scoped>
div.results {
  font-weight: bold;
  background-color:rgb(255, 204, 102);
}

div.participants {
  font-weight: bold;
} 
</style>