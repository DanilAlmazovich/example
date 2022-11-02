<template>
    <div>
        <button @click="showList = !showList" class="azor-down-open-mini" :class="{'close-list-subcategory': showList}">{{ item.name }}</button>
        <div style="padding-bottom: 10px" v-if="showList">
            <locale-link v-for="children in item.children" :key="children.id" :to="toCategory(children)" tag="span">
              {{ children.name }}
            </locale-link>
            <locale-link :to="toCategory(item)">Смотреть все</locale-link>
        </div>
    </div>
</template>

<script>
import toCategory from '~/mixins/to-category';
export default {
    props: {
        item: Object,
    },
    data() {
        return {
            showList: false,
        };
    },
    mixins: [toCategory],
};
</script>