from pydantic import BaseModel

class Task(BaseModel):
    task_id: str
    title: str
    start_date: str
    end_date: str
    description: str | None = None
