using MoneyScope.Api.Models;

namespace MoneyScope.Api.Services;

public class DashboardService(IncomeService incomeService, ExpenseService expenseService)
{
    public DashboardSummary GetSummary()
    {
        var totalIncome = incomeService.GetAll().Sum(income => income.Value);
        var totalExpenses = expenseService.GetAll().Sum(expense => expense.Value);
        var committedPercentage = totalIncome <= 0 ? 0 : Math.Round(totalExpenses / totalIncome * 100, 2);

        return new DashboardSummary
        {
            TotalIncome = totalIncome,
            TotalExpenses = totalExpenses,
            RemainingBalance = totalIncome - totalExpenses,
            CommittedPercentage = committedPercentage,
            Indicator = GetIndicator(committedPercentage)
        };
    }

    public IReadOnlyList<string> GetInsights()
    {
        var incomes = incomeService.GetAll();
        var expenses = expenseService.GetAll();
        var summary = GetSummary();
        var insights = new List<string>
        {
            $"Seu saldo disponível é R$ {summary.RemainingBalance:N2}.",
            $"Você comprometeu {summary.CommittedPercentage:N2}% da sua renda."
        };

        if (expenses.Count == 0)
        {
            insights.Add("Ainda não há gastos cadastrados para analisar.");
            return insights;
        }

        if (summary.TotalIncome > 0)
        {
            var topCategory = expenses
                .GroupBy(expense => expense.Category)
                .Select(group => new { Category = group.Key, Total = group.Sum(expense => expense.Value) })
                .OrderByDescending(group => group.Total)
                .First();

            var percentage = Math.Round(topCategory.Total / summary.TotalIncome * 100, 2);
            insights.Add($"Você gastou {percentage:N2}% da renda com {topCategory.Category}.");
            insights.Add($"Sua maior categoria é {topCategory.Category}.");
        }

        var subscriptionsTotal = expenses
            .Where(expense => expense.Category.Equals("assinaturas", StringComparison.OrdinalIgnoreCase))
            .Sum(expense => expense.Value);

        if (subscriptionsTotal > 0)
        {
            insights.Add($"Assinaturas representam R$ {subscriptionsTotal:N2} mensais.");
        }

        if (incomes.Count > 0)
        {
            var biggestIncome = incomes.OrderByDescending(income => income.Value).First();
            insights.Add($"Sua maior renda cadastrada é {biggestIncome.Type}, com R$ {biggestIncome.Value:N2}.");
        }

        return insights;
    }

    private static string GetIndicator(decimal committedPercentage)
    {
        if (committedPercentage <= 50)
        {
            return "green";
        }

        if (committedPercentage <= 80)
        {
            return "yellow";
        }

        return "red";
    }
}
