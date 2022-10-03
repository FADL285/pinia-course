/* eslint-disable no-unused-vars */
import { ref, reactive } from 'vue';

export function PiniaHistoryPlugin({ _pinia, _app, store, _options }) {
  const history = reactive([]);
  const future = reactive([]);
  const doingHistory = ref(false);
  history.push(JSON.stringify(store.$state));

  // State Subscription
  store.$subscribe((mutation, state) => {
    if (!doingHistory.value) {
      history.push(JSON.stringify(state));
      // Clear future if new action is taken
      future.length = 0;
    }
  });

  return {
    undo: () => {
      if (history.length === 1) return;
      doingHistory.value = true;
      future.push(history.pop());
      store.$state = JSON.parse(history.at(-1));
      doingHistory.value = false;
    },
    redo: () => {
      const latest = future.pop();
      if (!latest) return;
      doingHistory.value = true;
      history.push(latest);
      store.$state = JSON.parse(latest);
      doingHistory.value = false;
    }
  };
}
