from flask import Blueprint, request, jsonify
from Controller.ManutencaoController import ManutencaoController

manutencao_bp = Blueprint('manutencao_bp', __name__)

@manutencao_bp.route('/manutencao', methods=['POST'])
def criar_solicitacao():
    data = request.json
    if not data or not data.get('titulo') or not data.get('descricao'):
        return jsonify({'erro': 'Título e descrição são obrigatórios'}), 400
    
    try:
        nova_solicitacao = ManutencaoController.create(data['titulo'], data['descricao'])
        return jsonify(nova_solicitacao), 201
    except Exception as e:
        return jsonify({'erro': str(e)}), 500

@manutencao_bp.route('/manutencao', methods=['GET'])
def listar_solicitacoes():
    try:
        solicitacoes = ManutencaoController.read()
        return jsonify(solicitacoes), 200
    except Exception as e:
        return jsonify({'erro': str(e)}), 500