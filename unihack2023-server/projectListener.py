import os
from dotenv import load_dotenv
from pymongo import MongoClient


# get mongo connection details
load_dotenv()
connection_string = os.getenv("mongo_connection_string")

# create instance of mongo client
client = MongoClient(connection_string)

database = client.Unihack2023

projects = database["Projects"]

def get_project_details(id):
    project = projects.find_one({"id": id})
    if project is None:
        raise Exception("Project does not exist")
    return projects


def delete_project_by_id(id):
    projects.delete_many({"id": id})


def create_project_in_database(project_data):
    key = {"id": project_data["id"]}
    projects.update_one(key, {"$set": project_data}, upsert=True)

def update_project(project_data):
    key = {"id": project_data["id"]}
    projects.update_one(key, {"$set": project_data}, upsert=True)
