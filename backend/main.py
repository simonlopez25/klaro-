# pyrefly: ignore [missing-import]
from fastapi import FastAPI
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware

from app.routers.files import router as files_router

app = FastAPI(title="Klaro Backend", version="1.0")

# CORS configuration for React frontend (Vite on port 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(files_router)


@app.get("/")
def read_root() -> dict:
    """Health check endpoint."""
    return {
        "status": "Klaro API funcionando correctamente",
        "security": "100% en memoria",
    }