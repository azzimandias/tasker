<script setup>
  import Alert from "@/components/MY_UI/Alert.vue";
  import {useListViewStore} from "@/stores/ListViewStore";
  import {reactive, watch} from "vue";

  const listView = useListViewStore();
  const alerts = reactive(listView.alerts);
  watch(() => listView.alerts, (newAlerts) => {
    alerts.splice(0, alerts.length, ...newAlerts);
  });
</script>

<template>
  <div class="alerts">
    <Alert v-for="alert in alerts"
           :key="alert.id"
           :alert="alert"
           @closeAlert="listView.removeAlert"
    />
  </div>
</template>

<style scoped lang="scss">
  .alerts {
    width: 0;
    height: 0;
  }
</style>
