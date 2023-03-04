from pydantic import BaseModel
from task import Task


class Project(BaseModel):
    proj_id: str
    title: str
    tasks: list(Task) = []
