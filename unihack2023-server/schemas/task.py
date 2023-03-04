from pydantic import BaseModel

class Task(BaseModel):
    task_id: str
    title: str
    start_date: str
    end_date: str
    desc: str | None = None
    location: str | None = None
