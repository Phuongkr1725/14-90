from fastapi import APIRouter, UploadFile, File
import shutil, os, uuid, json

from app.services.model_service import predict
from app.utils.image import preprocess_image

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# load pest info
with open("app/data/pests.json", encoding="utf-8") as f:
    pest_data = json.load(f)


@router.post("/detect")
async def detect(file: UploadFile = File(...)):
    try:
        if not file.content_type.startswith("image/"):
            return {"success": False, "error": "Invalid file type"}

        filename = f"{uuid.uuid4()}_{file.filename}"
        path = os.path.join(UPLOAD_DIR, filename)

        with open(path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        img = preprocess_image(path)
        result = predict(img)

        os.remove(path)

        info = pest_data.get(result["class_name"], {})

        return {
            "success": True,
            "prediction": result,
            "info": info
        }

    except Exception as e:
        return {"success": False, "error": str(e)}