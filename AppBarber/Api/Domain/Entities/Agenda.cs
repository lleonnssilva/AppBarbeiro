using ApiBarbeiro.Data;
using System;
using System.Collections.Generic;

namespace ApiBarbeiro.Domain.Entities
{
    public class Agenda : IEntity
    {
        public int Id { get; set; }
        public int IdProfissional { get; set; }

        public DateTime DataAgenda { get; set; }

        public List<Horario> Horarios { get; set; }
    }
}
