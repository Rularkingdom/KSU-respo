from datetime import datetime
import random
import string
from fastapi import HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from backend.models.enquiry import CreateEnquiryRequest, EnquiryInDB, EnquiryResponse


def generate_enquiry_id() -> str:
    letters = "".join(random.choices(string.ascii_uppercase, k=2))
    digits = "".join(random.choices(string.digits, k=6))
    return f"KS-ENQ-{letters}{digits}"


async def create_enquiry_record(
    db: AsyncIOMotorDatabase, payload: CreateEnquiryRequest
) -> EnquiryResponse:
    # Validate Indian phone number format (basic check for 10-15 digits, digits only or with + prefix)
    cleaned_phone = "".join(c for c in payload.phone if c.isdigit() or c == "+")
    if len(cleaned_phone.replace("+", "")) < 10:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please provide a valid Indian phone number (at least 10 digits).",
        )

    # Validate businessName for B2B types if required
    if payload.type in ["bulk", "distributor", "food-business"] and not payload.businessName:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Business name is required for business enquiries.",
        )

    enquiry_id = generate_enquiry_id()
    
    # Ensure uniqueness of enquiryId
    while await db.enquiries.find_one({"enquiryId": enquiry_id}):
        enquiry_id = generate_enquiry_id()

    now = datetime.utcnow()

    enquiry_doc = EnquiryInDB(
        enquiryId=enquiry_id,
        type=payload.type,
        businessName=payload.businessName.strip() if payload.businessName else None,
        contactPerson=payload.contactPerson.strip(),
        phone=cleaned_phone,
        email=payload.email.strip().lower(),
        businessType=payload.businessType.strip() if payload.businessType else None,
        location=payload.location.strip(),
        productsOfInterest=payload.productsOfInterest.strip() if payload.productsOfInterest else None,
        quantity=payload.quantity.strip() if payload.quantity else None,
        message=payload.message.strip(),
        createdAt=now,
        status="new",
    )

    try:
        await db.enquiries.insert_one(enquiry_doc.dict())
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to record enquiry. Please try again later.",
        )

    return EnquiryResponse(
        success=True,
        enquiryId=enquiry_id,
        message="Your enquiry has been received. We'll be in touch soon.",
        createdAt=now.isoformat(),
    )
