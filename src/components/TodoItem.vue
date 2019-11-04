<template lang="pug">
.todo(v-if="!editing")
    .task(:class="todo.done ? 'done' : ''") {{ todo.task }}
    .todo-buttons-wrapper
        .todo-buttons
            DoneIcon.icon(@click.native="toggleCompletion(todo.key, todo.done)")  
            EditIcon.icon(@click.native="editing = true")
            DeleteIcon.icon(@click.native="remove(todo.key)")   
.editing(v-else)
    textarea-autosize(v-model="task" rows="1")
    .editing-buttons
        button.save(@click="update(todo.key)") Сохранить
        button.cancel(@click="editing = false") Отмена
</template>

<script>
import { db } from '@/firebase'

import DeleteIcon from '@/components/Icons/Delete'
import DoneIcon from '@/components/Icons/Done'
import EditIcon from '@/components/Icons/Edit'

export default {
    name: 'TodoItem',
    components: {
        DeleteIcon,
        DoneIcon,
        EditIcon
    },
    props: {
        todo: Object
    },
    data() {
        return {
            editing: false,
            task: this.todo.task
        }
    },
    // Да, можно было вынести эти методы во vuex
    // Но, на мой взгляд, лучшая практика хранить их локально
    // И решил не перегружать код try/catch, но, понятное дело, что они тут необходимы
    methods: {
        async update(key) {
            await db.collection('todos').doc(key).update({ task: this.task })
            this.editing = false
            this.$emit('listChanged')
        },
        async remove(key) {
            await db.collection('todos').doc(key).delete()
            this.$emit('listChanged')
        },
        async toggleCompletion(key, done) {
            await db.collection('todos').doc(key).update({ done: !done });
            this.$emit('listChanged')
        }
    }
}
</script>

<style lang="sass" scoped>
.todo
    overflow: hidden
    position: relative
    cursor: pointer
    width: 100%
    padding: 10px
    font-size: 14px
    color: #172B4D
    background-color: white
    border-radius: 4px
    box-shadow: 0px 1px 1px #B2B9C5
    box-sizing: border-box
    margin-bottom: 0.5em
    line-height: 20px
    &:hover
        background-color: #F4F5F7
        & .todo-buttons
            opacity: 1
    &:last-of-type
        margin-bottom: 0

    .todo-buttons-wrapper
        position: absolute
        top: 0
        right: 0

    .todo-buttons
        display: flex
        flex-direction: row
        align-items: center
        justify-content: flex-end
        opacity: 0
        height: 40px
        width: 140px
        background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1))
        transition: opacity 200ms linear

    .icon
        background-color: rgba(0,0,0,0.05)
        padding: 5px
        border-radius: 4px
        width: 14px
        height: 14px
        margin-right: 5px
        fill: #505F79
        transition: all 100ms linear
        &:hover
            background-color: rgba(0,0,0,0.3)
            fill: white

.done
    text-decoration: line-through

.editing
    width: 100%

textarea
    font-size: 14px
    color: #172B4D
    line-height: 20px
    padding: 10px
    width: 100%
    font-family: 'Roboto', sans-serif
    resize: vertical
    margin: 0.5em 0
    border-radius: 4px
    border: none
    min-height: 50px
    box-shadow: 0px 1px 1px #B2B9C5
    box-sizing: border-box
    &:focus, &:active
        outline: none
    &::placeholder
        color: #5E6C84

.editing-buttons
    margin-bottom: 1em

    button 
        border: none
        cursor: pointer
        padding: 5px 10px
        margin-right: 10px
        border-radius: 4px

    .save
        color: white
        background-color: #7CA65C
        &:hover
            background-color: darken(#7CA65C, 5%)
    .cancel
</style>