from pydantic import BaseModel


class Reminder(BaseModel):
    type: str
    minutes: int
