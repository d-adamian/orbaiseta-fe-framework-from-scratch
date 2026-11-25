import {
  createApp,
  defineComponent,
  h,
  hFragment,
} from "../../packages/runtime/dist/orbaiseta-fe-framework-from-scratch.js";
import { MyCounter } from "./MyCounter.js";

const App = defineComponent({
  state() {
    return { counters: 3 };
  },

  render() {
    const { counters } = this.state;

    return hFragment([
      h("h1", {}, ["Repeated key problem"]),
      h("p", {}, [
        "Set a different count in each counter then remove the middle one",
      ]),
      h(
        "div",
        {},
        Array(counters)
          .fill()
          .map((_) =>
            h(MyCounter, {
              key: "abc",
              on: {
                remove: () =>
                  this.updateState({ counters: this.state.counters - 1 }),
              },
            }),
          ),
      ),
    ]);
  },
});

createApp(App).mount(document.body);
