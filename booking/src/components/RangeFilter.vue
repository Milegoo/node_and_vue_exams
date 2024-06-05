<script>

/*
Note: use this syntax to watch a nested field

   watch: {
    'object.field': function() { ...  },
*/
export default{

  props: ['thresholds', 'modelValue'],
  emits: ['update:modelValue.min', 'update:modelValue.max'],

  data() {
    return {
      thresholdsValues: [], //will be true for the positions that have the character ●
      greenCircleId: null,
      indexMax: null,
      indexMin: null,
    }
  },

  mounted() {
    this.updateValues() 
  },

  computed: {
    ballStyle() {
      return ``
    },
  },

  methods: {
    updateValues() {
      for (let i = 0; i < this.thresholds.length; i++) {
        if(this.thresholds[i] == (this.modelValue.min)) {
          this.thresholdsValues[i] = true
          this.indexMin = i
        }
        else if (this.thresholds[i] == (this.modelValue.max)) {
          this.thresholdsValues[i] = true
          this.indexMax = i
        }
        else { this.thresholdsValues[i] = false }
      }
    },

    blackClicked(index) {
      this.greenCircleId = index
    },

    greenClicked(index) {
      this.greenCircleId = null
    },

    lineClicked(index) {
      if(this.greenCircleId != null) {
        if(this.greenCircleId == this.indexMax ) {
          if(index >= this.indexMin) {
            this.thresholdsValues[this.greenCircleId] = false
            this.greenCircleId = null
            this.thresholdsValues[index] = true
            this.indexMax = index
            this.modelValue.max = this.thresholds[index]
          }
          else {
            this.thresholdsValues[this.greenCircleId] = false
            this.greenCircleId = null
            this.thresholdsValues[index] = true
            this.indexMax = this.indexMin
            this.indexMin = index
            this.modelValue.max = this.thresholds[this.indexMax]
            this.modelValue.min = this.thresholds[index]
          }
        }
        else if (this.greenCircleId == this.indexMin ) {
          if(index <= this.indexMax) {
            this.thresholdsValues[this.greenCircleId] = false
            this.greenCircleId = null
            this.thresholdsValues[index] = true
            this.indexMin = index
            this.modelValue.min = this.thresholds[index]
          }
          else {
            this.thresholdsValues[this.greenCircleId] = false
            this.greenCircleId = null
            this.thresholdsValues[index] = true
            this.indexMin = this.indexMax
            this.indexMax = index
            this.modelValue.max = this.thresholds[index]
            this.modelValue.min = this.thresholds[this.indexMin]
          }
        }
      }
    }

  },

  watch: {
    'modelValue.min': function(newValue) {
      if(newValue) {
        this.updateValues()
        this.$emit('update:modelValue.min', newValue)
      }



    },

    'modelValue.max': function(newValue) {
      if(newValue) {
        this.updateValues()
        this.$emit('update:modelValue.max', newValue)
      }
    }
  }

  
}

</script>

<template>  
<div class="range">
    <div v-for="(threshold, index) in thresholds">
      <div v-if="thresholdsValues[index] && index != greenCircleId" class="range-item" @click="blackClicked(index)" style='color: black'>●</div>
      <div v-if="thresholdsValues[index] && index == greenCircleId" class="range-item" @click="greenClicked(index)" style='color: green'>●</div>
      <div v-if="!thresholdsValues[index]" class="range-item" @click="lineClicked(index)">–</div>
      <span class="range-threshold">{{threshold}}</span>
    </div>
</div>
</template>

<style>
</style>