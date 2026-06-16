using Microsoft.AspNetCore.Mvc;
using MoneyScope.Api.DTOs;
using MoneyScope.Api.Services;

namespace MoneyScope.Api.Controllers;

[ApiController]
[Route("expenses")]
public class ExpenseController(ExpenseService expenseService) : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(expenseService.GetAll());
    }

    [HttpPost]
    public IActionResult Create(CreateExpenseDto dto)
    {
        var expense = expenseService.Add(dto);
        return Created($"/expenses/{expense.Id}", expense);
    }

    [HttpDelete("{id:guid}")]
    public IActionResult Delete(Guid id)
    {
        return expenseService.Delete(id) ? NoContent() : NotFound();
    }
}
