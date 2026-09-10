"""
File processing router for Klaro.

Provides endpoints for uploading, cleaning, and downloading data files.
"""

from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse

# pyrefly: ignore [missing-import]
from app.services.cleaning_service import (
    clean_dataframe,
    dataframe_to_excel_bytes,
    generate_preview,
    read_file_to_dataframe,
)

router = APIRouter(prefix="/api", tags=["files"])


@router.post("/clean")
async def clean_file(file: UploadFile = File(...)) -> dict:
    """
    Upload and clean a CSV or Excel file.

    Applies data cleaning rules including:
    - Removal of empty rows and duplicates
    - Email standardization
    - Name splitting
    - Phone normalization

    Args:
        file: Uploaded CSV or Excel file.

    Returns:
        JSON with cleaning results and preview data.

    Raises:
        HTTPException: 400 for unsupported formats, 500 for processing errors.
    """
    filename = file.filename.lower()
    contents = await file.read()

    try:
        df = read_file_to_dataframe(filename, contents)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error leyendo el archivo: {str(e)}"
        )

    try:
        df, rules_applied, duplicates_removed = clean_dataframe(df)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error procesando el archivo: {str(e)}"
        )

    preview = generate_preview(df)

    return {
        "filename": file.filename,
        "total_rows": len(df),
        "duplicates_removed": duplicates_removed,
        "rules_applied": rules_applied,
        "preview": preview,
        "message": "Archivo procesado con éxito",
    }


@router.post("/download-excel")
async def download_excel(file: UploadFile = File(...)) -> StreamingResponse:
    """
    Upload a file and return the cleaned data as an Excel download.

    Args:
        file: Uploaded CSV or Excel file.

    Returns:
        StreamingResponse with the cleaned Excel file.

    Raises:
        HTTPException: 400 for unsupported formats, 500 for processing errors.
    """
    filename = file.filename.lower()
    contents = await file.read()

    try:
        df = read_file_to_dataframe(filename, contents)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error leyendo el archivo: {str(e)}"
        )

    try:
        df, _, _ = clean_dataframe(df)
        excel_bytes = dataframe_to_excel_bytes(df)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generando el archivo Excel: {str(e)}"
        )

    output_filename = f"limpio_{file.filename.rsplit('.', 1)[0]}.xlsx"

    return StreamingResponse(
        iter([excel_bytes]),
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={
            "Content-Disposition": f'attachment; filename="{output_filename}"'
        },
    )
