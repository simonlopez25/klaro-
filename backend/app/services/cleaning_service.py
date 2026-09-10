"""
Data cleaning and normalization service using Pandas.
"""

import re
from typing import Optional

import pandas as pd
import io

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

EMAIL_COLUMN_PATTERNS = ["email", "correo", "e-mail", "mail"]
NAME_COLUMN_PATTERNS = ["nombre", "name", "cliente", "client", "fullname"]
PHONE_COLUMN_PATTERNS = ["telefono", "phone", "tel", "celular", "mobile", "numero"]


def read_file_to_dataframe(filename: str, contents: bytes) -> pd.DataFrame:
    """Read CSV or Excel into DataFrame."""
    fn = filename.lower()
    if fn.endswith(".csv"):
        return pd.read_csv(io.BytesIO(contents))
    if fn.endswith((".xlsx", ".xls")):
        return pd.read_excel(io.BytesIO(contents))
    raise ValueError("Formato no compatible")


def find_column_by_patterns(df, patterns):
    """Find column matching any pattern."""
    col_map = {c.lower().strip(): c for c in df.columns}
    for p in patterns:
        for lc, oc in col_map.items():
            if p in lc:
                return oc
    return None


def remove_empty_rows(df):
    """Remove rows where all values are null."""
    return df.dropna(how="all")


def remove_duplicates(df):
    """Remove duplicates. Returns (df, count)."""
    initial = len(df)
    result = df.drop_duplicates()
    return result, initial - len(result)


def strip_text_columns(df):
    """Strip whitespace from text columns."""
    for c in df.select_dtypes(include=["object"]).columns:
        df[c] = df[c].astype(str).str.strip()
    return df


def standardize_emails(df, column):
    """Fix emails: lowercase, strip, correct domains."""
    def fix(e):
        if pd.isna(e) or str(e).strip() == "":
            return e
        s = str(e).lower().strip()
        if "@" in s:
            l, d = s.split("@", 1)
            return l + "@" + EMAIL_DOMAIN_CORRECTIONS.get(d, d)
        return s
    df[column] = df[column].apply(fix)
    return df


def split_full_name(df, column):
    """Split full name into Nombre/Apellido."""
    ns, ss = [], []
    for v in df[column]:
        if pd.isna(v) or str(v).strip() == "":
            ns.append("")
            ss.append("")
            continue
        p = str(v).strip().split()
        ns.append(p[0].title())
        ss.append(" ".join(p[1:]).title() if len(p) > 1 else "")
    df["Nombre"] = ns
    df["Apellido"] = ss
    return df.drop(columns=[column])


def normalize_phones(df, column):
    """Keep only digits and + in phone numbers."""
    def clean(p):
        if pd.isna(p) or str(p).strip() == "":
            return p
        return re.sub(r"[^\d+]", "", str(p).strip())
    df[column] = df[column].apply(clean)
    return df


def clean_dataframe(df):
    """Apply all cleaning rules. Returns (df, rules_applied, dupes_removed)."""
    rules = []
    df = remove_empty_rows(df)
    rules.append("Eliminacion filas vacias")
    df, dupes = remove_duplicates(df)
    rules.append(f"Eliminacion duplicados ({dupes} removidos)")
    df = strip_text_columns(df)
    rules.append("Limpieza espacios")
    ec = find_column_by_patterns(df, EMAIL_COLUMN_PATTERNS)
    if ec:
        df = standardize_emails(df, ec)
        rules.append(f"Emails: {ec}")
    nc = find_column_by_patterns(df, NAME_COLUMN_PATTERNS)
    if nc:
        df = split_full_name(df, nc)
        rules.append(f"Nombres: {nc}")
    pc = find_column_by_patterns(df, PHONE_COLUMN_PATTERNS)
    if pc:
        df = normalize_phones(df, pc)
        rules.append(f"Telefonos: {pc}")
    return df, rules, dupes


def generate_preview(df, limit=10):
    """Preview as list of dicts."""
    return df.head(limit).to_dict(orient="records")


def dataframe_to_excel_bytes(df):
    """Convert to Excel bytes."""
    buf = io.BytesIO()
    with pd.ExcelWriter(buf, engine="openpyxl") as w:
        df.to_excel(w, index=False, sheet_name="Datos Limpios")
    buf.seek(0)
    return buf.read()
