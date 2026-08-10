from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime

class CustomerSchema(BaseModel):
    fullName: str = Field(..., min_length=1, max_length=100)
    phone: str = Field(..., pattern=r"^[6-9]\d{9}$")
    email: EmailStr
    address: str = Field(..., min_length=1, max_length=300)
    city: str = Field(..., min_length=1, max_length=100)
    state: str = Field(..., min_length=1, max_length=100)
    pincode: str = Field(..., pattern=r"^\d{6}$")

class CartItemInput(BaseModel):
    sku: str = Field(..., min_length=1)
    quantity: int = Field(..., ge=1, le=100)

class CreateOrderRequest(BaseModel):
    customer: CustomerSchema
    items: List[CartItemInput]
    idempotencyKey: Optional[str] = None

class OrderItemSnapshot(BaseModel):
    sku: str
    quantity: int
    unitPrice: int
    productNameSnapshot: str
    packSizeSnapshot: int

class OrderDocument(BaseModel):
    orderId: str
    customer: CustomerSchema
    items: List[OrderItemSnapshot]
    subtotal: int
    shipping: int
    total: int
    status: str = "pending"
    idempotencyKey: Optional[str] = None
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)
