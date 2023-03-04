from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import authentication as auth
import projectListener as projListener
import taskListener as taskListener
from schemas.user import User
from schemas.project import Project
from schemas.task import Task

import uuid

import openai

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/api/create_user")
async def create_user(user: User):
    """create new user in database.

    Args:
        user (User): user object

    Returns:
        dict: statuscode
    """
    user_data = vars(user)
    auth.create_user_in_database(user_data)
    return {"status": 201}


@app.get("/api/user/{user_id}")
async def get_user_credentials(user_id):
    try:
        user = auth.get_user_details(user_id)
    except Exception as e:
        print(e)
        return {"status": 404}

    return {
        "uid": user["uid"],
        "name": user["name"],
        "calendarId" : user["calendarId"],
        "user_projects": user["user_projects"]}


@app.post("/api/project/create")
async def create_project(project: Project):
    print(project)
    project_data = vars(project)
    print("project_data")
    print(project_data)

    """
    uid: str # the owner of this project
    project_name: str
    project_description: Optional[str]
    start_date: Optional[str]
    end_date: Optional[str]
    question_answers: list[dict] = []
    """

    # openapi shenanigans
    input_answers = project_data["question_answers"]["data"]
    print("input_answers")
    print(input_answers)

    subtasks = openai.get_subtasks(input_answers)
    # subtasks = {'subtasks': [{'name': 'Research Z Algorithm', 'description': 'Spend time gathering information and understanding the concepts behind the Z Algorithm', 'time': '01/06/2021'}, {'name': 'Read Z Algorithm Code', 'description': 'Spend time reading code examples and  understanding how it works', 'time': '10/06/2021'}, {'name': 'Implement Z Algorithm', 'description': 'Write out the code for the Z Algorithm on a small example', 'time': '20/06/2021'}, {'name': 'Debug Small Example', 'description': 'Test the code on the small example and debug any issues that come up', 'time': '25/06/2021'}, {'name': 'Implement Z Algorithm on Larger Example', 'description': 'Test the code on a larger example and optimize', 'time': '05/07/2021'}, {'name': 'Test and Debug Larger Example', 'description': 'Ensure the code works as expected for the larger example, and debug any issues that arise', 'time': '15/07/2021'}, {'name': 'Verify Implementation with Other Data Sets', 'description': 'Test the code on different data sets and verify that the implementation works properly', 'time': '30/07/2021'}, {'name': 'Write Documentation and Examples', 'description': 'Create documentation and example code to share with others', 'time': '07/08/2021'}, {'name': 'Publish Results', 'description': 'Publish the results of the Z Algorithm implementation in a forum or blog', 'time': '14/08/2021'}]}
    print("subtasks")
    print(subtasks)

    proj_id = uuid.uuid4().hex
    project_data["proj_id"] = proj_id
    print("project_id hash id thing")
    print(project_data["proj_id"])

    projListener.create_project_in_database(project_data) # creates project in database

    taskListener.create_multiple_tasks_in_database(subtasks, proj_id) # create the tasks that are linked to the project

    return {"status": 201, "project_id": proj_id}

@app.get("/api/project/{project_id}")
async def get_project_by_id(project_id:str):
    try:
        project = projListener.get_project_details(project_id)
        return {
        "proj_id": project["proj_id"],
        "title": project["title"],
        "start_date" : project["start_date"],
        "end_date" : project["end_date"],
        "tasks": project["tasks"]} 
    except Exception as e:
        print(e)
        return {"status": 404}
    
@app.patch("/api/project/patch/{project_id}")
async def update_project(new_project: Project):
    try:
        projListener.update_project(new_project)
        return new_project
    except Exception as e:
        print(e)
        return {"status": 400}
    
@app.post("/api/create_task")
async def create_task(task: Task):
    task_data = vars(task)
    taskListener.create_task_in_database(task_data)
    return {"status": 201}

@app.get("/api/task/{task_id}")
async def get_task_by_id(task_id):
    try:
        task = taskListener.get_task_details(task_id)
        return {
        "task_id": task["task_id"],
        "title": task["title"],
        "start_date" : task["start_date"],
        "end_date" : task["end_date"],
        "description": task["description"]}
    except Exception as e:
        print(e)
        return {"status": 404}
    
@app.patch("/api/task/patch/{task_id}")
async def update_task(new_task: Task):
    try:
        taskListener.update_task_in_database(new_task)
        return new_task
    except Exception as e:
        print(e)
        return {"status": 400}