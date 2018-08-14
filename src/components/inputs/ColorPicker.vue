<template>
    <VueColor :value="value" @input="updateValue" />
</template>

<script>
// Component used to wrap the color picker library
import { Compact } from 'vue-color';

export default {
    components: {
        'VueColor': Compact
    },
    props: {
        value: {
            type: String,
            required: true
        }
    },
    methods: {
        updateValue(evt) {
            this.$emit('input', evt.hex)
        }
    }
}
</script>

<style>
/* Defaults to 240px which is not wide enough
   Specific to Compact version */
.vc-compact {
    width: 245px !important; 
}
</style>

