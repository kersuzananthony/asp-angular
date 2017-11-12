using System.ComponentModel.DataAnnotations;

namespace Angular1.Core.Models
{
    public class Photo
    {
        public int Id { get; set; }

        [StringLength(255)]
        [Required]
        public string FileName { get; set; }
        
        public int VehicleId { get; set; }
    }
}