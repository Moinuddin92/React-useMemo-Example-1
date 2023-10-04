import { useEffect, useMemo, useState, useCallback } from "react";
import "./styles.css";

function fact(number) {
  let result = 1;
  for (let i = 1; i <= number; i++) {
    result *= i;
  }
  return result;
}

function TestComponeont() {
  console.log("this is a component call");
  return <div>hi</div>;
}

function ImporvedButton({ onClick }) {
  console.log("will this rerender");
  return <button onClick={onClick}>Increment</button>;
}

export default function App() {
  const [state, setState] = useState({
    counter: 0,
    inputForFib: 0
  });

  const factResult = useMemo(() => {
    console.log("did i run");
    return fact(state.inputForFib);
  }, [state.inputForFib]);

  const memoHandleClick = useCallback(() => {
    setState((oldValue) => {
      return { ...oldValue, counter: oldValue.counter + 1 };
    });
  }, [setState]);

  const memoImporvedButton = useMemo(() => {
    return <ImporvedButton onClick={memoHandleClick} />;
  }, [memoHandleClick]);

  // fact function

  const MemoriedTestComponentAsValue = useMemo(() => {
    return TestComponeont();
  }, []);

  return (
    <div className="App">
      Fact{" "}
      <input
        value={state.inputForFib}
        onChange={(e) => {
          setState((oldState) => {
            return { ...oldState, inputForFib: e.target.value };
          });
        }}
      />
      <br />
      <div>Fac result {factResult}</div>
      <div> counter : {state.counter}</div>
      {MemoriedTestComponentAsValue}
      {memoImporvedButton}
    </div>
  );
}
