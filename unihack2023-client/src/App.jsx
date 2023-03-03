import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import ReactiveThing from './ReactiveThing'

function App() {
    const [count, setCount] = useState(0)
    const [count2, setCount2] = useState(0)
    const [count3, setCount3] = useState(0)

    return (
        <div className="">
            <h1 className=''>{count}</h1>
            <button className='p-2 m-2 text-red-500 border-black hover:text-green-500 hover:text-6xl border-1' onClick={() => {setCount(count + 1)}}>ighsohf</button>
            <button className='p-2 m-2 border-black border-1' onClick={() => {setCount2(count2 + 1)}}>ighsohf</button>
            <button className='p-2 m-2 border-black border-1' onClick={() => {setCount3(count3 + 1)}}>ighsohf</button>
            
            <ReactiveThing text="soidjgoij" 
                count={count}
                count2={count2}
                count3={count3}
            />
        </div>
    )
}

export default App
