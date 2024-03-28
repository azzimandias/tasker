<script>
  export default {
    props: ['cl']
  }
</script>

<template>
    <button class="top-btn" :class="cl"></button>
</template>

<style lang="scss">
    .top-btn {
        width: 35px;
        height: 35px;
        cursor: pointer;
        background-position: center;
        background-size: 30px 30px;
        background-repeat: no-repeat;
        &:active { opacity: 0.8; }
    }
    .person { background-image: url('../../assets/svgs/person.svg'); }
    .plus { background-image: url('../../assets/svgs/plus.svg'); }
    .loup { background-image: url('../../assets/svgs/magnifying-glass.svg'); }
    .close { background-image: url('../../assets/svgs/close.svg'); }
</style>
