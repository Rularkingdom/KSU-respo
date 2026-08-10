from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from .config import settings
from .database import connect_to_mongo, close_mongo_connection
from .models.order import CreateOrderRequest
from .services.order_service import process_and_save_order

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await connect_to_mongo()
    yield
    # Shutdown
    await close_mongo_connection()

app = FastAPI(
    title="Kawad Swad Order API",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health", tags=["Health"])
async def health_check():
    return {"status": "ok"}

@app.post("/api/orders", status_code=status.HTTP_201_CREATED, tags=["Orders"])
async def create_order(payload: CreateOrderRequest):
    order = await process_and_save_order(payload)
    return order
