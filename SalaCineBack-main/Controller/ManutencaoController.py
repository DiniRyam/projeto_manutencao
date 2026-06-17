from Model.Manutencao import SolicitacaoManutencao

class ManutencaoController:
    @staticmethod
    def create(titulo: str, descricao: str):
        nova_solicitacao = SolicitacaoManutencao.create(titulo=titulo, descricao=descricao)
        return ManutencaoController._formatOutput(nova_solicitacao)

    @staticmethod
    def read():
        # Lista as solicitações da mais recente para a mais antiga
        solicitacoes = SolicitacaoManutencao.select().order_by(SolicitacaoManutencao.data_registro.desc())
        return [ManutencaoController._formatOutput(s) for s in solicitacoes]

    @staticmethod
    def _formatOutput(solicitacao) -> dict:
        return {
            'id': solicitacao.id,
            'titulo': solicitacao.titulo,
            'descricao': solicitacao.descricao,
            'status': solicitacao.status,
            'data_registro': solicitacao.data_registro.strftime("%Y-%m-%d %H:%M:%S")
        }