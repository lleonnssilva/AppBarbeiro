using ApiBarbeiro.Domain.Entities;
using ApiBarbeiro.Services.Interfaces;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Slapper;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace ApiBarbeiro.Data.Repository
{
    public class AgendaRepository : IAgendaRepository
    {
        private readonly IConfiguration _config;

        public AgendaRepository(IConfiguration config)
        {
            _config = config;
        }

        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            }
        }

        public async Task<List<Agenda>> GetByBarbeiroID(int id)
        {

            using (IDbConnection conn = Connection)
            {
                var dados = conn.Query<dynamic>(
                   "SELECT R.Id, " +
                          "R.DataAgenda, " +
                          "E.Hora AS Horarios_Hora " +
                   "FROM dbo.Agenda R " +
                   "INNER JOIN dbo.Horarios E " +
                       "ON E.IdAgenda = R.Id " +
                   "ORDER BY R.DataAgenda, E.Hora");

                AutoMapper.Configuration.AddIdentifier(
                    typeof(Agenda), "Id");


                AutoMapper.Configuration.AddIdentifier(
                   typeof(Horario), "Hora");

                List<Agenda> agendas = (AutoMapper.MapDynamic<Agenda>(dados) as IEnumerable<Agenda>).ToList();


                return agendas;
            }
        }

        public async Task<List<Agenda>> GetAll()
        {
            using (IDbConnection conn = Connection)
            {
                string sQuery = "SELECT Id,DataAgenda,Horario FROM Agenda";
                conn.Open();
                var result = await conn.QueryAsync<Agenda>(sQuery);
                return result.ToList();
            }
        }

        public async Task<Agenda> GetByID(int id)
        {
            using (IDbConnection conn = Connection)
            {
                string sQuery = "SELECT  Id,DataAgenda,Horario FROM Agenda WHERE Id= @ID";
                conn.Open();
                var result = await conn.QueryAsync<Agenda>(sQuery, new { ID = id });
                return result.FirstOrDefault();
            }
        }

        public async Task<int> Insert(AgendaServico model)
        {
            using (IDbConnection conn = Connection)
            {
                string insertQuery = @"INSERT INTO [dbo].[AgendaServico]([IdBarbeiro], [IdServico], [IdCliente], [DataAgenda], [Horario]) VALUES (@IdBarbeiro, @IdServico, @IdCliente, @DataAgenda, @Horario)";

                var result = conn.Execute(insertQuery, model);
                return result;
            }
        }

        public async Task<List<AgendaServico>> GetAgendamentoClienteID(int id)
        {

            using (IDbConnection conn = Connection)
            {
  

                var sql = "SELECT " +
                            "A.Id, " +
                            "A.Horario,  " +
                            "A.DataAgenda, " +
                            "A.IdServico,  " +
                            "A.IdBarbeiro," +
                            "A.IdCliente," +
                            "S.IdServico,  " +
                            "S.Descricao, " +
                            "S.Preco," +
                            "B.IdBarbeiro," +
                            "B.Nome, " +
                            "B.Avatar, " +
                            "B.Estrelas, " +
                             "B.distancia, " +
                              "B.latitude, " +
                               "B.longitude " +
                            " from AgendaServico A inner " +
                            " join Servicos S on S.IdServico = A.IdServico inner " +
                            " join Barbeiros B on A.IdBarbeiro = B.IdBarbeiro";
                var dados = new Dictionary<int, AgendaServico>();
                conn.Query<AgendaServico, Servico, Barbeiro, AgendaServico>(sql, (agenda, servico, barbeiro) =>
                {

                    AgendaServico servicosAgendados;
                    if (!dados.TryGetValue(agenda.Id, out servicosAgendados))
                    {
                        dados.Add(agenda.Id, servicosAgendados = agenda);
                    }


                    if (servicosAgendados.Servico == null)
                    {
                        if (servico == null)
                        {
                            servico = new Servico { Descricao = "" };
                        }
                        servicosAgendados.Servico = servico;
                    }

                    if (servicosAgendados.Barbeiro == null)
                    {
                        servicosAgendados.Barbeiro = new Barbeiro { Nome  = ""};
                    }
                    servicosAgendados.Barbeiro = barbeiro;

                    return servicosAgendados;
                },
                splitOn: "IdServico,IdBarbeiro");


                List<AgendaServico> lst = new List<AgendaServico>();
                lst.AddRange(dados.Values);
                return lst;
            }


        }
    }
}
