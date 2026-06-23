import pytest
# Importa o seu servidor Flask do arquivo principal (app.py)
from app import app 

@pytest.fixture
def client():
    """o flask configura tipo um cliente falso, pra nao precisar usar o servidor real"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_api_deve_estar_online(client):
    """ teste 1 para ver se o sistema sobe e responde"""
    # tenta acessar a rota principal dos filmes
    resposta = client.get('/filme')
    
    # se conseguir acessar, o erro 404 nao deve existir 
    assert resposta.status_code != 404

def test_banco_de_dados_conectado():
    """Teste 2: Garante que a conexão com o Supabase (PostgreSQL) está ativa e respondendo"""
    from Model.Connect import Connect
    
    try:
        # Tenta forçar a abertura da conexão (reutiliza se já estiver aberta)
        Connect.connect(reuse_if_open=True)
        
        # Executa a query mais leve possível para testar a comunicação real
        cursor = Connect.execute_sql('SELECT 1;')
        resultado = cursor.fetchone()
        
        # Garante que o banco respondeu com o número 1
        assert resultado[0] == 1
        
    except Exception as erro:
        # Se falhar (senha errada, Supabase fora do ar, etc), o pytest falha de forma clara
        import pytest
        pytest.fail(f"Falha crítica: Não foi possível conectar ao Supabase. Erro: {erro}")
        
    finally:
        # Fecha a conexão no final do teste para não deixar conexões 'fantasmas' travando o banco
        if not Connect.is_closed():
            Connect.close()