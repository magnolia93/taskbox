<template>
  <PureTaskList :tasks="tasks" @archive-task="archiveTask" @pin-task="pinTask" />
</template>

<script>
import PureTaskList from './PureTaskList.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'TaskList',
  components: { PureTaskList },
  setup() {
    const store = useStore();
    const tasks = computed(() => store.state.tasks);
    const archiveTask = taskId => store.dispatch('archiveTask', taskId)
    const pinTask = taskId => store.dispatch('pinTask', taskId);
    
    return {
      tasks,
      archiveTask,
      pinTask,
    };
  },
};
</script>