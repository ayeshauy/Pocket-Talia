from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ReturnDocument
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import List, Literal
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

GOALS = ["Pre-Production Software", "Social Growth", "Docuseries Production", "Full Agency Retainer"]
BUDGETS = ["<$5k", "$5k-$10k", "$10k-$25k", "$25k+"]


class OnboardingCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    company_name: str = Field(min_length=2, max_length=160)
    role: str = Field(min_length=2, max_length=80)
    primary_goal: Literal["Pre-Production Software", "Social Growth", "Docuseries Production", "Full Agency Retainer"]
    monthly_budget: Literal["<$5k", "$5k-$10k", "$10k-$25k", "$25k+"]
    project_details: str = Field(default="", max_length=4000)

    @field_validator("full_name", "company_name", "role")
    @classmethod
    def strip_and_check(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 2:
            raise ValueError("must be at least 2 characters")
        return v


class OnboardingOut(BaseModel):
    reference: str
    full_name: str
    email: str
    company_name: str
    role: str
    primary_goal: str
    monthly_budget: str
    project_details: str
    created_at: str


@api_router.get("/")
async def root():
    return {"message": "Pocket Talia API online"}


@api_router.post("/onboarding", response_model=OnboardingOut, status_code=201)
async def create_onboarding(payload: OnboardingCreate):
    counter = await db.counters.find_one_and_update(
        {"_id": "onboarding"},
        {"$inc": {"seq": 1}},
        upsert=True,
        return_document=ReturnDocument.AFTER,
    )
    reference = f"PT-{counter['seq']:04d}"
    doc = payload.model_dump()
    doc["reference"] = reference
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.onboarding.insert_one(doc)
    return OnboardingOut(**doc)


@api_router.get("/onboarding", response_model=List[OnboardingOut])
async def list_onboarding():
    return await db.onboarding.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def seed_counter():
    await db.counters.update_one({"_id": "onboarding"}, {"$setOnInsert": {"seq": 1}}, upsert=True)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
