<template>
    <div class="container-fluid">
        <div class="row">
            <h1 class="collection pl-4" >{{ collection.CollectionName }}</h1>
        </div>
        <b-form @submit="submit">
            <template v-for="parameter in updatedCollection.Parameters">
                <div 
                    class="row input-wrapper"
                    :key="parameter.SitecoreFieldID" >
                    <label class="col-md-6 text-left">
                        <div class="my-2 label">
                            <i class="accent"></i><span class="pl-2">{{ parameter.Name }}</span>
                        </div>
                        <component
                            :is="getComponentType(parameter.ControlType, parameter.PossibleValues)"
                            v-model="parameter.SelectedValue"
                            :options="parameter.PossibleValues"
                            class="inputs" >
                        </component>
                    </label>
                </div>
            </template>
            <div class="row">
                <b-button 
                    class="offset-5 xc-button" 
                    size="md"
                    variant="success"
                    type="submit">
                    Submit
                </b-button>
            </div>
        </b-form>
        <br>
        <div class="row">
            <b-alert 
                class="col-md-7"
                :show="error"
                dismissible
                variant="danger"
                @dismissed="error=false">
                <p>{{ errorMessage }}</p>
            </b-alert>
        </div>
    </div>
</template>

<script>
import { postData } from '../data/data.js';

export default {
    props: { 
        collection: {
            type: Object
        }
    },

    data() {
        return {
            updatedCollection: this.collection,
            error: false,
            showErrorAlert: false,
            errorMessage: ''
        }
    },

    watch: {
        collection: function () {
            this.updatedCollection = this.collection;
        }
    },

    methods: {
        getComponentType(controlType, possibleValues) {
            if (possibleValues && possibleValues.length > 0) {
                return "b-form-select";
            }

            switch (controlType) {
                case "Single-Line Text": 
                    return "b-form-input";
            }
            return "";
        },

        submit(evt) {
            evt.preventDefault();
            this.resetAlerts();

            postData(process.env.API_ENDPOINT_SUBMIT, this.updatedCollection)
                .then(data => {
                    if (data) {
                        this.$emit('submit');
                    } else {
                        this.error = true;
                        this.errorMessage = "Unable to get data or no data available.";
                    }
                })
                .catch(error => {
                    this.error = true;
                    this.errorMessage = error;
                });
        },

        resetAlerts() {
            this.error = false;
            this.errorMessage = '';
            this.$emit("resetAlerts");
        }
    } 
};
</script>

<style>
.inputs {
    border-radius: 0;
}

.input-wrapper {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 0;
}

.xc-button {
    border-radius: 0;
    background-color: #8399A8;
    border-color: #8399A8;
}

.collection {		
    color: #35434B;	
    font-family: 'Nunito Sans', sans-serif;	
    font-size: 24px;	
    font-weight: 900;
}

.label {
	color: #161E23;
	font-family: 'Nunito Sans', sans-serif;
	font-size: 16px;
}

.accent {
	width: 0;
    height: 0;
    border-style: solid;
    border-width: 20px 20px 0 0;
    border-color: #adbbc5 transparent transparent transparent;
    float: left;
}
</style>
