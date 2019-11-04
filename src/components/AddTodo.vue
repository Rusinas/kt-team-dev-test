<template lang="pug">
.add-todo
    .minimized(@click="minimized = false" v-if="minimized")
        .plus-icon
        | Add a card
    .maximized(v-if="!minimized")
        textarea-autosize(placeholder="Enter a title for this card..." rows="1" v-model="task")
        .buttons
            button(@click="add()") Add card
            .close-button-wrapper 
                .close-button(@click="minimized = true")
</template>

<script>
import { db } from '@/firebase'

export default {
    name: 'AddTodoForm',
    data() {
        return {
            minimized: true,
            task: ''
        }
    },
    methods: {
        add() {
            if (!this.task) return 

            db.collection('todos').add({ task: this.task, done: false, createdAt: Date.now() })
            this.task = ''
            this.$emit('listChanged')
            this.$router.push('/todos/1')
        }
    }
}
</script>

<style lang="sass" scoped>

.add-todo
    color: #5E6C84
    margin: 1em 0

.minimized
    cursor: pointer
    display: flex
    align-items: center
    font-size: 14px
    padding: 5px
    border-radius: 4px
    transition: background-color 100ms linear
    &:hover
        background-color: #DADBE2

.plus-icon
    height: 20px
    width: 20px
    display: inline-block
    font-size: 20px
    line-height: 20px
    text-align: center
    margin-right: 10px
    &:before
        content: '+'
    
.maximized
    display: grid
    justify-items: start

    & textarea
        font-size: 14px
        color: #172B4D
        line-height: 20px
        padding: 10px
        width: 100%
        font-family: 'Roboto', sans-serif
        resize: vertical
        margin: 1em 0
        border-radius: 4px
        border: none
        min-height: 50px
        box-shadow: 0px 1px 1px #B2B9C5
        box-sizing: border-box
        &:focus, &:active
            outline: none
        &::placeholder
            color: #5E6C84

    .buttons
        display: flex
        align-items: center

    button
        cursor: pointer
        background-color: #7CA65C
        border: none
        color: white
        font-weight: 600
        padding: 10px 20px
        font-size: 16px
        border-radius: 4px
        transition: background-color 100ms linear
        margin-right: 1em
        &:focus, &:active
            outline: none
        &:hover
            background-color: darken(#7CA65C, 5%)

    .close-button-wrapper
        cursor: pointer
        position: relative
        width: 26px
        height: 26px
        transition: transform 500ms ease-in-out
        // Уииииииииии
        // Завертел кнопку!
        &:hover
            transform: rotate(720deg)
    .close-button
        position: absolute
        width: 26px
        height: 26px
        opacity: 0.3
        
        &:hover 
            opacity: 1
        
        &:before, &:after 
            position: absolute
            left: 12px
            // top: 1px
            content: ' '
            height: 26px
            width: 2px
            background-color: #333
        
        &:before 
            transform: rotate(45deg)
        
        &:after 
            transform: rotate(-45deg)
</style>