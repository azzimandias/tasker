<template>
    <div class="personal-list">
        <div class="personal-list__circle"></div>
        <div class="personal-list__label">Название</div>
        <div class="personal-list__count">0</div>
    </div>
</template>

<script>

</script>

<style lang="scss">
    .personal-list {
        display: flex;
        align-items: center;
        //border: 1px solid white;
        padding: 6px 15px 6px 6px;
        border-radius: 5px;
        cursor: pointer;
        &:active {
            background-color: #5C5D5F;
            .personal-list__count { color: white; }
        }
    }
    .personal-list__circle {
        background-color: grey;
        border-radius: 90px;
        width: 28px;
        height: 28px;
    }
    .personal-list__label {
        margin-left: 8px;
        font-size: 14px;
        color: white;
        flex-grow: 1;
    }
    .personal-list__count {
        font-size: 14px;
        font-weight: 600;
        color: #5F6164;
    }
</style>