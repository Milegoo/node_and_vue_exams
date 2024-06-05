<script>
export default{

    props: ['bikeId', 'slotId', 'modelValue'],
    emits: ['update:modelValue'],
    data () {
        return {
            state : '' //color
        }
    },

    computed: {
        bgColor() {
            return `background-color: ${this.state}`
        }
    },

    methods: {
        handleState() {
            if(this.state == '') {
                this.state = 'yellow'
                fetch(`http://localhost:3001/book?bikeId=${this.bikeId}&slotId=${this.slotId}`)
                  .then(res => res.text())
                  .then((txt) => {
                    if(txt == 'booked') {
                        this.state = 'green'
                        this.$emit('update:modelValue', true)
                    }
                    else {
                        this.state = 'red'
                    }
                  })
            }
        }
    },

    watch: {
        modelValue() {
            if(this.modelValue && this.state == '') {
                this.state = 'grey'
            }

        }
    }
  
}
</script>

<template>
    <span :style="bgColor" @click="handleState">{{ `Bike: ${bikeId} - Slot: ${slotId}` }}</span>
</template>

<style>
</style>