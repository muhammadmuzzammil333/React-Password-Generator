import { useCallback, useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSWTXYZabcdefghijklmnopqrstwxyz";
    if (numberAllowed) str += "1234567890";
    if (characterAllowed) str += "!@#$%^&*()_+=-|:";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      setPassword(pass);
    }
  }, [length, numberAllowed, characterAllowed]);

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed])

  const copyPassword = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <h1>Password Generator Project</h1>
      <div id="Container">
        <div className="containerDiv1">
          <input type="text" value={password} readOnly ref={passwordRef} /> 
          

          <button onClick={copyPassword}>copy</button>
        </div>

        <div className="containerDiv2">
          <input
            id="rangeLabel"
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label htmlFor="rangeLabel" className="label1">
            Length : {length}
          </label>
          <input type="checkbox" id="numberLabel" defaultChecked={numberAllowed} onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}/>

          <label htmlFor="numberLabel" className="label2">
            Numbers
          </label>
          <input type="checkbox" id="characterLabel" defaultChecked={characterAllowed} onChange={() => {
            setCharacterAllowed((prev) => !prev);
          }} />
          <label htmlFor="characterLabel" className="label3">
            Characters
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
