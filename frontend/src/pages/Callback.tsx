import { useEffect } from "react";

export default function Callback() {
  const code = new URLSearchParams(window.location.search).get("code");
  const BACKEND = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!code) return;

    fetch(`${BACKEND}/callback?code=${code}`)
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          window.location.href = `/?token=${data.token}`;
        }
      });
  }, [code]);

  return <div style={{ color: "white" }}>Loading...</div>;
}
