FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY MoneyScope.Api.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish MoneyScope.Api.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:10000
ENV PORT=10000
EXPOSE 10000

COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "MoneyScope.Api.dll"]
