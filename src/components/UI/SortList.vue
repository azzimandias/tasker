<template>
    <div class="sort-list">
        <div class="sort-list__container">
            <div class="circle"></div>
            <div class="sort-list__count">0</div>
        </div>
        <div class="sort-list__label">Название</div>
    </div>
</template>

<script>

</script>

<style scoped lang="scss">
    .sort-list {
        width: 100%;
        height: 70px;
        background-color: #494B4E;
        border-radius: 13px;
        padding: 8px 9px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: pointer;
        &:active {
            background-color: #5C5D5F;
            .sort-list__count, .sort-list__label {
                color: #ADAEAF;
            }
        }
    }
    .sort-list__container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .circle {
        background-color: grey;
        border-radius: 90px;
        width: 30px;
        height: 30px;
    }
    .sort-list__count, .sort-list__label {
        font-size: 18px;
        color: #C5C7CA;
    }
    .sort-list__count { font-weight: 600; }
    .sort-list__label { font-weight: 400; font-size: 15px; }
</style>