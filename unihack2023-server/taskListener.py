import os
from dotenv import load_dotenv
from pymongo import MongoClient
from schemas.task import Task

import uuid


# get mongo connection details
load_dotenv()
connection_string = os.getenv("mongo_connection_string")

# create instance of mongo client
client = MongoClient(connection_string)
database = client.Unihack2023
tasks = database["Tasks"]

def get_task_details(id):
    task = tasks.find_one({"task_id": id})
    if task is None:
        raise Exception("Task does not exist")
    return task


def delete_task_by_id(id):
    tasks.delete_many({"task_id": id})
    

def create_task_in_database(task_data):
    key = {"task_id": task_data["task_id"]}
    tasks.update_one(key, {"$set": task_data}, upsert=True)

def create_multiple_tasks_in_database(task_data, proj_id):
    for task in task_data["subtasks"]:

        task["task_id"] = uuid.uuid4().hex
        task["proj_id"] = proj_id
        create_task_in_database(task)
    
    
def update_task_in_database(task_data):
    key = {"task_id": task_data["task_id"]}
    tasks.update_one(key, {"$set": task_data}, upsert=True)