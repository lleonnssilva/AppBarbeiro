using ApiBarbeiro.Data;
using System.Collections.Generic;

namespace ApiBarbeiro.Domain.Entities
{
    public class Barbeiro 
    {
        public Barbeiro()
        {

        }
        public Barbeiro(int idBarbeiro, string avatar, string nome, string distancia, string latitude, string longitude, decimal estrelas)
        {

            IdBarbeiro = idBarbeiro;
            Nome = nome;
            Avatar = avatar;
            Distancia = distancia;
            Latitude = latitude;
            Longitude = longitude;
            Estrelas = estrelas;
            Depoimentos = new List<Depoimento>();
            Servicos = new List<Servico>();
            Fotos = new List<Foto>();
            Horarios = new List<Agenda>();
        }
        public int IdBarbeiro { get; set; }
        public string Avatar { get; set; }

        public string Nome { get; set; }

        public string Distancia { get; set; }

        public string Latitude { get; set; }

        public string Longitude { get; set; }

        public decimal Estrelas { get; set; }

        public List<Depoimento> Depoimentos { get; set; }
        public List<Servico> Servicos { get; set; }
        public List<Foto> Fotos { get; set; }
        public List<Agenda> Horarios { get; set; }
        public List<AgendaServico> Agendamentos { get; set; }

    }
}
