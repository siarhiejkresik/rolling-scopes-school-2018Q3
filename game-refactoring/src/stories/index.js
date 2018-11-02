import { storiesOf } from '@storybook/vue';

import LoadingView from '../screens/LoadingView.vue';
import Modal from '../components/Modal.vue';
import ModalWrapper from './ModalWrapper.vue';

import { LOREM } from './constants.js';

// LoadingView.vue

storiesOf('LoadingView', module)
  .add('loading with a message', () => ({
    components: { LoadingView },
    template: '<loading-view message="LOADING MESSAGE"></loading-view>'
  }))
  .add('loading without a  message', () => ({
    components: { LoadingView },
    template: '<loading-view></loading-view>'
  }));

// Modal.vue

storiesOf('Modal', module)
  .add('modal with some text', () => ({
    components: { Modal },
    data: function() {
      return { lorem: LOREM };
    },
    template: '<modal :show=true>{{ lorem }}</modal>'
  }))
  .add('modal with a custom title message', () => ({
    components: { Modal },
    template: '<modal :show=true title="Custom header text"></modal>'
  }))
  .add('modal with the ok and cancel buttons', () => ({
    components: { Modal },
    template: '<modal :show=true hascancel=true></modal>'
  }));

storiesOf('ModalWrapper', module).add('modal functionality', () => ({
  components: { ModalWrapper },
  template: '<modal-wrapper></modal-wrapper>'
}));
