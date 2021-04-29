using ApiBarbeiro.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiBarbeiro.Services.Interfaces
{
    public interface IAgendaRepository
    {
        Task<List<Agenda>> GetByBarbeiroID(int id);
        Task<Agenda> GetByID(int id);
        Task<List<Agenda>> GetAll();
        Task<int> Insert(AgendaServico model);
        Task<List<AgendaServico>> GetAgendamentoClienteID(int id);
    }
}
