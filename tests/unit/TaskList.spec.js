import { mount } from '@vue/test-utils';

import TaskList from '../../src/components/TaskList.vue';
import { WithPinnedTasks } from '../../src/components/PureTaskList.stories';

test('render pinned tasks at the start of the list', () => {
  const wrapper = mount(TaskList, {
    props: WithPinnedTasks.args,
  });
  const firstPinnedTask = wrapper.find('.list-item:nth-child(1).TASK_PINNED');
  expect(firstPinnedTask).not.toBe(null);
});