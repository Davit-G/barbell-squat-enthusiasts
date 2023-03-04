import requests
import json
from config import API_KEY

url = "https://api.openai.com/v1/chat/completions"

headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " +  API_KEY
}

def askQuestion():
    name = input("Describe your project?")
    start_date = input("What is your start date?")
    end_date = input("What is your end date?")
    mile_count = input("How many milestones would you like?")
    part_count = input("Is there any other participant?")
    loc = input("Where is this located?")
    
    return f"""
    I plan {name}. Starting on the {start_date} and ending on the {end_date}.
    There would be {part_count} participant for this project, I would like to have {mile_count} milestones and
    this project would be located at {loc}.
    """
    

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
            "description": "",
            "time":"dd/mm/yyyy"
        }```
        Please give me less than 10 subtasks.
        Please explicitly order the tasks.
        """
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
    task = build_prompt(data)

    response = requests.post(url, headers = headers, json={
        "messages" : [{ "role" : "user", "content" : task }],
        "model" : "gpt-3.5-turbo"})
    response = response.json()['choices'][0]['message']['content'] #chatgpt's entire response message

    subtasks = parse_response(response)
    return subtasks


print(get_subtasks(build_prompt(askQuestion())))