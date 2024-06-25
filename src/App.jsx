import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setlength] = useState(8);
  const [numallowed, setnumallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [pass, setpass] = useState("");
  const passref = useRef(null);
  const passgen = useCallback(() => {
    let pass = "", str = "ABCDEFGHIJKLMNOPQUSTUVWXYZabcdefghijklmnopqrstuvxwyz";
    if (numallowed) {
      str += "0123456789";
    }
    if (charallowed) {
      str += "!@#$%^&*_-+={}[]~`"
    }
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpass(pass)
  }, [length, numallowed, charallowed, setpass])
  const copy_clip = useCallback(() => {
    passref.current?.select()
    window.navigator.clipboard.writeText(pass);
  }, [pass])
  useEffect(() => { passgen() }, [length, numallowed, charallowed, passgen])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-white bg-red-500 p-1'>
        <h1 className='text-white text-center my-4'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
            value={pass}
            className='outline-none w-full py-1 px-3 bg-black'
            placeholder='password'
            readOnly
            ref={passref}
          />
          <button className='outline-none bg-blue-700 text-white p-4' onClick={copy_clip}>Copy</button>
        </div>
        <div className='flex justify-around'>
          <div className='flex gap-2'>
            <input type="range"
              min={6}
              max={100}
              value={length}
              id='length'
              className='cursor-pointer'
              onChange={(e) => { setlength(e.target.value) }} />
            <label htmlFor='length'>Length:{length}</label>
          </div>
          <div>
            <input type="checkbox"
              defaultChecked={numallowed}
              id='numberallow'
              onChange={(e) => {
                setnumallowed((prev) => !prev)
              }}
            />
            <label htmlFor='numberallow'>Numbers</label>
          </div>
          <div>
            <input type="checkbox"
              defaultChecked={charallowed}
              id='characterallow'
              onChange={(e) => {
                setcharallowed((prev) => !prev)
              }}
            />
            <label htmlFor='characterallow'>Characters</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
