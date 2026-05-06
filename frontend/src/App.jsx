import { useEffect, useState } from 'react'
import axios from "axios"
import "./App.css"

function App() {
  const [inputText, setInputText] = useState("")
  const [goals, setGoals] = useState([])

  useEffect(() => {
    async function fetchGoals() {
      const n = await axios.get("http://localhost:4000/goals")
      console.log(n.data)
      setGoals(n.data)
    }
    fetchGoals()
  }, [])

  async function removeGoal(id) {
    try {
      await axios.delete(`http://localhost:4000/goals/${id}`)
      const tempGoals = goals.filter((goal) => goal._id != id)
      setGoals(tempGoals)
    } catch (err) {
      console.error(err)
    }
  }

  async function addGoal(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/goals", { message: inputText })
      const temp = [...goals, res.data];
      setGoals(temp)
      setInputText("")
    } catch (err) {
      console.error(err)
    }
  }


  return (
    <div>
      <form className='w-[80%] max-w-4xs flex flex-col items-center mx-auto mt-20' onSubmit={addGoal}>
        <input type='text' placeholder='Enter Your Goal' className='w-[80%] text-center rounded-3xl h-10 border-2 outline-none' required onChange={(e) => {
          setInputText(e.target.value)
        }} value={inputText} />
        <button type='submit' className='mt-4 bg-green-500 rounded-3xl text-white px-5 py-2 hover:bg-green-600 cursor-pointer'>Add Goal</button>
      </form>
      <div className='w-[80%] max-w-4xs flex flex-col mx-auto mt-8 h-full'>
        {
          goals.map((goal, i) => (
            <div key={i} className="text-white text-[20px] flex justify-center bg-cyan-600 p-3 mb-3 rounded-3xl cursor-pointer hover:bg-cyan-700" onClick={() => removeGoal(goal._id)}>
              {goal.message}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
