using System.ComponentModel.DataAnnotations;

namespace MoneyScope.Api.DTOs;

public class UpdateIncomeDto
{
    [Required]
    public required string Type { get; set; }

    [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser maior que zero.")]
    public decimal Value { get; set; }

    public string? Description { get; set; }
}
