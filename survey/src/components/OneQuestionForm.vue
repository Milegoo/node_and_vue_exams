<script>
export default {
 //fetch(`http://localhost:3001/vote/0`,{method: 'POST'})

  props: ['question', 'options'],

  data() {
    return{
      vote: undefined,
      optionIsSelected: false,
    }
  },

  methods: {
    callVote() {

      fetch(`http://localhost:3001/vote/${this.vote}`,{method: 'POST'})

    }
  }

}
</script>

<template>
  <div class="question">
    <span class="question">Here goes the question</span>
    <span v-for="(element, index) in options"><input @click="optionIsSelected = true" type="radio" v-model="vote" :value=index><label>{{element}}</label></span>
    <button @click="callVote" :disabled="!optionIsSelected">Send</button>
  </div>
</template>

<style scoped>
div.question {
  background-color: rgb(255, 153, 102);
}
</style>