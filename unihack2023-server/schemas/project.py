from pydantic import BaseModel


class Project(BaseModel):
    proj_id: str
    title: str
    start_date: str
    end_date: str
    tasks: list(str) = []
