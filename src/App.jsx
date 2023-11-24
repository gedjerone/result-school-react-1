import { useState } from "react";
import CScreen from "./components/CScreen";
import CButton from "./components/CButton";

const buttons = [
  ["C", "±", "÷"],
  [7, 8, 9, "×"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, "="],
];

const App = () => {
  const [calc, setCalc] = useState({
    prev_val: 0,
    current_val: 0,
    next_tick_func: "",
  });

  const [display, setDisplay] = useState("0");

  return (
    <>
      <div>
        <CScreen>{display}</CScreen>
        <div className="grid grid-cols-4 gap-4 mt-8">
          {buttons.flat().map((button, index) => (
            <CButton
              calcValue={calc}
              displayValue={display}
              key={index}
              calcHandler={setCalc}
              displayHandler={setDisplay}
            >
              {button}
            </CButton>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
