from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


scaler = joblib.load('models/scaler.pkl')
model = joblib.load('models/svm_model_noCV.pkl')


class StudentData(BaseModel):
    Basic_Demos_Age: float
    Physical_Height: float
    Physical_Weight: float
    IAT_IAT_01: float
    IAT_IAT_02: float
    IAT_IAT_03: float
    IAT_IAT_04: float
    IAT_IAT_05: float
    IAT_IAT_06: float
    IAT_IAT_07: float
    IAT_IAT_08: float
    IAT_IAT_09: float  
    IAT_IAT_10: float
    IAT_IAT_11: float
    IAT_IAT_12: float
    IAT_IAT_13: float
    IAT_IAT_14: float
    IAT_IAT_15: float
    IAT_IAT_16: float
    IAT_IAT_17: float
    IAT_IAT_18: float
    IAT_IAT_19: float
    IAT_IAT_20: float
    PreInt_EduHx_computerinternet_hoursday: float

# 5. Prediction Endpoint
@app.post("/predict")
def predict(data: StudentData):
    data_dict = data.dict()
    source = {
        "Basic_Demos-Age": data_dict['Basic_Demos_Age'],
        "Physical-Height": data_dict['Physical_Height'],
        "Physical-Weight": data_dict['Physical_Weight'],
        "IAT-IAT_01": data_dict['IAT_IAT_01'],
        "IAT-IAT_02": data_dict['IAT_IAT_02'],
        "IAT-IAT_03": data_dict['IAT_IAT_03'],
        "IAT-IAT_04": data_dict['IAT_IAT_04'],
        "IAT-IAT_05": data_dict['IAT_IAT_05'],
        "IAT-IAT_06": data_dict['IAT_IAT_06'],
        "IAT-IAT_07": data_dict['IAT_IAT_07'],
        "IAT-IAT_08": data_dict['IAT_IAT_08'],
        "IAT-IAT_09": data_dict['IAT_IAT_09'],
        "IAT-IAT_10": data_dict['IAT_IAT_10'],
        "IAT-IAT_11": data_dict['IAT_IAT_11'],
        "IAT-IAT_12": data_dict['IAT_IAT_12'],
        "IAT-IAT_13": data_dict['IAT_IAT_13'],
        "IAT-IAT_14": data_dict['IAT_IAT_14'],
        "IAT-IAT_15": data_dict['IAT_IAT_15'],
        "IAT-IAT_16": data_dict['IAT_IAT_16'],
        "IAT-IAT_17": data_dict['IAT_IAT_17'],
        "IAT-IAT_18": data_dict['IAT_IAT_18'],
        "IAT-IAT_19": data_dict['IAT_IAT_19'],
        "IAT-IAT_20": data_dict['IAT_IAT_20'],
        "PreInt_EduHx-computerinternet_hoursday": data_dict['PreInt_EduHx_computerinternet_hoursday'],
    }

    input_data = pd.DataFrame([source])
    
    input_data['Physical-Height'] = input_data['Physical-Height']/2.54  # Convert cm to inches
    input_data['Physical-Weight'] = input_data['Physical-Weight']*2.20462  # Convert kg to pounds
    iat_col = [col for col in input_data.columns if 'IAT-IAT_' in col]
    index_col = ['Basic_Demos-Age', 'Physical-Height', 'Physical-Weight', 'IAT-IAT_01','IAT-IAT_02','IAT-IAT_03','IAT-IAT_04','IAT-IAT_05',
             'IAT-IAT_06','IAT-IAT_07','IAT-IAT_08','IAT-IAT_09','IAT-IAT_10','IAT-IAT_11','IAT-IAT_12',
             'IAT-IAT_13','IAT-IAT_14','IAT-IAT_15','IAT-IAT_16','IAT-IAT_17','IAT-IAT_18','IAT-IAT_19',
             'IAT-IAT_20', 'IAT-IAT_Total', 'PreInt_EduHx-computerinternet_hoursday']
    input_data['IAT-IAT_Total'] = input_data[iat_col].sum(axis=1)
    input_data = input_data.reindex(columns=index_col)
    # transformation
    input_data_scaled = scaler.transform(input_data)
    # Predict
    prediction = model.predict(input_data_scaled)[0]
    
    # Get Probability (optional, for confidence score)
    # Check if your model supports predict_proba
    probability = model.predict_proba(input_data_scaled)[0]


    return {
        "prediction": int(prediction),
        "probability": probability.tolist(),
    }

@app.get("/")
def read_root():
    return {"message": "Welcome to the Student Performance Prediction API!"}
