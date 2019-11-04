<template lang="pug">
.home
    p Результат выполнения 
        a.hyperlink(href="https://kt.team/hr/test-frontend") тестового задания 
        | для 
        b kt-team
    router-link.button(to="/todos/1") Todo app
    router-link.button(to="/second-task") Second task
</template>

<script>
export default {
    name: 'Todo'
}
</script>

<style lang="sass" scoped>
.home
    display: flex
    flex-direction: column

    .button
        display: flex
        justify-content: center
        cursor: pointer
        border: none
        border-radius: 4px
        padding: 15px 35px
        margin-bottom: 1em
        background-color: #4DD0E1
        color: white
        &:hover
            background-color: darken(#4DD0E1, 10%)
        &:focus, &:active
            outline: none  

.hyperlink
    color: #4DD0E1
    &:hover
        color: darken(#4DD0E1, 20%)

</style>