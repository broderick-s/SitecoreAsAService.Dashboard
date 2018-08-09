<template>
    <div id="app">
        <b-navbar
            toggleable="md" 
            type="dark" 
            variant="dark">
            <b-navbar-brand>
                <img src="./assets/sitecore-logo.png" alt="Sitecore">
            </b-navbar-brand>
        </b-navbar>
        
        <main>
            <div 
                class="loading" 
                v-if="loading">
                Loading...
            </div>
            <SidebarNavigation 
                :categories="categories" 
                v-if="categories"
                @selectedCollection="changeCollection"/>
            <div 
                class="page-content" 
                v-if="categories">
                <Collection 
                    :collection="categories[selectedCategoryIndex].Item[selectedCollectionIndex]" 
                    @submit="submitted"
                    @resetAlerts="resetAlerts"/>

                <b-alert 
                    class="offset-1 col-md-6"
                    :show="submitSuccess"
                    dismissible
                    variant="success"
                    @dismissed="submitSuccess=false">
                    <p>Changes submitted successfully!</p>
                </b-alert>
            </div>
        </main>
    </div>
</template>

<script>
import SidebarNavigation from './components/navigation/SidebarNavigation';
import Collection from './components/Collection';

import { getData } from './data/data.js'

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
            submitSuccess: false
        }
    },

    methods: {
        changeCollection(catIndex, colIndex){
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
        submitted() {
            this.submitSuccess = true;
            this.fetchData();
        }
    },

    created () {
        this.fetchData();
    }
};
</script>

<style>
#app {
    font-family: 'Avenir', 'Nunito Sans', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

</style>
