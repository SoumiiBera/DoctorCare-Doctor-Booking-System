import { useEffect, useState } from "react";
import { getDoctorById } from "../services/doctorService";

export function useDoctor(id) {
  const [result, setResult] = useState({ id: null, doctor: null, error: false });

  useEffect(() => {
    let active = true;

    getDoctorById(id)
      .then((doctor) => active && setResult({ id, doctor, error: false }))
      .catch(() => active && setResult({ id, doctor: null, error: true }));

    return () => {
      active = false;
    };
  }, [id]);

  const loading = result.id !== id;

  return {
    doctor: loading ? null : result.doctor,
    loading,
    error: !loading && result.error,
  };
}
