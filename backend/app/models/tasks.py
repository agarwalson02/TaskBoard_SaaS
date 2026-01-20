import uuid
from datetime import datetime
from sqlalchemy import String, Column, Time, DateTime, Enum ,Text
import enum
from app.core.database import Base

class TaskStatus(str,enum.Enum):
    PENDING = "pending"
    IN_PROGRESS = "started"
    COMPLETED = "completed"

class Task(Base):
    __tablename__="tasks"
    id=Column(String,primary_key=True,default=lambda: str(uuid.uuid4()))
    title=Column(String(255),nullable=False)
    description=Column(Text,nullable=True)
    status=Column(Enum(TaskStatus),default=TaskStatus.PENDING)
    org_id=Column(String,nullable=False,index=True)
    created_at=Column(DateTime,default=datetime.utcnow)
    created_by=Column(String,nullable=False)
    updated_at=Column(DateTime,default=datetime.utcnow,onupdate=datetime.utcnow)


