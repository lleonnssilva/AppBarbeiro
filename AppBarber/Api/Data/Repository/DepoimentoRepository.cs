using ApiBarbeiro.Domain.Entities;
using ApiBarbeiro.Services.Interfaces;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ApiBarbeiro.Data.Repository
{
    public class DepoimentoRepository : IDepoimentoRepository
    {
        private readonly IConfiguration _config;

        public DepoimentoRepository(IConfiguration config)
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

        public async Task<List<Depoimento>> GetByBarbeiroID(int id)
        {
            using (IDbConnection conn = Connection)
            {
                string sQuery = "SELECT  Id,Nome,Conteudo, Nota FROM Depoimentos WHERE IdBarbeiro= @ID";
                conn.Open();
                var result = await conn.QueryAsync<Depoimento>(sQuery, new { ID = id });
                return result.ToList();
            }
        }

        public async Task<List<Depoimento>> GetAll()
        {
            using (IDbConnection conn = Connection)
            {
                string sQuery = " Id,Nome,Conteudo, Nota Depoimentos FROM Depoimentos";
                conn.Open();
                var result = await conn.QueryAsync<Depoimento>(sQuery);
                return result.ToList();
            }
        }

        public async Task<Depoimento> GetByID(int id)
        {
            using (IDbConnection conn = Connection)
            {
                string sQuery = "SELECT  Id,Nome,Conteudo, Nota FROM Depoimentos WHERE Id= @ID";
                conn.Open();
                var result = await conn.QueryAsync<Depoimento>(sQuery, new { ID = id });
                return result.FirstOrDefault();
            }
        }
    }
}
