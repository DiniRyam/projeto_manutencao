import os
from peewee import Model
from playhouse.db_url import connect

# Pega a senha com segurança diretamente do servidor da Vercel
DB_PASSWORD = os.environ.get('DB_PASSWORD', 'sua_senha_aqui_caso_rode_local')

# Monta a url de conexão com o banco supabase
DATABASE_URL = f"postgresql://postgres:{DB_PASSWORD}@db.utkvotwwqkrcvpcbgplf.supabase.co:5432/postgres"

db = connect(DATABASE_URL)

class BaseModel(Model):
    class Meta:
        database = db