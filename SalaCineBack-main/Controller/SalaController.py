from peewee import DoesNotExist
from Model.Sala import Sala

class SalaController:
    # AQUI ESTAVA O ERRO: Faltava receber os novos campos na criação
    @staticmethod
    def create(numero_sala: int, local: str, capacidade: int, tipo_tela: str):
        return Sala.create(
            numero_sala=numero_sala, 
            local=local, 
            capacidade=capacidade, 
            tipo_tela=tipo_tela
        )

    @staticmethod
    def read():
        salas = Sala.select().order_by(Sala.numero_sala)
        return [SalaController._formatSalaOutput(sala) for sala in salas]

    @staticmethod
    def readById(id_sala):
        sala = Sala.get_or_none(Sala.id_sala == id_sala)
        if sala:
            return SalaController._formatSalaOutput(sala)
        return None

    @staticmethod
    def readByNumero(numero_sala):
        sala = Sala.get_or_none(Sala.numero_sala == numero_sala)
        if sala:
            return SalaController._formatSalaOutput(sala)
        return None

    @staticmethod
    def update(id_sala, **kwargs):
        try:
            if 'numero_sala' in kwargs and not isinstance(kwargs['numero_sala'], int):
                raise ValueError("numero_sala deve ser um inteiro")

            updated_sala = Sala.update(id_sala, **kwargs)
            return SalaController._formatSalaOutput(updated_sala)

        except DoesNotExist as e:
            raise ValueError(str(e))
        except Exception as e:
            raise ValueError(f"Erro ao atualizar a sala: {str(e)}")

    @staticmethod
    def delete(id_sala):
        try:
            deleted_count = Sala.delete(id_sala)
            return deleted_count > 0
        except DoesNotExist as e:
            raise ValueError(str(e))
        except Exception as e:
            raise ValueError(f"Erro ao deletar a sala: {str(e)}")

    @staticmethod
    def _formatSalaOutput(sala) -> dict:
        return {
            'id_sala': sala.id_sala,
            'numero_sala': sala.numero_sala,
            'local': sala.local,
            'capacidade': sala.capacidade,
            'tipo_tela': sala.tipo_tela
        }