<template lang="pug">
.wrapper
    .preloader
        RefreshIcon
</template>

<script>
import RefreshIcon from '@/components/Icons/Refresh'

export default {
    name: 'Preloader',
    components: {
        RefreshIcon
    }
}
</script>

<style lang="sass" scoped>
.wrapper
    position: absolute
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    height: 100%
    background-color: rgba(0,0,0,0.3)
    z-index: 1
    border-radius: 4px

.preloader
    width: 25px 
    height: 25px
    fill: white
    animation: spin 800ms linear infinite

@keyframes spin
    100%
        transform: rotate(360deg)

</style>