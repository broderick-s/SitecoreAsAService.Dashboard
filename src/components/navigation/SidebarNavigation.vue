<template>
    <b-tabs class="c-sidebar-nav navbar-light">
        <ul class="nav">
            <li 
                class="nav-item" 
                v-for="(category, catIndex) in categories"
                :key="catIndex">
                <strong>{{ category.Category }}</strong>
                <a 
                    v-for="(collection, colIndex) in category.Item"
                    :key="colIndex"
                    class="nav-link" 
                    @click="selectCollection(catIndex, colIndex)"
                    href="#">{{ collection.CollectionName }}</a>
            </li>
        </ul>
    </b-tabs>
</template>

<script>
export default {
    props: {
        categories: {
            required: true,
            type: Array
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
        selectCollection(catIndex, colIndex) {
            this.$emit('selectedCollection', catIndex, colIndex)
        }
    }
}
</script>

<style>
</style>
