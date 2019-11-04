<template lang="pug">
.todo-wrapper
    .header
        .logo Treplo
        .slogan Perhaps, the best todo app in the who-o-le world
    .todo-app
        .list-name Задачи
        AddTodo(@listChanged="getTodos($route.params.page)")
        .todos
            Preloader(v-if="$store.state.loading")
            TodoItem(@listChanged="getTodos($route.params.page)" v-for="todo in $store.state.todos" :key="todo.key" :todo="todo")
            .no-todos(v-if="!$store.state.todos.length && !$store.state.loading") Дел нет. Ура!
    Pagination
</template>

<script>
// Плугины
import { mapActions } from 'vuex'

// Компоненты
import AddTodo from '@/components/AddTodo'
import TodoItem from '@/components/TodoItem'
import Pagination from '@/components/Pagination'
import Preloader from '@/components/Preloader'

export default {
    name: 'Todo',
    components: {
        AddTodo,
        TodoItem,
        Pagination,
        Preloader
    },
    watch: {
        '$route' (to, from) {
            this.getTodos(this.$route.params.page)
        }
    },
    mounted() {
        this.getTodos(this.$route.params.page)
    },
    methods: {
        ...mapActions(['getTodos'])
    }
}
</script>

<style lang="sass" scoped>
.todo-wrapper
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    width: 100%
    min-height: 100vh
    // Как без красивой картинки гор в трелло?
    background-image: url('../assets/mountains.jpg')
    background-repeat: none
    background-size: cover
    background-position: center
    box-sizing: border-box
    padding: 0 1em

.header
    width: 270px 
    margin-bottom: 1em
    @include for-tablets-and-phones
        width: 100%

.logo
    font-weight: 700
    font-size: 24px
    margin-bottom: 10px
    color: white
    text-shadow: 1px 1px 0 rgba(0,0,0,0.5)

.slogan
    color: grey
    font-size: 14px
    color: white
    text-shadow: 1px 1px 0 rgba(0,0,0,0.5)


.todo-app
    background-color: #EBECF0
    border-radius: 4px
    width: 270px
    padding: 16px
    box-sizing: border-box
    // Больше адаптивки тут и не требуется ('.' ) 
    @include for-tablets-and-phones
        width: 100%

.list-name
    color: #172B4D
    margin-bottom: 1em

.todos
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    position: relative
    min-height: 35px

.no-todos
    font-size: 13px
    color: #BDBDBD

</style>