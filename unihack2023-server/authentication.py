import os
from dotenv import load_dotenv
from pymongo import MongoClient
from schemas.user import User


# get mongo connection details
load_dotenv()
connection_string = os.getenv("mongo_connection_string")

# create instance of mongo client
client = MongoClient(connection_string)
server_info = client.server_info()
server_info_message = f"Connected to MongoDB, Version: {server_info['version']}. There are {len(client.list_database_names())} Databases"
print(server_info_message)


print("done")

database = client.Unihack2023

users = database["Users"]


def get_user_details(uid):
    user = users.find_one({"uid": uid})
    if user is None:
        raise Exception("User does not exist")
    return user


def delete_user_by_name(name):
    users.delete_many({"name": name})


def create_user_in_database(user_data):
    key = {"uid": user_data["uid"]}
    users.update_one(key, {"$set": user_data}, upsert=True)


create_user_in_database({"name": "dumbass", "uid": "some_dogshit"})
