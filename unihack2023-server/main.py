from fastapi import FastAPI
import requests
app = FastAPI()



url = "https://api.openai.com/v1/engines/davinci-codex/completions"

headers = {
    "Content-Type": "application/json",
    "Authorization": "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"
}

data = {
    "prompt": "Hello,"
}

def build_prompt(data):
    data += """
    Give me a list of subtasks that I can do to work towards this goal.
    Return tasks in the json format below.

        ```json
        {
            "subtasks": [subtask]
        }```

        where each subtask in "subtasks" is a json object with the format
        ```json
        {
            "name": "",
            "description": ""
        }```

        Please give me less than 10 subtasks.
        Please explicitly order the tasks.
    """
    return data

@app.post("/submit")
async def submit(data):
    #assuming data is just string containing data?
    data = build_prompt(data)
    response = requests.post(url, headers=headers, json={"prompt" : data})

    print(response)

    return data

