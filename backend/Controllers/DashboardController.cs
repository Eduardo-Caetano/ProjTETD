using Microsoft.AspNetCore.Mvc;
using MoneyScope.Api.Services;

namespace MoneyScope.Api.Controllers;

[ApiController]
public class DashboardController(DashboardService dashboardService) : ControllerBase
{
    [HttpGet("dashboard")]
    public IActionResult GetDashboard()
    {
        return Ok(dashboardService.GetSummary());
    }

    [HttpGet("insights")]
    public IActionResult GetInsights()
    {
        return Ok(dashboardService.GetInsights());
    }
}
