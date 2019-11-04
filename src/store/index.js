import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/firebase'

Vue.use(Vuex)

const TODOS_PER_PAGE = 5

export default new Vuex.Store({
    state: {
        todos: [],
        pagesCount: 0,
        loading: true
    },
    mutations: {
        SET_TODOS(state, todos) {
            state.todos = todos
        },
        SET_PAGES_COUNT(state, todosLength) {
            state.pagesCount = Math.ceil(todosLength / TODOS_PER_PAGE)
        },
        SET_LOADING(state, isLoading) {
            state.loading = isLoading
        }
    },
    actions: {
        async getTodos({ commit }, page) {

            commit('SET_LOADING', true)

            page = Number(page)

            // Дефолтное значение, если в url будет не число -__-
            if (!page) page = 1

            try {
                let todos = []

                let querySnapshot = await db.collection('todos').orderBy('createdAt', 'desc').get()

                querySnapshot.forEach(todo => {
                    todos.push(Object.assign(todo.data(), { key: todo.id }))
                })

                commit('SET_PAGES_COUNT', todos.length)

                let firstIndex = (page - 1) * TODOS_PER_PAGE
                let lastIndex = page * TODOS_PER_PAGE

                // Firebase не предоставляет удобные способы организации пагинации
                // Такие, как count и offset
                // Существующие методы, такие, как startAt/startAfter
                // Хорошо подходят для бесконечного скролла, когда заранее известна последняя запись, от
                // Которой нужно делать новый запрос

                // Поэтому пагинацию пришлось захардкодить, т.к. я потратил слишком много
                // Времени на поиск решения и не считаю это рациональным в рамках тестового задания

                // Я хотел написать бэкенд самостоятельно, и это было бы быстрее и проще, но
                // HR сказала, что firebase использовать крайне необходимо)
                const todosForPage = todos.slice(firstIndex, lastIndex)

                commit('SET_TODOS', todosForPage)
                commit('SET_LOADING', false)

                // Сначала этот лог был для тестов, но слишком он приятно выглядит в консоли, что решил не удалять
                console.log('Задачи получены и успешно записаны в стейт')
            } catch (error) {
                console.log('Ошибка получения задач')
                console.error(error)
            }
        }
    }
})
