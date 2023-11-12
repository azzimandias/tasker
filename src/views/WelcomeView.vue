<template>
  <div class="skin">
    <div style="display: none;"><router-link to="/workspace">К работе!</router-link></div>
    <div class="top-block">Reminder: This is a test project</div>
    <div class="header">
      <div class="group-wrapper">
        <div class="logo-wrapper">
          <ApplicationName/>
        </div>
        <p class="logo-description">all your goals will be here</p>
      </div>
      <div class="btns-wrapper">
        <SignButton :class="'sign-in'">Sign in</SignButton>
        <SignButton :class="'sign-up'">Sign up</SignButton>
      </div>
    </div>
    <div class="main-block">
      <div class="main-block__left">
        <h2 class="header_big">Are you constantly planning something?</h2>
        <p class="description">
          Then we have a solution for you — TASKER.
          With this application you can easily plan your day and learn to manage your life.
        </p>
        <p class="description">
          The frontend part of the application is developed on the basis of Vue.js, the backend part is developed on Laravel.
        </p>
        <SignButton :class="'sign-up'">Start using</SignButton>
      </div>
      <div class="main-block__right">
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
                <div class="personal-list">
                  <div class="circle fourth"></div>
                  <p class="count">6</p>
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
              <div class="list-label">List name</div>
              <div class="task">
                <div class="dot">
                  <div class="inner-dot"></div>
                </div>
                <div class="task-body">
                  <p class="task-name">Task name №1</p>
                </div>
              </div>
              <div class="task">
                <div class="dot">
                  <div class="inner-dot"></div>
                </div>
                <div class="task-body">
                  <p class="task-name">Task name №2</p>
                </div>
              </div>
              <div class="task">
                <div class="dot">
                  <div class="inner-dot"></div>
                </div>
                <div class="task-body">
                  <p class="task-name">Task name №3</p>
                </div>
              </div>
              <div class="task">
                <div class="dot">
                  <div class="inner-dot"></div>
                </div>
                <div class="task-body">
                  <p class="task-name">Task name №4</p>
                </div>
              </div>
              <div class="task">
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
      </div>
    </div>
  </div>
</template>

<script setup>
  import ApplicationName from '@/components/UI/ApplicationName.vue';
  import SignButton from '@/components/UI/SignButton.vue';
</script>

<style lang="scss" scoped>
  @import "../assets/styles/global.scss";
  .skin {
    width: 100%;
    height: 100%;
    background-color: $tasker;
  }
  .top-block {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: $personal;
  }
  .header {
    width: 100%;
    height: 90px;
    padding: 15px 40px 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .group-wrapper {
    width: 400px;
    display: flex;
    align-items: flex-start;
  }
  .logo-wrapper {
    width: 200px;
    height: 100%;
    display: flex;
    align-items: flex-start;
  }
  .logo-description {
    height: 47px;
    line-height: 50px;
    color: #5C5D5F;
  }
  .btns-wrapper {
    width: 320px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .main-block {
    width: 100%;
    height: calc(100vh - 130px);
    padding: 0 40px;
    //padding-left: 14rem;
    display: flex;
  }
  .main-block__left {
    width: 500px;
    height: 100%;
    padding-top: 100px;
  }
  .header_big {
    font-size: 50px;
    line-height: 60px;
    color: $description;
    margin-bottom: 20px;
  }
  .description {
    font-size: 20px;
    line-height: 30px;
    color: $description;
    margin-bottom: 20px;
  }
  .main-block__right {
    padding-top: 50px;
    width: calc(100% - 500px);
    display: flex;
    justify-content: flex-end;
  }
  .mac-window {
    width: 800px;
    height: 500px;
    border-radius: 20px;
    background-color: $macWindow;
    overflow: hidden;
    outline: 1px solid $gold;
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
    height: calc(100% - 35px);
    display: flex;
  }
  .mac-window__big-menu {
    width: 200px;
    height: 100%;
    padding: 20px 10px 15px 10px;
    background-color: $bigMenu;
  }
  .mac-window__tasker {
    width: calc(100% - 200px);
    height: 100%;
    background-color: #0f0f0f;
  }
  .sort-lists__container {
    width: 100%;
    margin-bottom: 20px;
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
    background-color: #494B4E;
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
      background-color: rgb(196, 196, 196);
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
    color: $textColor;
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
    color: $gold;
    padding-left: 30px;
  }
  .task {
    width: 100%;
    height: 60px;
    padding-left: 30px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .dot {
    display: block;
    width: 20px;
    height: 20px;
    transition: 0.3s;
    border: 2px solid $gold;
    border-radius: 50%;
    cursor: pointer;
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
    background-color: $gold;
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
    color: $gold;
  }
</style>
