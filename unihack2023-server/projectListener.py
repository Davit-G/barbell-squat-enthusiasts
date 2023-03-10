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
    project = projects.find_one({"proj_id": id}, {"_id": 0})
    if project is None:
        raise Exception("Project does not exist")
    return project


def delete_project_by_id(id):
    projects.delete_many({"proj_id": id})


def create_project_in_database(project_data):
    key = {"proj_id": project_data["proj_id"]}
    projects.update_one(key, {"$set": project_data}, upsert=True)

def update_project(project_data):
    key = {"proj_id": project_data["proj_id"]}
    projects.update_one(key, {"$set": project_data}, upsert=True)

def get_all_projects_by_uid(uid):
    projects_list = projects.find({"uid": uid}, {"_id": 0})
    return list(projects_list)
