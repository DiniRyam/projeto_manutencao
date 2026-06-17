from peewee import AutoField, CharField, TextField, DateTimeField
from Model.BaseModel import BaseModel
import datetime

class SolicitacaoManutencao(BaseModel):
    id = AutoField(primary_key=True)
    titulo = CharField(max_length=255)
    descricao = TextField()
    status = CharField(max_length=50, default="Aberta")
    data_registro = DateTimeField(default=datetime.datetime.now)
    
    class Meta:
        table_name = 'solicitacao_manutencao'