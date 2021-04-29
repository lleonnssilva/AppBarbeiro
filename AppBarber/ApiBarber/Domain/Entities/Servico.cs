using ApiBarbeiro.Data;
using System.Collections.Generic;

namespace ApiBarbeiro.Domain.Entities
{
    public class Servico 
    {
        public int IdServico { get; set; }
        public string Descricao { get; set; }
        public decimal Preco { get; set; }
        public List<AgendaServico> Agendamentos { get; set; }
    }
}
