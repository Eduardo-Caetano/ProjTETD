namespace MoneyScope.Api.Models;

public class Expense
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Category { get; set; }
    public decimal Value { get; set; }
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
