from pydantic import BaseModel

from typing import Optional

class User(BaseModel):
    name: str
    uid: str
    googleAccessToken: str
    calendarId: Optional[str]
    user_projects: list = []
