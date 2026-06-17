from peewee import Model
from playhouse.db_url import connect

# Lê a senha do txt
with open("db_password.txt", "r") as f:
    DB_PASSWORD = f.read().strip()

# MOnta a url de conexão com o banco supabase
DATABASE_URL = f"postgresql://postgres:{DB_PASSWORD}@db.utkvotwwqkrcvpcbgplf.supabase.co:5432/postgres"

db = connect(DATABASE_URL)

class BaseModel(Model):
    class Meta:
        database = db