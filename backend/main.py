# pyrefly: ignore [missing-import]
from fastapi import FastAPI, File, UploadFile, HTTPException
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
# pyrefly: ignore [missing-import]
import pandas as pd
# pyrefly: ignore [missing-import]
import io
import re

app = FastAPI(title="Klaro Backend", version="1.0") 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

EMAIL_DOMAIN_CORRECTIONS = {
    "gmil.com": "gmail.com",
    "gmai.com": "gmail.com",
    "gamil.com": "gmail.com",
    "gmail.co": "gmail.com",
    "gmail.cm": "gmail.com",
    "gmail.con": "gmail.com",
    "hotmial.com": "hotmail.com",
    "hotmal.com": "hotmail.com",
    "hotmail.co": "hotmail.com",
    "hotmail.cm": "hotmail.com",
    "hotmail.con": "hotmail.com",
    "outlok.com": "outlook.com",
    "outloo.com": "outlook.com",
    "outlook.co": "outlook.com",
    "outlook.cm": "outlook.com",
    "yahooo.com": "yahoo.com",
    "yaho.com": "yahoo.com",
    "yahoo.co": "yahoo.com",
}

EMAIL_COLUMN_PATTERNS = ["email", "correo", "e-mail", "mail", "correo electronico", "correo_electronico"]
NAME_COLUMN_PATTERNS = ["nombre", "name", "cliente", "client", "full name", "fullname", "nombre completo", "nombre_completo"]
PHONE_COLUMN_PATTERNS = ["telefono", "phone", "tel", "celular", "mobile", "numero", "phone number", "telefono_contacto"]


def find_column(df, patterns):
    """Busca una columna cuyo nombre coincida con alguno de los patrones."""
    col_lower_map = {col.lower().strip(): col for col in df.columns}
    for pattern in patterns:
        for lower_col, original_col in col_lower_map.items():
            if pattern in lower_col:
                return original_col
    return None


def standardize_emails(df, col):
    """Estandariza correos electronicos: minusculas, sin espacios y dominios corregidos."""
    def fix_email(email):
        if pd.isna(email) or str(email).strip() == "":
            return email
        email = str(email).lower().strip()
        if "@" in email:
            parts = email.split("@")
            if len(parts) == 2:
                local_part = parts[0]
                domain = parts[1]
                domain = EMAIL_DOMAIN_CORRECTIONS.get(domain, domain)
                return f"{local_part}@{domain}"
        return email

    df[col] = df[col].apply(fix_email)
    return df


def split_full_name(df, col):
    """Separa nombre completo en columnas Nombre y Apellido con formato title case."""
    nombres = []
    apellidos = []

    for value in df[col]:
        if pd.isna(value) or str(value).strip() == "":
            nombres.append("")
            apellidos.append("")
            continue

        parts = str(value).strip().split()
        if len(parts) == 1:
            nombres.append(parts[0].title())
            apellidos.append("")
        elif len(parts) == 2:
            nombres.append(parts[0].title())
            apellidos.append(parts[1].title())
        else:
            nombres.append(parts[0].title())
            apellidos.append(" ".join(parts[1:]).title())

    df["Nombre"] = nombres
    df["Apellido"] = apellidos
    df = df.drop(columns=[col])
    return df


def normalize_phones(df, col):
    """Normaliza numeros de telefono eliminando caracteres no numericos excepto +."""
    def clean_phone(phone):
        if pd.isna(phone) or str(phone).strip() == "":
            return phone
        phone_str = str(phone).strip()
        cleaned = re.sub(r"[^\d+]", "", phone_str)
        return cleaned

    df[col] = df[col].apply(clean_phone)
    return df

@app.get("/")
def read_root():
    return {"status": "Klaro API funcionando correctamente", "security": "100% en memoria"}


@app.post("/api/clean")
async def clean_file(file: UploadFile = File(...)):
    filename = file.filename.lower()
    contents = await file.read()
    rules_applied = []

    try:
        if filename.endswith(".csv"):
            df = pd.read_csv(io.BytesIO(contents))
        elif filename.endswith((".xlsx", ".xls")):
            df = pd.read_excel(io.BytesIO(contents))
        else:
            raise HTTPException(status_code=400, detail="Formato de archivo no compatible. Sube un CSV o Excel.")

        df = df.dropna(how="all")
        rules_applied.append("Eliminación de filas completamente vacías")

        initial_rows = len(df)
        df = df.drop_duplicates()
        duplicates_removed = initial_rows - len(df)
        rules_applied.append(f"Eliminación de duplicados ({duplicates_removed} registros removidos)")

        for col in df.select_dtypes(include=["object"]).columns:
            df[col] = df[col].astype(str).str.strip()
        rules_applied.append("Limpieza de espacios en blanco en columnas de texto")

        email_col = find_column(df, EMAIL_COLUMN_PATTERNS)
        if email_col:
            df = standardize_emails(df, email_col)
            rules_applied.append(f"Estandarización de correos electrónicos (columna: '{email_col}')")
        email_col = find_column(df, EMAIL_COLUMN_PATTERNS)
        if email_col:
            df = standardize_emails(df, email_col)
            rules_applied.append(f"Estandarización de correos electrónicos (columna: '{email_col}')")

        name_col = find_column(df, NAME_COLUMN_PATTERNS)
        if name_col:
            df = split_full_name(df, name_col)
            rules_applied.append(f"Separación de nombre completo en 'Nombre' y 'Apellido' (columna: '{name_col}')")

        phone_col = find_column(df, PHONE_COLUMN_PATTERNS)
        if phone_col:
            df = normalize_phones(df, phone_col)
            rules_applied.append(f"Normalización de teléfonos (columna: '{phone_col}')")
        preview_data = df.head(10).to_dict(orient="records")

        return {
            "filename": file.filename,
            "total_rows": len(df),
            "duplicates_removed": duplicates_removed,
            "rules_applied": rules_applied,
            "preview": preview_data,
            "message": "Archivo procesado con éxito"
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error procesando el archivo: {str(e)}")