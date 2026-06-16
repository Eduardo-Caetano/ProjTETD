using MoneyScope.Api.DTOs;
using MoneyScope.Api.Models;

namespace MoneyScope.Api.Services;

public class ExpenseService
{
    private readonly List<Expense> _expenses = [];
    private readonly object _lock = new();

    public IReadOnlyList<Expense> GetAll()
    {
        lock (_lock)
        {
            return _expenses.OrderByDescending(expense => expense.CreatedAt).ToList();
        }
    }

    public Expense Add(CreateExpenseDto dto)
    {
        var expense = new Expense
        {
            Category = dto.Category.Trim().ToLowerInvariant(),
            Value = dto.Value,
            Description = string.IsNullOrWhiteSpace(dto.Description) ? null : dto.Description.Trim()
        };

        lock (_lock)
        {
            _expenses.Add(expense);
        }

        return expense;
    }

    public bool Delete(Guid id)
    {
        lock (_lock)
        {
            var expense = _expenses.FirstOrDefault(item => item.Id == id);
            if (expense is null)
            {
                return false;
            }

            _expenses.Remove(expense);
            return true;
        }
    }
}
