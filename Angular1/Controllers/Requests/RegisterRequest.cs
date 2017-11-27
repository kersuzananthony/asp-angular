using System.ComponentModel.DataAnnotations;

namespace Angular1.Controllers.Requests
{
    public class RegisterRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        [StringLength(100, ErrorMessage = "USERNAME_MIN_LENGTH", MinimumLength = 5)]
        public string UserName { get; set; }
        
        [Required]
        [StringLength(100, ErrorMessage = "PASSWORD_MIN_LENGTH", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        
        [Required]
        [StringLength(100, ErrorMessage = "CONFIRMATION_PASSWORD_MIN_LENGTH", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Compare("Password")]
        public string ConfirmationPassword { get; set; }
    }
}