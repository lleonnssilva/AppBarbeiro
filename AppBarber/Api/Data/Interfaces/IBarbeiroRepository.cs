using ApiBarbeiro.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiBarbeiro.Services.Interfaces
{
    public interface IBarbeiroRepository
    {
        Task<Barbeiro> GetByID(int id);
        Task<List<Barbeiro>> GetAll();
    }
}
