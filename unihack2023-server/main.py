from fastapi import FastAPI

# import CORS middleware 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# mongodb database connecton
import pymongo
from pymongo import MongoClient

# connect to mongodb
client = MongoClient("mongodb://localhost:27017/") # change later to string from api_key file thing idk
db = client["unihack2023"] # the database name

# create a collection
collection = db["users"]

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/api/user/{user_id}")
async def get_user_credentials(user_id):
    return {
        "user_id": "abc",
        "user_name": "Random"
    }