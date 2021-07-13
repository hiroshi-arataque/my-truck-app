using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace my_app_back_end.Models
{
    public class Truck
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public string ProductionYear { get; set; }
        public string ModelYear { get; set; }
        public Model Model { get; set; }
    }
}
