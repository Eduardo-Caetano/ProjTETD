import { useCallback, useEffect, useState } from "react";
import { api } from "../services/api";

export function useDashboard() {
  const [summary, setSummary] = useState(null);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    const [summaryResponse, insightsResponse] = await Promise.all([
      api.get("/dashboard"),
      api.get("/insights")
    ]);
    setSummary(summaryResponse.data);
    setInsights(insightsResponse.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return { summary, insights, loading, loadDashboard };
}
