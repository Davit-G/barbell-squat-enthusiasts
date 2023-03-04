from pydantic import BaseModel

class User(BaseModel):
    name: str
    uid: str
    calendar_id: str
    user_projects: list = []
