from fastapi import APIRouter, status, Query
from ..models.order import CreateOrderRequest, OrderTrackingResponse
from ..services.order_service import process_and_save_order, get_order_by_id_and_phone

router = APIRouter(prefix="/api", tags=["Orders & Health"])

@router.get("/health")
async def health_check():
    return {"status": "ok"}

@router.post("/orders", status_code=status.HTTP_201_CREATED)
async def create_order(payload: CreateOrderRequest):
    order = await process_and_save_order(payload)
    return order

@router.get("/orders/{order_id}", response_model=OrderTrackingResponse)
async def track_order(
    order_id: str,
    phone: str = Query(..., min_length=10, max_length=10, description="Customer 10-digit phone number for verification")
):
    order = await get_order_by_id_and_phone(order_id, phone)
    return order
