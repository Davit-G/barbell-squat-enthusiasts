import requests
import json
from config import API_KEY

import datetime

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

def generate_fake_transcript(input_answers):
    openai_input = "Here is a transcript of a conversation with a person who wants to plan a project and needs help breaking down tasks:\n"
    for conversation in input_answers:
        # conversation is the dict of question and answer
        openai_input += "ChatGPT: \"" + conversation["question"] + "\""
        openai_input += "User: \"" + conversation["answer"] + "\""
    
    openai_input += "\n\n"
    return openai_input

def build_prompt(data):
    data += """
        Give me a list of subtasks that I can do to break the project down in the context of the transcript.
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
            "date": ""
        }```
        Please give me the number of subtasks equal to the number of milestones specified in the transcript.
        Please explicitly order the tasks.
        The date is mandatory, formatted as dd/mm/yyyy, and the current date is """ + str(datetime.date.today()) + """.\n
        Make all future tasks relative to the current date.
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

def get_subtasks(input_answers):
    processed_transcript = generate_fake_transcript(input_answers)
    task = build_prompt(processed_transcript)

    response = requests.post(url, headers = headers, json={
        "messages" : [{ "role" : "user", "content" : task }],
        "model" : "gpt-3.5-turbo"})
    response = response.json()['choices'][0]['message']['content'] #chatgpt's entire response message

    subtasks = parse_response(response)
    return subtasks


# print(get_subtasks(build_prompt(askQuestion())))