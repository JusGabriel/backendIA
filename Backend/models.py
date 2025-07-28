
from pydantic import BaseModel, EmailStr, Field

class ClienteIn(BaseModel):
    nombre: str = Field(..., example="Sebastian")
    apellido: str = Field(..., example="Betancourt")
    email: EmailStr = Field(..., example="weripe1522@ikanteri.com")
    password: str = Field(..., min_length=6)
    telefono: str = Field(..., example="0984523160")

class ClienteOut(BaseModel):
    id: str
    nombre: str
    apellido: str
    email: EmailStr
    telefono: str

class ClienteLogin(BaseModel):
    email: EmailStr
    password: str
