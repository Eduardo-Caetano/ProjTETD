using System.ComponentModel.DataAnnotations;

namespace MoneyScope.Api.DTOs;

public class CreateExpenseDto
{
    [Required]
    public required string Category { get; set; }

    [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser maior que zero.")]
    public decimal Value { get; set; }

    public string? Description { get; set; }
}
