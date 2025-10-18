<script setup lang="ts">
  import {onBeforeUnmount, onMounted, ref} from "vue";

  let mainListCount = ref(0);

  const listToActive = ref<HTMLElement | null>(null);
  const listLabel = ref<HTMLElement | null>(null);

  const taskOne = ref<HTMLElement | null>(null);
  const taskTwo = ref<HTMLElement | null>(null);
  const taskThree = ref<HTMLElement | null>(null);
  const taskFour = ref<HTMLElement | null>(null);
  const taskFive = ref<HTMLElement | null>(null);

  const dotOne = ref<HTMLElement | null>(null);
  const dotThree = ref<HTMLElement | null>(null);

  let animInterval: number | null = null;

  onMounted(() => {
    macWindowAnim();
  });

  const macWindowAnim = () => {
    startMacWindowAnim();
    setTimeout(() => {
      clearWindow();
    }, 10000);

    animInterval = setInterval(() => {
      startMacWindowAnim();
      setTimeout(() => {
        clearWindow();
      }, 10000);
    }, 12000);
  };

  const clearInt = () => {
    if (animInterval !== null) {
      clearInterval(animInterval);
      animInterval = null;
    }
  };


  onBeforeUnmount(() => {
    clearInt();
  });

  const startMacWindowAnim = () => {
    if (
        !listLabel.value ||
        !taskOne.value   ||
        !taskTwo.value   ||
        !taskThree.value ||
        !dotOne.value    ||
        !taskFour.value  ||
        !taskFive.value  ||
        !dotThree.value
    ) return;
    setTimeout(() => {
      if (animInterval && listToActive.value) {
        listToActive.value.classList.remove('deactivate');
        listToActive.value.classList.add('active');
      }
    }, 1000);
    setTimeout(() => {
      if (animInterval) {
        listLabel.value!.classList.remove('deactivate');
        listLabel.value!.classList.add('active');
      }
    }, 1300);
    setTimeout(() => {
      if (animInterval) {
        taskOne.value!.classList.remove('deactivate');
        taskOne.value!.classList.add('active');
        PlusCountMain();
      }
    }, 2000);
    setTimeout(() => {
      if (animInterval) {
        taskTwo.value!.classList.remove('deactivate');
        taskTwo.value!.classList.add('active');
        PlusCountMain();
      }
    }, 3000);
    setTimeout(() => {
      if (animInterval) {
        taskThree.value!.classList.remove('deactivate');
        taskThree.value!.classList.add('active');
        PlusCountMain();
      }
    }, 4000);
    setTimeout(() => {
      if (animInterval) {
        dotOne.value!.classList.remove('deactivate');
        dotOne.value!.classList.add('active');
      }
    }, 4000);
    setTimeout(() => {
      if (animInterval) {
        taskFour.value!.classList.remove('deactivate');
        taskFour.value!.classList.add('active');
        PlusCountMain();
      }
    }, 5000);
    setTimeout(() => {
      if (animInterval) {
        taskFive.value!.classList.remove('deactivate');
        taskFive.value!.classList.add('active');
        PlusCountMain();
      }
    }, 6000);
    setTimeout(() => {
      if (animInterval) {
        dotThree.value!.classList.remove('deactivate');
        dotThree.value!.classList.add('active');
      }
    }, 6000);
  };

  const PlusCountMain = () => {
    setTimeout(() => {
      mainListCount.value++;
    },300);
  };

  const MinusCountMain = () => {
    setTimeout(() => {
      mainListCount.value--;
    },300);
  };

  const clearWindow = () => {
    if (
        !listLabel.value ||
        !taskOne.value   ||
        !taskTwo.value   ||
        !taskThree.value ||
        !dotOne.value    ||
        !taskFour.value  ||
        !taskFive.value  ||
        !dotThree.value
    ) return;
    if (animInterval) {
      taskOne.value!.classList.remove('active');
      taskOne.value!.classList.add('deactivate');
      taskTwo.value!.classList.remove('active');
      taskTwo.value!.classList.add('deactivate');
      taskThree.value!.classList.remove('active');
      taskThree.value!.classList.add('deactivate');
      taskFour.value!.classList.remove('active');
      taskFour.value!.classList.add('deactivate');
      taskFive.value!.classList.remove('active');
      taskFive.value!.classList.add('deactivate');

      if (listToActive.value) {
        listToActive.value!.classList.remove('active');
        listToActive.value!.classList.add('deactivate');
      }
      listLabel.value!.classList.remove('active');
      listLabel.value!.classList.add('deactivate');

      setTimeout(() => {
        if (animInterval) {
          mainListCount.value = 0;
          dotOne.value!.classList.remove('active');
          dotOne.value!.classList.add('deactivate');
          dotThree.value!.classList.remove('active');
          dotThree.value!.classList.add('deactivate');
        }
      }, 1000);
    }
  };
