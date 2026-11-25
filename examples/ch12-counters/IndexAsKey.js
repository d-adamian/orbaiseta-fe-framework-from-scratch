import {
  createApp,
  defineComponent,
  h,
} from "../../packages/runtime/dist/orbaiseta-fe-framework-from-scratch.js";
import { MyCounter } from "./MyCounter.js";

const App = defineComponent({
  state() {
    return { counters: 3 };
  },

  render() {
    const { counters } = this.state;

    return h(
      "div",
      {},
      Array(counters)
        .fill()
        .map((_, index) => {
          return h(MyCounter, {
            key: index,
            on: {
              remove: () => {
                this.updateState({ counters: this.state.counters - 1 });
              },
            },
          });
        }),
    );
  },
});

createApp(App).mount(document.body);
