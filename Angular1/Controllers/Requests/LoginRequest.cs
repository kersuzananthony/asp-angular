using System.ComponentModel.DataAnnotations;

namespace Angular1.Controllers.Requests
{
    public class LoginRequest
    {
        [Required]
        [EmailAddress]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}