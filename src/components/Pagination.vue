<template lang="pug">
.pagination
    router-link.page-button(
        v-for="(page, index) in $store.state.pagesCount" 
        :class="page == $route.params.page ? 'active' : ''"
        :key="index"
        :to="`/todos/${page}`"
    ) {{ page }}
</template>

<script>
export default {
    
}
</script>

<style lang="sass" scoped>
.pagination
    display: flex
    width: 100%
    justify-content: center
    margin-top: 1em

.page-button
    padding: 5px 10px
    background-color: #EBECF0
    font-size: 13px
    border-radius: 4px 
    cursor: pointer
    margin-right: 1em
    box-shadow: 0 1px 0 rgba(0,0,0,0.1)
    &:last-of-type
        margin-right: 0
    
    &:hover
        background-color: darken(#EBECF0, 5%)

.active
    background-color: #7CA65C
    color: white
    &:hover
        background-color: darken(#7CA65C, 5%)

    

</style>