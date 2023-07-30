<template>
    <div class="personal-lists">
        <div class="personal-lists__label"> Мои списки</div>
        <div class="personal-lists__container">
            <PersonalList v-for="item in 5"/>
        </div>
    </div>
</template>

<script>
import PersonalList from '@/components/UI/PersonalList.vue';
export default {
    components: {
        PersonalList
    }
}
</script>

<style lang="scss">
    .personal-lists__label {
        font-size: 12px;
        font-weight: 500;
        color: #5F6164;
        margin: 20px 0 3px 12px;
    }
    .personal-lists__container {
        display: grid;
    }
</style>
