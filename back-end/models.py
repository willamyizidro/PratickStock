from flask_login import UserMixin
import uuid
from decimal import Decimal
from peewee import *
import re

# BANCO DE DADOS LOCAL
DATABASE = {
    'name': 'PratickStock',
    'user': 'postgres',
    'password': 'postgres',
    'host': 'localhost',  
    'port': 5432,     
}

# servidor supabase
# DATABASE = {
#     'name': 'postgres',
#     'user': 'postgres.ormgrjxzrnttgdcwxaeq',
#     'password': 'PratickStock',
#     'host': 'aws-0-us-east-1.pooler.supabase.com',  
#     'port': 5432,          
# }





database = PostgresqlDatabase(
    DATABASE['name'],
    user=DATABASE['user'],
    password=DATABASE['password'],
    host=DATABASE['host'],
    port=DATABASE['port']
)


class BaseModel(Model):
    class Meta:
        database = database

class Role:
    ESTABELECIMENTO = 'estabelecimento'
    TECNICO = 'tecnico'


class Estabelecimento(BaseModel, UserMixin):
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    nome = CharField(max_length=100)
    cnpj = CharField(max_length=18, unique=True)
    senha = CharField(max_length=256)
    email = CharField(max_length=256)
    cidade = CharField(max_length=256)
    bairro = CharField(max_length=256)
    rua = CharField(max_length=256)
    numero = CharField(max_length=15)
    excluido = BooleanField(default=False)
    role = CharField(max_length=50, default=Role.ESTABELECIMENTO)

    def is_estabelecimento(self):
        return self.role == Role.ESTABELECIMENTO

    def __repr__(self):
        return f"Estabelecimento: {self}"


class Tecnico(BaseModel, UserMixin):
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    nome = CharField(max_length=100)
    usuario = CharField(max_length=100, unique=True)
    senha = CharField(max_length=256)
    excluido = BooleanField(default=False),
    telefone = CharField(max_length=15)
    email =  CharField(max_length=100)
    estabelecimento_id = ForeignKeyField(Estabelecimento, backref='usuarios')
    role = CharField(max_length=50, default=Role.TECNICO)

    def is_tecnico(self):
        return self.role == Role.TECNICO

    def __repr__(self):
        return f"Usuario: {self}"
    
    def getNome(self):
        return self.nome

class Cliente(BaseModel):
    id = AutoField()
    nome = CharField(max_length=100)
    endereco = CharField(max_length=200)
    email = CharField(max_length=100)
    cpf = CharField(max_length=14)
    telefone = CharField(max_length=15)
    telefoneSec = CharField(max_length=15)
    estabelecimento_id = ForeignKeyField(Estabelecimento, backref='clientes')

    def getNome(self):
        return self.nome


class CheckList(BaseModel):
    id = AutoField()
    camerafrontal = BooleanField(default=False)
    cameratraseira= BooleanField(default=False)
    altofalante= BooleanField(default=False)
    microfone= BooleanField(default=False)
    foneauricular= BooleanField(default=False)
    carregamento= BooleanField(default=False)
    vidro= BooleanField(default=False)
    touch= BooleanField(default=False)
    tela = BooleanField(default=False)
    botaodeligar= BooleanField(default=False)
    botoesdevolume= BooleanField(default=False)
    botaohome= BooleanField(default=False)
    wifi= BooleanField(default=False)
    bluethooth= BooleanField(default=False)
    sinalderede= BooleanField(default=False)





class Os(BaseModel):
    id = AutoField()
    tecnico_id = ForeignKeyField(Tecnico, backref='os')
    estabelecimento_id = ForeignKeyField(Estabelecimento, backref='os')
    dataInicial = DateField()
    dataFinal= DateField()
    modeloAparelho = CharField(max_length=30)
    imei = CharField(max_length=50)
    valorServico = DoubleField()
    valorPeça = DoubleField()
    valorTotal = DoubleField()
    checkList_id = ForeignKeyField(CheckList, backref='os')
    cliente_id = ForeignKeyField(Cliente, backref='os')




    
def obterCheckList(data):
    check = (CheckList.create(
    camerafrontal = data['camerafrontal'],
    cameratraseira= data['cameratraseira'],
    altofalante= data['altofalante'],
    microfone= data['microfone'],
    foneauricular= data['foneauricular'],
    carregamento= data['carregamento'],
    vidro= data['vidro'],
    touch= data['touch'],
    tela = data['tela'],
    botaodeligar= data['botaodeligar'],
    botoesdevolume= data['botoesdevolume'],
    botaohome= data['botaohome'],
    wifi= data['wifi'],
    bluethooth= data['bluethooth'],
    sinalderede= data['sinalderede']
    ))
    return check

# Inicialize o banco de dados e crie tabelas
def create_tables():
    with database:
        database.create_tables([Estabelecimento, Tecnico, Cliente, CheckList, Os])


def obterIdEst(usuario):
    if usuario.role == "estabelecimento":
        return usuario.id
    else:
        return usuario.estabelecimento_id
    

