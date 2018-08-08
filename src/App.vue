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
                @save="fetchData"/>
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
            error: null
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
            console.log(process.env.API_ENDPOINT_GET)
            getData(process.env.API_ENDPOINT_GET)
                .then(data => {
                    this.categories = data.Menu;
                    this.loading = false;
                })
                .catch(error => {
                    console.log(error);
                    this.error = error;
            });
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
