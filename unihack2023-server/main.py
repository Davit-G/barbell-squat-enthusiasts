from fastapi import FastAPI
import openai
import json
app = FastAPI()


@app.get("/")
async def getdata(a):
    return ""

@app.post("/submit")
async def submit(data : dict):
    return openai.get_subtasks(data)



