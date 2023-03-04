import requests
import json

url = "https://api.openai.com/v1/chat/completions"

API_KEY = ''

headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " +  API_KEY
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
 Please explicitly order the tasks."""
    return data

def parse_response(response):
    l, r = 0 , len(response) - 1
    while response[l] != '{' and l < len(response):
        
        l += 1
    while response[r] != '}' and r >= 0:
        r -= 1
    response = response[l : r + 1] #get only the json (if chatgpt has additional comments)

    return json.loads(response) #return as dictionary

def get_subtasks(data):
    task = data["prompt"]
    task = build_prompt(task)

    response = requests.post(url, headers = headers, json={
        "messages" : [{ "role" : "user", "content" : task }],
        "model" : "gpt-3.5-turbo"})
    response = response.json()['choices'][0]['message']['content'] #chatgpt's entire response message

    subtasks = parse_response(response)
    return subtasks

