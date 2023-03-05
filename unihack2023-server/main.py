from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import authentication as auth
import projectListener as projListener
import taskListener as taskListener
from schemas.user import User
from schemas.project import Project
from schemas.task import Task
import uuid
import calendarController as calendarAPI
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
    id = calendarAPI.createCalendar(user.googleAccessToken)
    user.calendarId = id
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
        "googleAccessToken": user["googleAccessToken"],
        "user_projects": user["user_projects"]}


@app.get("/api/user/{user_id}/dashboard")
async def get_user_dashboard(user_id):
    try:
        # try get all projects of user
        projects_list = projListener.get_all_projects_by_uid(user_id)
        # iterate through projects and get all tasks
        for project in projects_list:
            project["tasks"] = taskListener.get_tasks_by_project_id(project["proj_id"])
        
        return {"projects": projects_list}
        
    except Exception as e:
        print(e)
        return {"status": 404}

@app.get("/api/user/{user_id}/projects")
async def get_user_projects(user_id):
    try:
        project_list = projListener.get_all_projects_by_uid(user_id)
    except Exception as e:
        print(e)
        return {"status": 404}

    return {"projects": project_list}


@app.get("/api/project/{proj_id}/tasks")
async def get_tasks(proj_id):
    tasks = taskListener.get_tasks_by_project_id(proj_id)
    return {"tasks": tasks}

@app.post("/api/project/create")
async def create_project(project: Project):
    project_data = vars(project)

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
    user = auth.get_user_details(project_data["uid"])
    token = user["googleAccessToken"]

    subtasks = openai.get_subtasks(input_answers)

    # encode a number onto each subtask called task_num
    for i in range(len(subtasks["subtasks"])):
        subtasks["subtasks"][i]["task_num"] = i + 1

    proj_id = uuid.uuid4().hex
    project_data["proj_id"] = proj_id

    projListener.create_project_in_database(project_data) # creates project in database

    create_multiple_tasks_in_database(subtasks, proj_id,token) # create the tasks that are linked to the project

    return {"status": 201, "project_id": proj_id}


def create_multiple_tasks_in_database(task_data, proj_id, calendar_id,token):
    for task in task_data["subtasks"]:
        task["proj_id"] = proj_id
        create_task(task, calendar_id,token)
    

@app.get("/api/project/{proj_id}")
async def get_project_by_id(proj_id:str):
    try:
        project = projListener.get_project_details(proj_id)
        
        return project
    except Exception as e:
        print(e)
        return {"status": 404}
    

@app.delete("/api/delete_project/{project_id}")
async def delete_project(project_id: str):
    projListener.delete_project_by_id(project_id)
    return {"status": 201}


@app.patch("/api/project/patch/{project_id}")
async def update_project(new_project: Project):
    try:
        projListener.update_project(new_project)
        return new_project
    except Exception as e:
        print(e)
        return {"status": 400}
    
async def create_task(task: Task, calendarId: str,token):
    task_data = vars(task)
    data =  calendarAPI.createEvent(token,task_data, calendarId)
    task_data["task_id"] = data["id"]
    taskListener.create_task_in_database(task_data)
    return {"status": 201}

@app.post("/api/create_task")
async def create_task(task: Task, calendarId: str):
    task_data = vars(task)
    project_data = projListener.get_project_details(task_data["proj_id"])
    user =  auth.get_user_details(project_data["uid"])
    token = user["googleAccessToken"]
    
    data =  calendarAPI.createEvent(token,task_data, calendarId)
    task_data["task_id"] = data["id"]
    taskListener.create_task_in_database(task_data)
    return {"status": 201}


@app.delete("/api/delete_task/{task_id}")
async def delete_task(task_id: str):
    
    taskListener.delete_task_by_id(task_id)
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