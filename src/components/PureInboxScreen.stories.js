import { app } from '@storybook/vue3';
import { createStore } from 'vuex';
import { fireEvent, within } from '@storybook/testing-library';

import PureInboxScreen from './PureInboxScreen.vue';
import { action } from '@storybook/addon-actions';
import * as TaskListStories from './PureTaskList.stories';
// 직접 스토어를 불러와서 여기서 써도 된다. 그러면 재작성할 필요 없다. 하지만 거기서 발생하는 액션을 트래킹할 수 없다.
import store from '../store';


// 스토어를 다음과 같이 모킹하면 컨테이너형 컴포넌트들을 렌더링할 수 있고 액션이 발생할 때 액션 에드온에서 트래킹이 가능하다.
// 하지만 아래 모킹 구현에는 state를 조작하는 부분이 작성되어 있지 않으므로 스토리북에서 인터랙션을 직접 관찰할 수 없다.
// 결국 인터랙션을 관찰하려면 mutations, actions에 대한 추가적인 작성이 필요하다.
/*
const store = createStore({
  state: {
    tasks: TaskListStories.Default.args.tasks,
  },
  actions: {
    pinTask(context, id) {
      action('pin-task')(id);
    },
    archiveTask(context, id) {
      action('archive-task')(id);
    },
  },
});
*/
app.use(store);

export default {
  component: PureInboxScreen,
  title: 'PureInboxScreen',
};

const Template = args => ({
  components: { PureInboxScreen },
  setup() {
    return { args };
  },
  template: '<PureInboxScreen v-bind="args" />',
});

export const Default = Template.bind({});
export const Error = Template.bind({});
Error.args = { error: true };

export const WithInteractions = Template.bind({});

WithInteractions.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await fireEvent.click(canvas.getByLabelText('pinTask-1'));
  await fireEvent.click(canvas.getByLabelText('pinTask-3'));
};