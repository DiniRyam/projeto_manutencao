from peewee import AutoField, IntegerField, CharField, DoesNotExist
from Model.BaseModel import BaseModel

class Sala(BaseModel):
    id_sala = AutoField(primary_key=True)
    numero_sala = IntegerField(unique=True)
    local = CharField(max_length=100)
    # AQUI ESTÃO OS NOVOS CAMPOS
    capacidade = IntegerField()
    tipo_tela = CharField(max_length=50)

    # passando capacidade e tipo_tela
    @classmethod
    def create(cls, numero_sala: int, local: str, capacidade: int, tipo_tela: str):
        return super().create(
            numero_sala=numero_sala,
            local=local,
            capacidade=capacidade,
            tipo_tela=tipo_tela
        )

    @classmethod
    def readByNumero(cls, numero_sala: int):
        return cls.get_or_none(cls.numero_sala == numero_sala)

    @classmethod
    def readIdSala(cls):
        return cls.id_sala

    @classmethod
    def update(cls, id_sala, **kwargs):
        with cls._meta.database.atomic():
            query = super().update(**kwargs).where(cls.id_sala == id_sala)
            updated = query.execute()

            if updated == 0:
                raise DoesNotExist("Sala não foi encontrada")

            return cls.get(cls.id_sala == id_sala)

    @classmethod
    def delete(cls, id_sala):
        with super()._meta.database.atomic():
            sala = cls.get_or_none(cls.id_sala == id_sala)
            if not sala:
                raise DoesNotExist("Sala foi não encontrada")

            query = super().delete().where(cls.id_sala == id_sala)
            return query.execute()