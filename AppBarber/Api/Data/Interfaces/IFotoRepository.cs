using ApiBarbeiro.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiBarbeiro.Services.Interfaces
{
    public interface IFotoRepository
    {
        Task<Foto> GetByID(int id);
        Task<List<Foto>> GetByBarbeiroID(int id);
        Task<List<Foto>> GetAll();
    }
}
