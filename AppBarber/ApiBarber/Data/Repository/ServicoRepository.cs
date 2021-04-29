using ApiBarbeiro.Domain.Entities;
using ApiBarbeiro.Services.Interfaces;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ApiBarbeiro.Data.Repository
{
    public class ServicoRepository : IServicoRepository
    {
        private readonly IConfiguration _config;

        public ServicoRepository(IConfiguration config)
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

        public async Task<List<Servico>> GetByBarbeiroID(int id)
        {
            using (IDbConnection conn = Connection)
            {
                string sQuery = "SELECT  IdServico,Descricao,Preco FROM Servicos WHERE IdBarbeiro= @ID";
                conn.Open();
                var result = await conn.QueryAsync<Servico>(sQuery, new { ID = id });
                return result.ToList();
            }
        }

        public async Task<List<Servico>> GetAll()
        {
            using (IDbConnection conn = Connection)
            {
                string sQuery = "SELECT  IdServico,Descricao,Preco  FROM Servicos";
                conn.Open();
                var result = await conn.QueryAsync<Servico>(sQuery);
                return result.ToList();
            }
        }

        public async Task<Servico> GetByID(int id)
        {
            using (IDbConnection conn = Connection)
            {
                string sQuery = "SELECT  Id,Descricao,Preco FROM Servicos WHERE IdServico= @ID";
                conn.Open();
                var result = await conn.QueryAsync<Servico>(sQuery, new { ID = id });
                return result.FirstOrDefault();
            }
        }
    }
}
