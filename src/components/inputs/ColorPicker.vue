<template>
    <div class="color-picker">
        <input 
            type="text" 
            ref="input"
            class="inputs form-control"
            v-model="color"
            @click="togglePalette">
        <VueColor
            v-if="showPalette"
            :value="color" 
            @input="updateValue"/>
    </div>
</template>

<script>
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
    data() {
        return {
            color: this.value,
            showPalette: false
        }
    },
    methods: {
        updateValue(evt) {
            this.color = evt.hex;
            this.$emit('input', this.color);
            this.handleFocus();
        },
        togglePalette() {
            this.showPalette = !this.showPalette;
        },
        handleFocus() {
            this.$refs.input.focus();
        }
    }
}
</script>

<style>
/* Defaults to 240px which is not wide enough
   Specific to Compact version */
.vc-compact {
    width: 245px !important; 

    position: absolute;
    z-index: 100;
}

</style>

