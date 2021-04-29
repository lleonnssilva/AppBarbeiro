using ApiBarbeiro.Data;
using System;

namespace ApiBarbeiro.Domain.Entities
{
    public class AgendaServico : IEntity
    {
        public int Id { get; set; }
        public int IdBarbeiro { get; set; }
        public int IdServico { get; set; }
        public int IdCliente { get; set; }
        public DateTime DataAgenda { get; set; }
        public string Horario { get; set; }

        public Servico Servico { get; set; }
        public Barbeiro Barbeiro { get; set; }

    }

}
