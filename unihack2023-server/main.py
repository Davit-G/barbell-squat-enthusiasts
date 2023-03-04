from fastapi import FastAPI
import authentication as auth
from schemas import user

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/api/create_user")
async def create_user(user: user.User):
    print(user.name)
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
        "user_projects": []}
