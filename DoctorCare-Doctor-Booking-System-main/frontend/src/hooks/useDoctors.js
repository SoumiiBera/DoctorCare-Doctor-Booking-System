import { useCallback, useEffect, useState } from "react";
import { getDoctors } from "../services/doctorService";

// "loading" is derived from the attempt number, so no state is set synchronously inside the effect.
export function useDoctors() {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({ attempt: -1, doctors: [], error: false });

  useEffect(() => {
    let active = true;

    getDoctors()
      .then((doctors) => active && setResult({ attempt, doctors, error: false }))
      .catch(() => active && setResult({ attempt, doctors: [], error: true }));

    return () => {
      active = false;
    };
  }, [attempt]);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);
  const loading = result.attempt !== attempt;

  return { doctors: result.doctors, loading, error: !loading && result.error, retry };
}
