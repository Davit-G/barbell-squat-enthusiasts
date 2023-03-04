from pydantic import BaseModel

# import optional
from typing import Optional

class Task(BaseModel):
    task_id: str
    title: str
    start_date: str
    end_date: str
    description: Optional[str] = None
