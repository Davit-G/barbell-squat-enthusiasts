import requests
import json
from config import API_KEY

requests_session = requests.Session()
requests_session.headers.update({
    "Content-Type": "application/json",
    "Authorization": "Bearer " +  API_KEY
})
url = "https://api.openai.com/v1/chat/completions"

def build_prompt(name, desc, start_date, end_date, mile_count, part_count, loc):
    prompt = f"""I am creating a project called {name}. {desc}.
It starts at {start_date} and ends at {end_date}. I want to break this project down into {mile_count} milestones.
I want the work to be split between {part_count} participants. This project will take place at {loc}. """

    prompt += """Give me a list of subtasks that I can do to work towards this goal.
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

    prompt += f"""Please give me exactly {min(10, int(mile_count))} subtasks.
Please explicitly order the tasks."""
    
    return prompt

def parse_response(response):
    l, r = 0 , len(response) - 1
    while response[l] != '{' and l < len(response):
        l += 1
    while response[r] != '}' and r >= 0:
        r -= 1
    response = response[l : r + 1] #get only the json (if chatgpt has additional comments)

    return json.loads(response) #return as dictionary

def get_subtasks(data):
    name, desc, start_date, end_date, mile_count, part_count, loc = data['name'], data['desc'], data['start_date'], data['end_date'], data['mile_count'], data['part_count'], data['loc']
    task = build_prompt(name, desc, start_date, end_date, mile_count, part_count, loc)

    response = requests_session.post(url, json={
        "messages" : [{ "role" : "user", "content" : task }],
        "model" : "gpt-3.5-turbo"})
    response = response.json()['choices'][0]['message']['content'] #chatgpt's entire response message

    subtasks = parse_response(response)
    return subtasks 