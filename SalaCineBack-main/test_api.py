import pytest
from app import app
from Model.BaseModel import db

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_api_deve_estar_online(client):
    """teste 1 para verifica se a API subiu e responde na rota de filmes"""
    resposta = client.get('/api/filmes')
    
    # Se a rota existe, não pode devolver 404
    assert resposta.status_code != 404

def test_banco_de_dados_conectado():
    """Teste 2: Garante que a conexão com o Supabase está ativa
        usando o abjedo db do pewee para ver a conexão"""
    try:
        if db.is_closed():
            db.connect()
        conectado = True
    except Exception as e:
        print(f"Erro ao conectar: {e}")
        conectado = False
        
    assert conectado is True