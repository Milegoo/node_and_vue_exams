<script>
export default{

    props: ['src', 'modelValue'],

    data() {
        return {
            border: false,
            
        }
    },

    computed: {

        inputStyle() {
            if (this.modelValue) {
                return `border: 4px red solid;`
            }
            else {
                return ``
            }
        }


    },

    methods: {
        manageClick() {
            if(!this.modelValue) {
                this.$emit('update:modelValue', true)
            }
            else {
                this.$emit('update:modelValue', false)
            }
        }
    },

    /*

    watch : {
        modelValue: function(newValue) {
            if(newValue) {
                this.border = true
            }
            else {
                this.border = false
            }

        }
    }
  */
}
</script>

<template>

    <img :src=src :style="inputStyle" @click="manageClick"> 

</template>

<style>
</style>