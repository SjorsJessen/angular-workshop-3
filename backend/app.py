import json
import uvicorn

from typing import Any

from fastapi import FastAPI, File, Form, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


class Data(BaseModel):
    id: int
    message: str


class JsonData(BaseModel):
    int_field: int
    string_field: str
    bool_field: bool


def create_data() -> list[Data]:
    data: list[Data] = [
        Data(id=1, message="This is the first message"),
        Data(id=2, message="This is the second message"),
    ]
    return data


def create_data_as_string() -> str:
    data: list[Data] = create_data()
    json_data: str = json.dumps([data.model_dump() for data in data])
    return json_data


@app.get("/")
def read_root() -> str:
    return "Hello World!"


@app.get("/data")
def get_data_list() -> list[Data]:
    response: list[Data] = create_data()
    return response


@app.get("/data-string")
def get_data_list_as_string() -> str:
    response: str = create_data_as_string()
    return response


@app.get("/items/{item_id}")
def read_item(item_id: int) -> dict[str, int]:
    print(f"item_id: {item_id}")
    # do something with the item_id here.
    return {"item_id": item_id}


@app.post("/post-data")
async def post_data(
    int_field: int = Form(...),
    string_field: str = Form(...),
    bool_field: bool = Form(...),
) -> dict[str, Any]:
    print(
        f"int field: {int_field}, string field: {string_field}, bool field: {bool_field}"
    )
    return {
        "int field": int_field,
        "string field": string_field,
        "bool field": bool_field,
    }


@app.post("/post-json-data")
async def post_json_data(data: JsonData) -> dict[str, Any]:
    print(
        f"int field: {data.int_field}, string field: {data.string_field}, bool field: {data.bool_field}"
    )
    # do something with the Json data here.
    return {
        "int_field": data.int_field,
        "string_field": data.string_field,
        "bool_field": data.bool_field,
    }


@app.post("/upload-file")
async def upload_file(file: UploadFile = File(...)) -> dict[str, str | None]:
    contents = await file.read()
    print("Uploaded file contents: ")
    print(contents)
    # Process the file contents as needed
    return {"Processed filename": file.filename}


@app.post("/binary-data")
async def upload_binary_data(request: Request) -> dict[str, str]:
    binary_data: bytes = await request.body()
    print("Binary data: ")
    print(binary_data)
    # Process the binary data as needed
    return {"message": "Binary data uploaded successfully"}

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)