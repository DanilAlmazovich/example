<template>
    <vue-final-modal v-model="showModal" overlay-class="black-blur-glass" :esc-to-close="true" :z-index-base="15000" classes="modal-container" content-class="modal-content">
        <div class="add-basket">
            
        </div>
    </vue-final-modal>
</template>

<script>
export default {
    data() {
        return {
            showModal: false
        }
    }
}
</script>

<style>

</style>