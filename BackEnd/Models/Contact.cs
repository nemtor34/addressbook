using System.ComponentModel.DataAnnotations;

namespace BackEnd.Models {
    public class Contact{
        public int Id { get; set; }

        [StringLength(20)]
        [Required]
        public string FirstName {get; set;} = string.Empty;

[       StringLength(20)]
        [Required]
        public string LastName {get; set;} = string.Empty;

[       StringLength(200)]
        [Required]
        public string Address {get; set;} = string.Empty;
        
        [StringLength(16)]
        [Required]
        [RegularExpression(@"^[0-9]+$", 
         ErrorMessage = "Characters are not allowed.")]
        public string Phone {get; set;} = string.Empty;
    }
}