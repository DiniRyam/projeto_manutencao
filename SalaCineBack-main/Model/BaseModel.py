import os
from peewee import Model
from playhouse.db_url import connect

# Pega a URL de conexão completa da vercel
DATABASE_URL = os.environ.get('DATABASE_URL')

db = connect(DATABASE_URL)

class BaseModel(Model):
    class Meta:
        database = db