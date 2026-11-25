import { destroyDOM } from "./destroy-dom";
import { Dispatcher } from "./dispatcher";
import { patchDOM } from "./patch-dom";
import { mountDOM } from "./mount-dom";
import { h } from "./h";

export function createAppNonComponent({ state, view, reducers = {} }) {
  let parentEl = null;
  let vdom = null;

  const dispatcher = new Dispatcher();
  const subscriptions = [dispatcher.afterEveryCommand(renderApp)];

  function emit(eventName, payload) {
    dispatcher.dispatch(eventName, payload);
  }

  for (const actionName in reducers) {
    const reducer = reducers[actionName];
    const subs = dispatcher.subscribe(actionName, (payload) => {
      state = reducer(state, payload);
    });
    subscriptions.push(subs);
  }

  function renderApp() {
    const newVdom = view(state, emit);
    vdom = patchDOM(vdom, newVdom, parentEl);
  }

  return {
    mount(_parentEl) {
      parentEl = _parentEl;
      vdom = view(state, emit);
      mountDOM(vdom, parentEl);

      return this;
    },

    unmount() {
      destroyDOM(vdom);
      vdom = null;
      subscriptions.forEach((unsubscribe) => unsubscribe());
    },

    emit(eventName, payload) {
      emit(eventName, payload);
    },
  };
}

export function createApp(RootComponent, props = {}) {
  let parentEl = null;
  let isMounted = false;
  let vdom = null;

  function reset() {
    parentEl = null;
    isMounted = false;
    vdom = null;
  }

  return {
    mount(_parentEl) {
      if (isMounted) {
        throw new Error("App is already mounted");
      }
      parentEl = _parentEl;
      vdom = h(RootComponent, props);
      mountDOM(vdom, parentEl);
      isMounted = true;
    },

    unmount() {
      if (!isMounted) {
        throw new Error("App is not mounted");
      }
      destroyDOM(vdom);
      reset();
    },
  };
}
