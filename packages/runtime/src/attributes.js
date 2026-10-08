export function setAttributes(el, attrs) {
  const { class: className, style, ...otherAttributes } = attrs;
  if (className) {
    setClass(el, className);
  }
  if (style) {
    Object.entries(style).forEach(([prop, value]) => {
      setStyle(el, prop, value);
    });
  }

  for (const [name, value] of Object.entries(otherAttributes)) {
    setAttributes(el, name, value);
  }
}

function setClass(el, className) {
  el.className = "";

  if (typeof className === "string") {
    el.className = className;
  } else if (Array.isArray(className)) {
    el.classList.add(...className);
  }
}

function setStyle(el, name, value) {
  el.style[name] = value;
}

export function setAttribute(el, name, value) {
  if (value === null || value === undefined) {
    removeAttribute(el, name);
  } else if (name.startsWith("data-")) {
    el.setAttribute(name, value);
  } else {
    el[name] = value;
  }
}

export function removeAttribute(el, name) {
  el[name] = null;
  el.removeAttribute(name);
}
