using MoneyScope.Api.DTOs;
using MoneyScope.Api.Models;

namespace MoneyScope.Api.Services;

public class IncomeService
{
    private readonly List<Income> _incomes = [];
    private readonly object _lock = new();

    public IReadOnlyList<Income> GetAll()
    {
        lock (_lock)
        {
            return _incomes.OrderByDescending(income => income.CreatedAt).ToList();
        }
    }

    public Income Add(CreateIncomeDto dto)
    {
        var income = new Income
        {
            Type = dto.Type.Trim().ToLowerInvariant(),
            Value = dto.Value,
            Description = string.IsNullOrWhiteSpace(dto.Description) ? null : dto.Description.Trim()
        };

        lock (_lock)
        {
            _incomes.Add(income);
        }

        return income;
    }

    public Income? Update(Guid id, UpdateIncomeDto dto)
    {
        lock (_lock)
        {
            var income = _incomes.FirstOrDefault(item => item.Id == id);
            if (income is null)
            {
                return null;
            }

            income.Type = dto.Type.Trim().ToLowerInvariant();
            income.Value = dto.Value;
            income.Description = string.IsNullOrWhiteSpace(dto.Description) ? null : dto.Description.Trim();
            return income;
        }
    }

    public bool Delete(Guid id)
    {
        lock (_lock)
        {
            var income = _incomes.FirstOrDefault(item => item.Id == id);
            if (income is null)
            {
                return false;
            }

            _incomes.Remove(income);
            return true;
        }
    }
}
