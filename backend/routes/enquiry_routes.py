from fastapi import APIRouter, Depends, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from backend.database import get_db
from backend.models.enquiry import CreateEnquiryRequest, EnquiryResponse
from backend.services.enquiry_service import create_enquiry_record

router = APIRouter(prefix="/api/enquiries", tags=["Enquiries"])


@router.post("", response_model=EnquiryResponse, status_code=status.HTTP_201_CREATED)
async def submit_enquiry(
    payload: CreateEnquiryRequest, db: AsyncIOMotorDatabase = Depends(get_db)
):
    """
    Submit a B2B, bulk, distributor, food-business, or general enquiry.
    """
    return await create_enquiry_record(db, payload)
