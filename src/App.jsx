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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 animate-floating-gradient">
      <div className="bg-gray-800 text-white w-full sm:w-96 p-8 rounded-2xl shadow-xl transition-all duration-300 ease-in-out">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-100">Password Generator</h2>

        <input
          type="text"
          placeholder="Generated Password"
          value={password}
          className="w-full p-4 bg-gray-100 text-gray-800 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          readOnly
          ref={copy}
        />

        <div className="flex justify-between items-center mt-6 space-x-4">
          <button
            onClick={passwordgenerator}
            className="w-full sm:w-32 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none transition-all duration-200 ease-in-out">
            Generate
          </button>

          <button
            onClick={copytoclipboard}
            className="w-full sm:w-32 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 focus:outline-none transition-all duration-200 ease-in-out">
            Copy
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className="w-full bg-gray-600 rounded-lg cursor-pointer transition-all duration-200 ease-in-out"
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
          <label className="ml-4 text-white font-semibold">Length: {length}</label>
        </div>

        <div className="mt-6 space-y-3">
        <label className="flex items-center text-white font-semibold">
            <input
              type="checkbox"
              checked={numAllow}
              onChange={() => setNumAllow(!numAllow)}
              className="w-6 h-6 rounded-full border-2 border-gray-400 bg-gray-800 checked:bg-blue-500 checked:border-blue-500 focus:outline-none cursor-pointer transition-all duration-200 ease-in-out"
            />
            <span className="ml-3">Include Numbers</span>
          </label>

          <label className="flex items-center text-white font-semibold">
            <input
              type="checkbox"
              checked={charAllow}
              onChange={() => setCharAllow(!charAllow)}
              className="w-6 h-6 rounded-full border-2 border-gray-400 bg-gray-800 checked:bg-green-500 checked:border-green-500 focus:outline-none cursor-pointer transition-all duration-200 ease-in-out"
            />
            <span className="ml-3">Include Special Characters</span>
          </label>

        </div>
      </div>
    </div>
  );
}

export default App;
