<template>
    <nav class="col-md-3 col-lg-2 d-none d-md-block bg-white sidebar">
        <div class="sidebar-sticky">
            <ul class="nav flex-column">
                <li 
                    v-for="(category, catIndex) in categories"
                    :key="catIndex"
                    class="nav-item">
                    <div 
                        class="cat-item" 
                        :class="activeCategory(catIndex)"
                        @click="selectCollection(catIndex, 0)">
                        <div class="offset-md-2 offset-lg-2 offset-xl-3"><IconGlobal /> {{ category.Category }}</div>
                        
                    </div>
                    <a 
                        v-for="(collection, colIndex) in category.Item"
                        :key="colIndex"
                        class="nav-link"
                        :class="activeCollection(catIndex, colIndex)"
                        @click="selectCollection(catIndex, colIndex)"
                        href="#">
                        <i class="square" :class="activeCollection(catIndex, colIndex)"></i>{{ collection.CollectionName }}
                    </a>
                </li>
            </ul>
            
            <img 
                class="logo offset-md-3 offset-lg-3 offset-xl-4"
                src="../../assets/XC_Logo_Dark.png" 
                alt="XCentium">
        </div>
    </nav>
</template>

<script>
import IconGlobal from '../icons/IconGlobal';

export default {
    components: {
        IconGlobal
    },
    props: {
        categories: {
            required: true,
            type: Array
        },
        selectedCollection: {
            required: true,
            type: Number
        },
        selectedCategory: {
            required: true,
            type: Number
        }
    },
    methods: {
        selectCollection(catIndex, colIndex) {
            this.$emit('selectedCollection', catIndex, colIndex)
        },
        activeCategory (catIndex) {
            return catIndex === this.selectedCategory ? 'active' : '';
        },
        activeCollection (catIndex, colIndex) {
            return catIndex === this.selectedCategory 
                && colIndex === this.selectedCollection ? 'active' : '';
        }
    }
}
</script>

<style>

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 51px 0 0;
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto;
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
    font-weight: 500;
    color: #333;
    height: 40px;
    line-height: 40px;
    padding: 0;
    text-align: justify;
    text-indent: 48px;
}


.sidebar .nav-link.active {
    text-indent: 32px; 
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
    color: inherit;
}

.cat-item {
    height: 60px;
    line-height: 60px;
    cursor: pointer;
    text-align: initial;
}

.cat-item.active {
    color: white;
    background-color: #11869B;
}

.cat-item.active svg {
    margin-right: 26px;
    vertical-align: text-top;
}

.cat-item.active svg path {
    fill: white;
}

.square.active {	
    height: 6px;	
    width: 6px;	
    background: #11869B;
    display: inline-block;
    margin: 0 10px 3px 0;
}

.logo {
    position: absolute;
    bottom: 30px;
    left: 0px;
}

</style>
