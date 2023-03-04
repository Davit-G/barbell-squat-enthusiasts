from pydantic import BaseModel

class User(BaseModel):
    name: str
    uid: str
    calendarId: str
    user_projects: list = []
