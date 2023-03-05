import requests
import json
from config import API_KEY

requests_session = requests.Session()
requests_session.headers.update({
    "Content-Type": "application/json",
    "Authorization": "Bearer " +  API_KEY
})
url = "https://api.openai.com/v1/chat/completions"

template= """Give me a list of subtasks that I can do to work towards this goal.
Return tasks in the json format below.
```json
{
    'subtasks': [subtask]
}```
where each subtask in "subtasks" is a json object with the format
```json
\{
    "name": "",
    "description": "",
    "time":"dd/mm/yyyy"
}```"""

#Please give me exactly {int(mile_count)} subtasks.
#Please explicitly order  tasks."""

def parse_response(response):
    l, r = 0 , len(response) - 1
    while response[l] != '{' and l < len(response):
        l += 1
    while response[r] != '}' and r >= 0:
        r -= 1
    response = response[l : r + 1] #get only the json (if chatgpt has additional comments)

    return json.loads(response) #return as dictionary

def get_subtasks(data):
    messages = [{ "role" : "user", "content" : f"{data['projectName']}" }]
    for qa in data["question_Aanswers"]:
        messages += [{ "role" : "assistant", "content" : f"{qa['question']}"}]
        messages += [{ "role" : "user", "content" : f"{qa['answer']}"}]

    messages += [{ "role" : "user", "content" : template}]
    response = requests_session.post(url, json={
        "messages" : messages,
        "model" : "gpt-3.5-turbo"})
    response = response.json()['choices'][0]['message']['content'] #chatgpt's entire response message

    subtasks = parse_response(response)
    return subtasks