</script>

<template>
  <div class="mac-window">
    <div class="mac-window__top">
      <div class="mac-window__btns">
        <div class="mac-window__button close"></div>
        <div class="mac-window__button hide"></div>
        <div class="mac-window__button stretch"></div>
      </div>
    </div>
    <div class="mac-window__workspace">
      <div class="mac-window__big-menu">
        <div class="sort-lists__container">
          <div class="sort-lists__line">
            <div class="sort-list first"></div>
            <div class="sort-list second"></div>
          </div>
          <div class="sort-lists__line">
            <div class="sort-list third"></div>
            <div class="sort-list fourth"></div>
          </div>
        </div>
        <div class="personal-lists__container">
          <div class="personal-list">
            <div class="circle second"></div>
            <p class="count">3</p>
          </div>
          <div class="personal-list" ref="listToActive">
            <div class="circle fourth"></div>
            <p class="count">{{ mainListCount }}</p>
          </div>
          <div class="personal-list">
            <div class="circle first"></div>
            <p class="count">14</p>
          </div>
          <div class="personal-list">
            <div class="circle third"></div>
            <p class="count">2</p>
          </div>
        </div>
        <div class="personal-tags__container">
          <div class="tag first">#</div>
          <div class="tag second">#</div>
          <div class="tag third">#</div>
        </div>
      </div>
      <div class="mac-window__tasker">
        <div class="list-label" ref="listLabel">List name</div>
        <div class="task" ref="taskOne">
          <div class="dot">
            <div class="inner-dot" ref="dotOne"></div>
          </div>
          <div class="task-body">
            <p class="task-name">Task name №1</p>
          </div>
        </div>
        <div class="task" ref="taskTwo">
          <div class="dot">
            <div class="inner-dot"></div>
          </div>
          <div class="task-body">
            <p class="task-name">Task name №2</p>
          </div>
        </div>
        <div class="task" ref="taskThree">
          <div class="dot">
            <div class="inner-dot" ref="dotThree"></div>
          </div>
          <div class="task-body">
            <p class="task-name">Task name №3</p>
          </div>
        </div>
        <div class="task" ref="taskFour">
          <div class="dot">
            <div class="inner-dot"></div>
          </div>
          <div class="task-body">
            <p class="task-name">Task name №4</p>
          </div>
        </div>
        <div class="task" ref="taskFive">
          <div class="dot">
            <div class="inner-dot"></div>
          </div>
          <div class="task-body">
            <p class="task-name">Task name №5</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .mac-window {
    border-radius: 20px;
    background-color: var(--AnimatedWindow);
    overflow: hidden;
    outline: var(--gold) solid 1px;
    min-width: 500px;
    flex: 1 1 800px;
    height: 500px;
    z-index: 1;
  }
  .mac-window__top {
    width: 100%;
    height: 35px;
    display: flex;
    align-items: center;
  }
  .mac-window__btns {
    margin-left: 13px;
    display: flex;
  }
  .mac-window__button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 7px;
    &.close {
      background-color: #c71938;
    }
    &.hide {
      background-color: #ead04b;
    }
    &.stretch {
      background-color: #56ea4b;
    }
  }
  .mac-window__workspace {
    width: 100%;
    display: flex;
    height: calc(100% - 35px);
  }
  .mac-window__big-menu {
    width: 200px;
    height: 100%;
    padding: 20px 10px 15px 10px;
    background-color: var(--bigMenu);
  }
  .mac-window__tasker {
    height: 100%;
    background-color: var(--tasker);
    width: calc(100% - 200px);
  }
  .sort-lists__container {
    width: 100%;
    margin-bottom: 20px;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;
  }
  .personal-lists__container {
    width: 100%;
    height: 140px;
    margin-bottom: 20px;

  }
  .personal-tags__container {
    width: 100%;
    height: 50px;
    display: flex;
    margin-left: 7px;
    padding: 6px 15px 6px 0;
  }
  .sort-lists__line {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .sort-list {
    width: 85px;
    height: 50px;
    background-color: var(--personal);
    border-radius: 10px;
    position: relative;
    &:after {
      content: '';
      width: 15px;
      height: 15px;
      position: absolute;
      top: 8px;
      left: 8px;
      border-radius: 50%;
    }
    &.first {
      &:after { background-color: rgb(76, 235, 167); }
    }
    &.second {
      &:after { background-color: rgb(231, 98, 98); }
    }
    &.third {
      &:after { background-color: rgb(218, 173, 173); }
    }
    &.fourth {
      &:after { background-color: rgb(196, 196, 196); }
    }
  }
  .personal-list {
    width: 100%;
    height: 30px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 7px;
    transition: .3s;
    border-radius: 3px;
    &.active {
      background-color: #6b6c6d;
      .count {
        color: var(--description);
      }
    }
    &.deactivate {
      background-color: transparent;
    }
  }
  .circle {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    position: relative;
    &.first {
      background-color: rgb(76, 235, 167);
    }
    &.second {
      background-color: rgb(231, 98, 98);
    }
    &.third {
      background-color: rgb(218, 173, 173);
    }
    &.fourth {
      background-color: var(--gold);
    }
    &:before {
      content: '';
      display: block;
      width: 60px;
      height: 15px;
      background-color: rgba(196, 196, 196, 0.52);
      position: absolute;
      top: 0;
      left: 25px;
    }
  }
  .count {
    color: var(--textColor);
  }
  .tag {
    height: 25px;
    background-color: rgba(196, 196, 196, 0.52);
    margin-right: 5px;
    font-size: 12px;
    line-height: 25px;
    border-radius: 5px;
    padding-left: 5px;
    &.first {
      width: 36px;
    }
    &.second {
      width: 40px;
    }
    &.third {
      width: 50px;
    }
  }
  .list-label {
    width: 100%;
    height: 80px;
    line-height: 80px;
    font-size: 30px;
    font-weight: 600;
    color: var(--gold);
    padding-left: 30px;
    opacity: 0;
    &.active {
      animation: show-list-label .5s forwards;
    }
    &.deactivate {
      animation: hide-list-label .5s forwards;
    }
  }
  @keyframes show-list-label {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes hide-list-label {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }
  .task {
    width: 100%;
    height: 60px;
    padding-left: 30px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    opacity: 0;
    &.active {
      animation: show-task 1s forwards;
    }
    &.deactivate {
      animation: hide-task 1s forwards;
    }
  }
  @keyframes show-task {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes hide-task {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }
  .dot {
    display: block;
    width: 20px;
    height: 20px;
    transition: 0.3s;
    border-width: 2px;
    border-style: solid;
    border-color: var(--gold);
    border-radius: 50%;
    position: relative;
  }
  .inner-dot {
    position: absolute;
    top: 14%;
    left: 14%;
    width: 72%;
    height: 72%;
    border-radius: 50%;
    transition: 0.3s;
    &.active {
      animation: click-dot 1s 1s forwards;
    }
    &.deactivate {
      animation: undo-dot 1s 1s forwards;
    }
  }
  @keyframes click-dot {
    0% { background-color: transparent; }
    100% { background-color: var(--gold); }
  }
  @keyframes undo-dot {
    0% { background-color: var(--gold); }
    100% { background-color: transparent; }
  }
  .task-body {
    width: calc(100% - 20px - 20px);
    height: 100%;
    border-bottom: 1px solid #C5C7CA;
    margin: 0 20px 0 10px;
    display: flex;
    align-items: center;
  }
  .task-name {
    color: var(--gold);
  }
</style>
