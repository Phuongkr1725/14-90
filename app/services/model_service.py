import numpy as np
from tensorflow.keras.models import load_model

model = None
class_names = [
    "rep_cay", "sau_khoang", "bo_canh_cung",
    "sau_duc_qua", "chau_chau", "ve",
    "muoi", "ong_can_la", "sau_duc_than"
]

def load_model_once():
    global model
    if model is None:
        model = load_model("app/model/pests.h5", compile=False)

def predict(img):
    preds = model.predict(img)
    class_id = int(np.argmax(preds))
    confidence = float(np.max(preds))

    return {
        "class_id": class_id,
        "class_name": class_names[class_id],
        "confidence": confidence
    }