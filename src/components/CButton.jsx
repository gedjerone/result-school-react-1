/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

const actionMap = new Map([
  ["±", ""],
  ["÷", (a, b) => division(a, b)],
  ["×", (a, b) => multiplication(a, b)],
  ["-", (a, b) => subtract(a, b)],
  ["+", (a, b) => addition(a, b)],
]);

const division = (a, b) => {
  return Math.floor(a / b);
};

const multiplication = (a, b) => {
  return a * b;
};

const subtract = (a, b) => {
  return a - b;
};

const addition = (a, b) => {
  return a + b;
};

const isAction = (btn) => {
  return actionMap.has(btn);
};

const isEquals = (btn) => {
  return btn === "=";
};

const isClear = (btn) => {
  return btn === "C";
};

const setActionClass = (btn) => {
  if (isEquals(btn)) return "btn__equals";
  if (isClear(btn)) return "btn__clear";
  return isAction(btn) ? "btn__action" : "bg-neutral-800";
};

const CButton = ({ children, ...props }) => {
  const clearAction = () => {
    props?.calcHandler({
      prev_val: 0,
      current_val: 0,
      next_tick_func: "",
    });
    props?.displayHandler("0")
  }

  const minusAction = () => {
    props?.calcHandler({
      prev_val: props.calcValue?.prev_val,
      current_val: -props.calcValue?.current_val,
      next_tick_func: props.calcValue?.next_tick_func,
    });
    props?.displayHandler(`${-props.calcValue?.current_val}`)
  }

  const numberAction = (btn) => {
    const value = +`${props.calcValue.current_val}${btn}`;
    props?.calcHandler({
      prev_val: props.calcValue?.prev_val,
      current_val: value,
      next_tick_func: props.calcValue?.next_tick_func,
    });
    props?.displayHandler(`${value}`);
    return;
  }
  
  const equalsAction = (btn = "") => {
    const value = actionMap.get(`${props.calcValue?.next_tick_func}`)(props.calcValue?.prev_val, props.calcValue?.current_val);
    const func = btn ? btn : "";
    props?.calcHandler({
      prev_val: func ? value : 0,
      current_val: func ? 0 : value,
      next_tick_func: func,
    });
    props?.displayHandler(`${value}${func && (" " + func + " ")}`);
    return;
  }

  const basicAction = (btn) => {
    props?.calcHandler({
      prev_val: props.calcValue.current_val,
      current_val: 0,
      next_tick_func: btn,
    });
    props?.displayHandler(`${props.calcValue.current_val} ${btn} `);
  }
  
  const handleClick = (btn) => {
    if (isEquals(btn)) {
      equalsAction();
      return;
    }
    if (isClear(btn)) {
      clearAction();
      return;
    }
    if (isAction(btn) && btn === '±') {
      minusAction();
      return;
    }
    if (!isClear(btn) && !isAction(btn) && !isEquals(btn)) {
      numberAction(btn);
      return;
    }
    if (isAction(btn) && btn !== '±') {
      if (props.calcValue?.next_tick_func) {
        equalsAction(btn);
      } else {
        basicAction(btn);
      }
      return;
    }
  };
  return (
    <button
      className={
        "min-w-[4rem] h-16 rounded-lg font-bold text-xl cursor-pointer " +
        setActionClass(children)
      }
      onClick={() => handleClick(children)}
    >
      {children}
    </button>
  )
}

export default CButton;