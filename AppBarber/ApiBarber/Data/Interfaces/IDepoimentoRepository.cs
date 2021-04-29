using ApiBarbeiro.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiBarbeiro.Services.Interfaces
{
    public interface IDepoimentoRepository
    {
        Task<Depoimento> GetByID(int id);
        Task<List<Depoimento>> GetByBarbeiroID(int id);
        Task<List<Depoimento>> GetAll();
    }
}
