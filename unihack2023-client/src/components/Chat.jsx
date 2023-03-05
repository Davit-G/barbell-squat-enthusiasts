import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectBackend } from '../features/backend/backendSlice';
import { selectUid } from '../features/login/loginSlice';



function ChatWindow({ projectName, onceChatIsDone }) {
    const chatRef = useRef()
    const messageEnd = useRef()

    const uid = useSelector(selectUid)

    const backendURL = useSelector(selectBackend)

    
    const [answeredQuestions, setAnsweredQuestions] = useState([
        {
            question: "What is your project about?",
            answer: ""
        },
        {
            question: "When should the project begin and end?",
            answer: ""
        },
        {
            question: "Have you already started working on the project? What is your progress so far?",
            answer: ""
        },
        {
            question: "How many tasks do you want to see completed for this project? (Max: 30)",
            answer: ""
        },
        {
            question: "Is there anything else you want to add?",
            answer: ""
        }
    ])
    
    const [currentQuestion, setCurrentQuestion] = useState(0)
    
    const [chatHistory, setChatHistory] = useState([
        {
            text: "Hi, I'm ChatGPT, I'm here to help you in planning for your project",
            isUserInput: false
        },
    ])

    useEffect(() => {
        // add next question to chatHistory
        setTimeout(() => {
            setChatHistory([...chatHistory, {
                text: answeredQuestions[currentQuestion].question,
                isUserInput: false
            }])
            // scroll to bottom
            // messageEnd.current?.scrollIntoView({behavior: "smooth"})
        }, 1000)
    }, [currentQuestion])
    
    const submitMessage = (e) => {
        if (e.key === 'Enter') {
            if (e.target.value === "") return;
            
            setChatHistory([...chatHistory, {
                text: e.target.value,
                isUserInput: true
            }])
            

            // scroll to bottom
            // messageEnd.current?.scrollIntoView({behavior: "smooth"})

            // add answer to answeredQuestions
            setAnsweredQuestions(answeredQuestions.map((question, index) => {
                if (index === currentQuestion) {
                    return {
                        ...question,
                        answer: String(e.target.value)
                    }
                } else {
                    return question
                }
            }))

            e.target.value = ""
            
            // set next question
            if (currentQuestion < answeredQuestions.length - 1) {
                setCurrentQuestion(currentQuestion + 1)
                
            } else {
                // send answers to backend
                axios.post(`${backendURL}/api/project/create`, {
                    uid: uid,
                    project_name: projectName,
                    project_description: answeredQuestions[0].answer,
                    question_answers: { "data": answeredQuestions.map((question) => {
                        return {
                            question: question.question,
                            answer: question.answer
                        }
                    })}
                }).then((res) => {
                    console.log(res);

                    // receive response from backend
                    // project id

                    onceChatIsDone(res.data.project_id)

                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    }


    return (
        <>
            <div className='border-zinc-500 border-2 rounded-3xl h-[70vh] mx-auto flex flex-col justify-end p-8'>
                <div ref={chatRef} className='flex flex-col gap-2 overflow-auto scrollbar-hide h-full'> {/* Chat Window */}

                    {chatHistory.map((message, index) => {
                        return (
                            <div key={index} className='flex flex-row gap-2 w-full' style={{justifyContent: message.isUserInput ? "flex-end" : "flex-start"}}>
                                <div style={{backgroundColor: message.isUserInput ? "rgba(80,80,80,1)" : "teal"}} className='min-w-1/2 w-fit rounded-3xl p-1.5 '>
                                    <p className='text-white text-xl p-2 dark:text-gray-200'>{message.text}</p>
                                </div>
                            </div>
                        )
                    })}

                    <div ref={messageEnd} className='h-10 mt-10 p-2'></div>

                </div>
                <div className='h-15 mt-5 border-2 border-zinc-500 rounded-xl'> {/* Chat Input */}
                    <input onKeyDown={submitMessage} type="text" placeholder='Type a message...' className="border-2 w-full focus:ring-4 focus:ring-teal-500 dark:border-zinc-900 dark:bg-zinc-800 placeholder-zinc-400 dark:text-white h-10 text-lg px-5 py-[1.5rem] pr-16 rounded-lg focus:outline-none" />
                </div>
            </div>
        </>
    );
}

export default ChatWindow;