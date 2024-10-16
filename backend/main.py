#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re
from fastapi import Body, FastAPI, status
from fastapi.exceptions import HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn as uv

from warnings import filterwarnings

from utils.hugginfaceTest import GenerateText
from models.promtschema import PromtSchema

filterwarnings("always")
filterwarnings("ignore")


__version__ = "0.0.1"


origins = ["http://localhost", "http://localhost:5173"]


app = FastAPI(title="Text Generation", description="""# 🔋 Text Generation Backend API Service""", version=__version__)
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])


# In memory / temporary database
database = dict()


@app.get("/")
async def home() -> dict[str, str]:
  return { "message": "success" }


@app.get("/data")
async def datalog() -> dict[str, str]:
  return database


@app.post("/text-generation")
async def generate(input: PromtSchema = Body(...)):
  text: str = input.prompt
  if len(text) < 1 or text is None:
    raise HTTPException(detail="Invalid prompt", status_code=status.HTTP_400_BAD_REQUEST)

  model = GenerateText(prompt = text)
  generated_text = clean_text_response(text = model.generate_text())
  database[text] = generated_text 

  return { 'promt': text, 'generated_text': generated_text }


def clean_text_response(text: str) -> str:
  if not text: 
    return "< No input string passed >"
  text = re.sub(r'\n+', ' ', text)
  text = re.sub(r'(\b[A-Z][^\.!?]*[\.!?])\s*(?=\1)', '', text)
  text = re.sub(r'\s+', ' ', text).strip()
  return text


if __name__ == "__main__":
  uv.run("main:app", reload=True, port=8080)
