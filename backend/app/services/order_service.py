from fastapi import HTTPException
import random
import string
from datetime import datetime
from ..database import get_database
from ..models.product import find_sku_in_backend
from ..models.order import CreateOrderRequest, OrderDocument, OrderItemSnapshot

def generate_backend_order_id() -> str:
    ts = str(int(datetime.utcnow().timestamp()))[-6:]
    rand = ''.join(random.choices(string.ascii_uppercase + string.digits, k=3))
    return f"KS-{ts}{rand}"

async def process_and_save_order(payload: CreateOrderRequest):
    db = get_database()
    orders_collection = db["orders"]

    # 1. Idempotency Check
    if payload.idempotencyKey:
        existing = await orders_collection.find_one({"idempotencyKey": payload.idempotencyKey})
        if existing:
            existing.pop("_id", None)
            return existing

    if not payload.items:
        raise HTTPException(status_code=400, detail="Cart is empty.")

    subtotal = 0
    max_shipping = 0
    item_snapshots = []

    # 2. Server-side validation & Authoritative price calculation
    for item in payload.items:
        family, sku_obj = find_sku_in_backend(item.sku)
        if not family or not sku_obj:
            raise HTTPException(status_code=400, detail=f"Invalid or unknown SKU: {item.sku}")

        qty = item.quantity
        unit_price = sku_obj["websitePrice"]
        item_subtotal = unit_price * qty
        item_shipping = 0 if sku_obj["freeShipping"] else (sku_obj["shipping"] * qty)

        subtotal += item_subtotal
        max_shipping = max(max_shipping, item_shipping)

        item_snapshots.append(
            OrderItemSnapshot(
                sku=sku_obj["sku"],
                quantity=qty,
                unitPrice=unit_price,
                productNameSnapshot=family["name"],
                packSizeSnapshot=sku_obj["packSize"]
            ).model_dump()
        )

    final_total = subtotal + max_shipping
    order_id = generate_backend_order_id()

    # 3. Construct Order Document
    order_doc = OrderDocument(
        orderId=order_id,
        customer=payload.customer,
        items=item_snapshots,
        subtotal=subtotal,
        shipping=max_shipping,
        total=final_total,
        status="pending",
        idempotencyKey=payload.idempotencyKey
    )

    doc_dict = order_doc.model_dump()

    # 4. Save to MongoDB
    await orders_collection.insert_one(doc_dict)
    
    doc_dict.pop("_id", None)
    return doc_dict
