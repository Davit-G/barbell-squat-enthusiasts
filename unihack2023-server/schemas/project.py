from pydantic import BaseModel

from typing import Optional

class Project(BaseModel):
    uid: str # the owner of this project
    project_name: str
    project_description: Optional[str]
    start_date: Optional[str]
    end_date: Optional[str]
    question_answers: list[dict] = []
