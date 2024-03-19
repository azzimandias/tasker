<script setup>
import {useListViewStore} from "@/stores/ListViewStore";
import SomethingWrong from "@/components/UI/SomethingWrong.vue";
import LoaderBig from "@/components/UI/LoaderBig.vue";

const listView = useListViewStore();
</script>

<template>
  <Transition mode="out-in" name="fade">
<!--    <LoaderBig v-if="listView.loading"/>-->

<!--    <SomethingWrong v-else-if="listView.is_somethingWrong"/>-->
    <div class="search-view"> <!--v-else>-->

    </div>
  </Transition>
</template>

<style scoped lang="scss">

</style>
