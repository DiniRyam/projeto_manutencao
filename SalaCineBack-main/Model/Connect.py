from Model.Filme import Filme, Genero, FilmeGenero
from Model.Sessao import Sessao
from Model.BaseModel import db
from Model.Sala import Sala
from Model.Manutencao import SolicitacaoManutencao

def initializeDB():
    try:
        db.connect()
        # A SolicitacaoManutencao foi adicionada à lista abaixo
        db.create_tables([Filme, Sala, Sessao, Genero, FilmeGenero, SolicitacaoManutencao], safe=True)
    finally:
        db.close()