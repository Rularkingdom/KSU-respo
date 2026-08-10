from fastapi import APIRouter, status
from ..models.order import CreateOrderRequest
from ..services.order_service import process_and_save_order

router = APIRouter(prefix="/api", tags=["Orders & Health"])

@router.get("/health")
async def health_check():
    return {"status": "ok"}

@router.post("/orders", status_code=status.HTTP_201_CREATED)
async def create_order(payload: CreateOrderRequest):
    order = await process_and_save_order(payload)
    return order
