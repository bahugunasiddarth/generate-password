import { useCallback, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&*()";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllow, charAllow, setPassword]);

  const copy = useRef(null);

  const copytoclipboard = useCallback(() => {
    copy.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 text-white w-96 p-6 rounded-xl shadow-lg">
        <h2 className="text-center text-lg mb-4">Password Generator</h2>

        <input
          type="text"
          placeholder="Password"
          value={password}
          className="w-full p-3 bg-white text-gray-600 rounded-lg shadow-sm outline-none"
          readOnly
          ref={copy}
        />

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={passwordgenerator}
            className="w-24 p-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none">
            Generate
          </button>

          <button
            onClick={copytoclipboard}
            className="w-24 p-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 focus:outline-none">
            Copy
          </button>
        </div>

        <div className="mt-4 flex items-center">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
          <label className="ml-2 text-white">Length: {length}</label>
        </div>

        <div className="mt-4 text-white">
          <label>
            <input
              type="checkbox"
              checked={numAllow}
              onChange={() => setNumAllow(!numAllow)}
              className="mr-2"
            />
            Include Numbers
          </label>
        </div>

        <div className="mt-2 text-white">
          <label>
            <input
              type="checkbox"
              checked={charAllow}
              onChange={() => setCharAllow(!charAllow)}
              className="mr-2"
            />
            Include Special Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
