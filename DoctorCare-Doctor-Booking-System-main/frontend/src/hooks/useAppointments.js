import { useCallback, useEffect, useState } from "react";
import { getMyAppointments } from "../services/appointmentService";

export function useAppointments() {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({ attempt: -1, items: [], error: false });

  useEffect(() => {
    let active = true;

    getMyAppointments()
      .then((items) => active && setResult({ attempt, items, error: false }))
      .catch(() => active && setResult({ attempt, items: [], error: true }));

    return () => {
      active = false;
    };
  }, [attempt]);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  const replaceItem = useCallback((updated) => {
    setResult((current) => ({
      ...current,
      items: current.items.map((item) => (item._id === updated._id ? updated : item)),
    }));
  }, []);

  const loading = result.attempt !== attempt;

  return { items: result.items, loading, error: !loading && result.error, retry, replaceItem };
}
