import { storiesOf } from '@storybook/vue';

import LoadingView from '../screens/LoadingView.vue';

storiesOf('LoadingView', module)
  .add('loading with a message', () => ({
    components: { LoadingView },
    template: '<loading-view message="LOADING MESSAGE"></loading-view>'
  }))
  .add('loading without a  message', () => ({
    components: { LoadingView },
    template: '<loading-view></loading-view>'
  }));
