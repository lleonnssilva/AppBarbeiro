using ApiBarbeiro.Domain.Entities;
using ApiBarbeiro.Services.Interfaces;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace ApiBarbeiro.Data.Repository
{
    public class FotoRepository : IFotoRepository
    {
        private readonly IConfiguration _config;

        public FotoRepository(IConfiguration config)
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

        public async Task<List<Foto>> GetByBarbeiroID(int id)
        {
            using (IDbConnection conn = Connection)
            {
                string sQuery = "SELECT  Id,Url FROM Fotos WHERE IdBarbeiro= @ID";
                conn.Open();
                var result = await conn.QueryAsync<Foto>(sQuery, new { ID = id });
                return result.ToList();
            }
        }

        public async Task<List<Foto>> GetAll()
        {
            using (IDbConnection conn = Connection)
            {
                string sQuery = "SELECT  Id,Url FROM Fotos FROM Servicos";
                conn.Open();
                var result = await conn.QueryAsync<Foto>(sQuery);
                return result.ToList();
            }
        }

        public async Task<Foto> GetByID(int id)
        {
            using (IDbConnection conn = Connection)
            {
                string sQuery = "SELECT  Id,Url FROM Fotos WHERE Id= @ID";
                conn.Open();
                var result = await conn.QueryAsync<Foto>(sQuery, new { ID = id });
                return result.FirstOrDefault();
            }
        }
    }
}
