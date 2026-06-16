using Microsoft.AspNetCore.Mvc;
using MoneyScope.Api.DTOs;
using MoneyScope.Api.Services;

namespace MoneyScope.Api.Controllers;

[ApiController]
[Route("income")]
public class IncomeController(IncomeService incomeService) : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(incomeService.GetAll());
    }

    [HttpPost]
    public IActionResult Create(CreateIncomeDto dto)
    {
        var income = incomeService.Add(dto);
        return Created($"/income/{income.Id}", income);
    }

    [HttpDelete("{id:guid}")]
    public IActionResult Delete(Guid id)
    {
        return incomeService.Delete(id) ? NoContent() : NotFound();
    }
}
