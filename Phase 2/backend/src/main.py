from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.tasks import router as tasks_router
from .api.auth import router as auth_router
from .api.user import router as user_router
from .config.database import engine
from .models.task import Task
from .models.user import User
from sqlmodel import SQLModel
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("Creating database tables...")
    # Create all tables
    SQLModel.metadata.create_all(bind=engine)
    print("Database tables created.")
    yield
    # Shutdown
    print("Shutting down...")


app = FastAPI(title="Todo API", lifespan=lifespan)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:3002",
        "http://127.0.0.1:3003"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(tasks_router, prefix="/api/v1")
app.include_router(auth_router, prefix="/api/v1")
app.include_router(user_router, prefix="/api/v1")


@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo API!"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}