<template>
    <div id="app">
        <b-navbar
            toggleable="md" 
            type="dark" 
            variant="dark"
            :sticky="true"
            class="navbar">
            <b-navbar-brand>
                <a href="/sitecore/shell/sitecore/client/Applications/Launchpad">
                    <img src="./assets/sitecore-logo.png" alt="Sitecore">
                </a>
            </b-navbar-brand>
        </b-navbar>
        <div class="container-fluid m-0 h-100 p-0">
            <div class="row m-0 h-100 p-0">
                <div 
                    class="loading" 
                    v-if="loading">
                    Loading...
                </div>
                <SidebarNavigation 
                    :categories="categories" 
                    :selectedCategory="selectedCategoryIndex"
                    :selectedCollection="selectedCollectionIndex"
                    v-if="categories"
                    @selectedCollection="changeCollection"/>
                <main 
                    v-if="categories"
                    class="col-md-9 ml-sm-auto col-lg-10 px-4 bg-light">
                    <Collection 
                        :collection="categories[selectedCategoryIndex].Item[selectedCollectionIndex]" 
                        @submit="submitted"
                        @alert="setAlert"
                        @resetAlert="resetAlert"/>
                    <br>
                    <b-alert 
                        class="offset-1 col-md-6"
                        :show="alert"
                        dismissible
                        :variant="alertType"
                        @dismissed="alert=false">
                        <p>{{ alertMessage }}</p>
                    </b-alert>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import SidebarNavigation from './components/navigation/SidebarNavigation';
import Collection from './components/Collection';

import { getData } from './data/data.js';
import { SUCCESS, SUBMIT_SUCCESS_MESSAGE, DANGER } from './constants.js';

export default {
    name: "app",
    components: {
        SidebarNavigation,
        Collection
    },

    data () {
        return {
            loading: false,
            categories: null,
            selectedCategoryIndex: 0,
            selectedCollectionIndex: 0,
            error: null,

            alert: false,
            alertType: '',
            alertMessage: ''

        }
    },

    methods: {
        changeCollection(catIndex, colIndex){
            this.resetAlert()
            this.selectedCategoryIndex = catIndex;
            this.selectedCollectionIndex = colIndex;
        },
        fetchData () {
            this.error = this.categories = null;
            this.loading = true;

            getData(process.env.API_ENDPOINT_GET)
                .then(data => {
                    this.categories = data.Menu;
                    this.loading = false;
                })
                .catch(error => {
                    this.error = error;
            });
        },
        setAlert(alertType, alertMessage) {
            this.alert = true;
            this.alertType = alertType;
            this.alertMessage = alertMessage;
        },
        resetAlert() {
            this.alert = false;
            this.alertType = '';
            this.alertMessage = '';
        },
        submitted() {
            this.setAlert(SUCCESS, SUBMIT_SUCCESS_MESSAGE);
            this.fetchData();
        }
    },

    created () {
        this.fetchData();
    }
};
</script>

<style>
html, body {
    margin: 0;
    height: 100%;
}
#app {
    font-family: 'Avenir', 'Nunito Sans', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    max-height: 100%;
}

main {
    padding-top: 48px;
}

.navbar {
    z-index: 100;
}
</style>
