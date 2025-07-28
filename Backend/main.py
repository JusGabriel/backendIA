from fastapi import FastAPI, HTTPException, Depends, status, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from models import ClienteIn, ClienteOut, ClienteLogin
from database import clientes_collection
from auth import hash_password, verify_password, create_access_token, verify_token
from bson import ObjectId
from typing import Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Helper para obtener usuario por token
async def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")
    user = await clientes_collection.find_one({"_id": ObjectId(payload.get("user_id"))})
    if user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    user["id"] = str(user["_id"])
    return user

@app.post("/register", response_model=ClienteOut)
async def register(cliente: ClienteIn):
    # Verificar si email ya existe
    if await clientes_collection.find_one({"email": cliente.email}):
        raise HTTPException(status_code=400, detail="Email ya registrado")
    cliente_dict = cliente.dict()
    cliente_dict["password"] = hash_password(cliente.password)
    res = await clientes_collection.insert_one(cliente_dict)
    cliente_dict["id"] = str(res.inserted_id)
    # No devolver contraseña
    cliente_dict.pop("password")
    return cliente_dict

@app.post("/login")
async def login(credentials: ClienteLogin):
    user = await clientes_collection.find_one({"email": credentials.email})
    if not user:
        raise HTTPException(status_code=401, detail="Email o contraseña incorrectos")
    if not verify_password(credentials.password, user["password"]):
        raise HTTPException(status_code=401, detail="Email o contraseña incorrectos")
    token = create_access_token({"user_id": str(user["_id"])})
    return {"access_token": token, "token_type": "bearer"}

@app.post("/logout")
async def logout(token: Optional[str] = Header(None)):
    # En JWT no se "invalida" el token, pero podrías manejar blacklist
    return {"message": "Sesión cerrada"}

@app.get("/me", response_model=ClienteOut)
async def read_users_me(current_user=Depends(get_current_user)):
    current_user.pop("password", None)
    current_user["id"] = str(current_user["_id"])
    return current_user

