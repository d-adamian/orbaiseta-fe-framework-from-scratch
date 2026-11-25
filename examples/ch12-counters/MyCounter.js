import {
  defineComponent,
  h,
} from "../../packages/runtime/dist/orbaiseta-fe-framework-from-scratch.js";

export const MyCounter = defineComponent({
  state() {
    return {
      count: 0,
    };
  },
  render() {
    return h("div", {}, [
      h("h1", {}, [String(this.state.count)]),
      h("div", {}, [
        h(
          "button",
          {
            on: {
              click: () => this.updateState({ count: this.state.count + 1 }),
            },
          },
          ["ClickMe"],
        ),
        h(
          "button",
          {
            on: {
              click: () => this.emit("remove"),
            },
          },
          ["Remove"],
        ),
      ]),
    ]);
  },
});
