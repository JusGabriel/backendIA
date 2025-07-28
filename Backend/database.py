import motor.motor_asyncio

MONGO_URI = "mongodb://mongo:JqIXnWRvbqNLobljNLGYFcloiKymZfbf@mongodb.railway.internal:27017"
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client['IA']  # nombre de tu DB
clientes_collection = db['clientes']
