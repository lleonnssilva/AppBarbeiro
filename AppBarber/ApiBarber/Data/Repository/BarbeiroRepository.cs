using ApiBarbeiro.Domain.Entities;
using ApiBarbeiro.Services.Interfaces;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace ApiBarbeiro.Data.Repository
{
    public class BarbeiroRepository : IBarbeiroRepository
    {
        private readonly IConfiguration _config;

        public BarbeiroRepository(IConfiguration config)
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

        public async Task<Barbeiro> GetByID(int id)
        {
            using (IDbConnection conn = Connection)
            {
                string sQuery = "SELECT  IdBarbeiro,Avatar,Nome,Distancia,Latitude,Longitude,Estrelas FROM Barbeiros WHERE IdBarbeiro= @ID";
                conn.Open();
                var result = await conn.QueryAsync<Barbeiro>(sQuery, new { ID = id });
                return result.FirstOrDefault();
            }
        }

        public async Task<List<Barbeiro>> GetAll()
        {
            using (IDbConnection conn = Connection)
            {
                string sQuery = "SELECT  IdBarbeiro,Avatar,Nome,Distancia,Latitude,Longitude,Estrelas FROM Barbeiros";
                conn.Open();
                var result = await conn.QueryAsync<Barbeiro>(sQuery);
                return result.ToList();
            }
        }

      
    }
}
