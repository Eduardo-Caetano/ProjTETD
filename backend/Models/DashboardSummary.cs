namespace MoneyScope.Api.Models;

public class DashboardSummary
{
    public decimal TotalIncome { get; set; }
    public decimal TotalExpenses { get; set; }
    public decimal RemainingBalance { get; set; }
    public decimal CommittedPercentage { get; set; }
    public string Indicator { get; set; } = "green";
}
