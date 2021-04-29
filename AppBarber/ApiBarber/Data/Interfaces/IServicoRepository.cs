using ApiBarbeiro.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiBarbeiro.Services.Interfaces
{
    public interface IServicoRepository
    {
        Task<List<Servico>> GetByBarbeiroID(int id);
        Task<Servico> GetByID(int id);
        Task<List<Servico>> GetAll();
    }
}
