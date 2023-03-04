from fastapi import FastAPI
import openai
app = FastAPI()

@app.post("/submit")
async def submit(data : dict):
    return openai.get_subtasks(data)