import React, { useRef, useState } from 'react'
import logo from './logo.svg'
import { exerciseData } from './data/exercises.js'
import './App.css'
import produce from 'immer'

interface ISentence {
  rus: string
  eng: string
  showEng?: boolean
}

function App() {
  const [exercises, setExercises] = useState(exerciseData)

  const handlerShowRus = ({ exerciseIdx, idx }: { exerciseIdx: number; idx: number }) => {
    return () => {
      const newState = JSON.parse(JSON.stringify(exercises))
      let sentence = newState[exerciseIdx][idx]
      if (sentence.showEng) {
        sentence.showEng = false
      } else {
        sentence.showEng = true
      }
      setExercises(newState)
    }
  }

  return (
    <div className=''>
      <header className='header'></header>
      <main className=''>
        <div className='page-wrapper'>
          <div className='container'>
            {exercises.map((exersice, exerciseIdx) => {
              return (
                <div key={`exericise-${exerciseIdx}`} className='exercise-wrapper'>
                  Exercise {exerciseIdx + 1}.
                  <div>
                    {exersice.map((el: ISentence, idx) => {
                      return (
                        <div key={`s-${idx}`} className='sentence-wrapper'>
                          <div onClick={handlerShowRus({ exerciseIdx, idx })} className='sentence-item'>
                            {idx + 1}. {el['rus']}
                          </div>

                          {el.showEng && (
                            <div className='sentence-item eng'>
                              {idx + 1}. {el['eng']}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
