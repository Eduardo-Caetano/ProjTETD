using MoneyScope.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IncomeService>();
builder.Services.AddSingleton<ExpenseService>();
builder.Services.AddSingleton<DashboardService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("MoneyScopeCors", policy =>
    {
        policy
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            .SetIsOriginAllowed(_ => true);
    });
});

var port = Environment.GetEnvironmentVariable("PORT") ?? "10000";
builder.WebHost.UseUrls($"http://+:{port}");

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("MoneyScopeCors");
app.MapControllers();

app.Run();
