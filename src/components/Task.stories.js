import Task from './Task.vue';

import { action } from '@storybook/addon-actions';

export default {
  component: Task,
  excludeStories: /.*Data$/,
  title: 'Task',
  argTypes: {
    onPinTask: {},
    onArchiveTask: {},
  },
};
// on{EventName} 형식으로 작성하면 EventName에 해당하는 이벤트가 발생했을 때 
// 그 이벤트에 대해서 등록되어 있는 이벤트 핸들러에 전달된 인수를 actions 에드온 탭에서 관찰할수 있다.
// action의 인자로 주는 이름은 그냥 식별하기 편한 이름 임의로 지정하면 된다.
export const actionsData = {
  onPinTask: action('pin-task'),
  onArchiveTask: action('archive-task'),
};

const Template = args => ({
  components: { Task },
  setup() {
    return { args, ...actionsData };
  },
  template: `<Task v-bind="args" />`,
});
export const Default = Template.bind();
Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX',
    updatedAt: new Date(2018, 0, 1, 9, 0),
  },
};

export const Pinned = Template.bind();
Pinned.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_PINNED',
  },
};

export const Archived = Template.bind();
Archived.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_ARCHIVED',
  },
};