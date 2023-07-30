<template>
    <div class="personal-tags">
        <div class="personal-tags__label">Теги</div>
        <div class="personal-tags__container">
            <div class="all-tags">Все теги</div>
            <PersonalTag v-for="item in 6"/>
        </div>
    </div>
</template>

<script>
import PersonalTag from '@/components/UI/PersonalTag.vue';
export default {
    components: {
        PersonalTag
    }
}
</script>

<style lang="scss">
    .personal-tags__label {
        font-size: 12px;
        font-weight: 500;
        color: #5F6164;
        margin: 20px 0 3px 12px;
    }
    .personal-tags__container {
        display: flex;
        flex-wrap: wrap;
        padding: 6px 15px 6px 6px;
    }
    .all-tags {
        background-color: #45474A;
        color: #aaadae;
        font-size: 13px;
        padding: 5px 8px;
        border-radius: 5px;
        margin-right: 5px;
        margin-bottom: 5px;
        cursor: pointer;
    }
</style>