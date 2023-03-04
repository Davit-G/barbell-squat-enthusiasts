from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import authentication as auth
import projectListener as projListener
import taskListener as taskListener
from schemas.user import User
from schemas.project import Project
from schemas.task import Task

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


@app.post("/api/create_project")
async def create_project(project: Project):
        
    project_data = await vars(project)

    """
    uid: str # the owner of this project
    project_name: str
    project_description: Optional[str]
    start_date: Optional[str]
    end_date: Optional[str]
    question_answers: list[dict] = []
    """

    # openapi shenanigans
    input_answers = project_data["question_answers"]

    openai.get_subtasks()

    projListener.create_project_in_database(project_data)
    return {"status": 201}

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