<script setup>
  import {onBeforeUnmount, onMounted, ref} from "vue";

  let mainListCount = ref(0);

  const listToActive = ref(null);
  const listLabel = ref(null);

  const taskOne = ref(null);
  const taskTwo = ref(null);
  const taskThree = ref(null);
  const taskFour = ref(null);
  const taskFive = ref(null);
  const taskSix = ref(null);

  const dotOne = ref(null);
  const dotThree = ref(null);

  let animInterval = '';

  onMounted(() => {
    macWindowAnim();
  });

  const macWindowAnim = () => {
    startMacWindowAnim();
    setTimeout(() => {
      clearWindow();
    },10000);
    animInterval = setInterval(() => {
      startMacWindowAnim();
      setTimeout(() => {
        clearWindow();
      },10000);
    },12000);
  };

  const clearInt = () => {
    clearInterval(animInterval);
    animInterval = null;
  }

  onBeforeUnmount(() => {
    clearInt();
  })

  const startMacWindowAnim = () => {
    setTimeout(() => {
      if (animInterval && listToActive.value) {
        listToActive.value.classList.remove('deactivate');
        listToActive.value.classList.add('active');
      }
    }, 1000);
    setTimeout(() => {
      if (animInterval) {
        listLabel.value.classList.remove('deactivate');
        listLabel.value.classList.add('active');
      }
    }, 1300);
    setTimeout(() => {
      if (animInterval) {
        taskOne.value.classList.remove('deactivate');
        taskOne.value.classList.add('active');
        PlusCountMain();
      }
    }, 2000);
    setTimeout(() => {
      if (animInterval) {
        taskTwo.value.classList.remove('deactivate');
        taskTwo.value.classList.add('active');
        PlusCountMain();
      }
    }, 3000);
    setTimeout(() => {
      if (animInterval) {
        taskThree.value.classList.remove('deactivate');
        taskThree.value.classList.add('active');
        PlusCountMain();
      }
    }, 4000);
    setTimeout(() => {
      if (animInterval) {
        dotOne.value.classList.remove('deactivate');
        dotOne.value.classList.add('active');
      }
    }, 4000);
    setTimeout(() => {
      if (animInterval) {
        taskFour.value.classList.remove('deactivate');
        taskFour.value.classList.add('active');
        PlusCountMain();
      }
    }, 5000);
    setTimeout(() => {
      if (animInterval) {
        taskFive.value.classList.remove('deactivate');
        taskFive.value.classList.add('active');
        PlusCountMain();
      }
    }, 6000);
    setTimeout(() => {
      if (animInterval) {
        taskSix.value.classList.remove('deactivate');
        taskSix.value.classList.add('active');
        PlusCountMain();
      }
    }, 7000);
    setTimeout(() => {
      if (animInterval) {
        dotThree.value.classList.remove('deactivate');
        dotThree.value.classList.add('active');
      }
    }, 7000);
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
    if (animInterval) {
      taskOne.value.classList.remove('active');
      taskOne.value.classList.add('deactivate');
      taskTwo.value.classList.remove('active');
      taskTwo.value.classList.add('deactivate');
      taskThree.value.classList.remove('active');
      taskThree.value.classList.add('deactivate');
      taskFour.value.classList.remove('active');
      taskFour.value.classList.add('deactivate');
      taskFive.value.classList.remove('active');
      taskFive.value.classList.add('deactivate');
      taskSix.value.classList.remove('active');
      taskSix.value.classList.add('deactivate');

      if (listToActive.value) {
        listToActive.value.classList.remove('active');
        listToActive.value.classList.add('deactivate');
      }
      listLabel.value.classList.remove('active');
      listLabel.value.classList.add('deactivate');

      setTimeout(() => {
        if (animInterval) {
          mainListCount.value = 0;
          dotOne.value.classList.remove('active');
          dotOne.value.classList.add('deactivate');
          dotThree.value.classList.remove('active');
          dotThree.value.classList.add('deactivate');
        }
      }, 1000);
    }
  };
</script>

<template>
  <div class="phone-window">
    <div class="phone-bang"></div>
    <div class="phone-window__workspace">
      <div class="phone-window__tasker">
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
        <div class="task" ref="taskSix">
          <div class="dot">
            <div class="inner-dot"></div>
          </div>
          <div class="task-body">
            <p class="task-name">Task name №6</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/styles/global.scss";
.phone-window {
  border-radius: 20px;
  background-color: $textColorActive;
  @include theme('background-color', $textColorActive);
  overflow: hidden;
  outline-width: 1px;
  outline-style: solid;
  @include theme('outline-color', $gold);
  max-width: 230px;
  flex: 0 0 230px;
  height: 500px;
  border-width: 6px;
  border-style: solid;
  @include theme('border-color', $textColorActive);
  position: relative;
  z-index: 1;
}
.phone-bang {
  position: absolute;
  top: 0;
  left: calc(50% - 50px);
  border-width: 10px;
  border-style: solid;
  @include theme('border-color', $textColorActive);
  @include theme('background-color', $textColorActive);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  height: 0;
  width: 100px;
}
.phone-window__workspace {
  height: 100%;
}
.phone-window__tasker {
  height: 100%;
  @include theme('background-color', $AnimatedWindow);
  width: 100%;
  padding-top: 30px;
  .list-label {
    font-size: 25px;
    padding-left: 15px;
  }
  .task {
    padding-left: 15px;
    height: 45px;
  }
  .dot {
    width: 15px;
    height: 15px;
  }
}
.list-label {
  width: 100%;
  height: 80px;
  line-height: 80px;
  font-size: 30px;
  font-weight: 600;
  color: $gold;
  @include theme('color', $gold);
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
  @include theme('border-color', $gold);
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
  100% { @include theme('background-color', $gold); }
}
@keyframes undo-dot {
  0% { @include theme('background-color', $gold); }
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
  @include theme('color', $gold);
}
</style>