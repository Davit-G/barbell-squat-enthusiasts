from pydantic import BaseModel


class User(BaseModel):
    name: str
    uid: str
    # user_projects: list(Project) = []
