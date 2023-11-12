"use client";

import { useEffect } from "react";

export default function RedirectForm({
  md,
  jwt,
  ascUrl,
}: {
  md: string;
  jwt: string;
  ascUrl: string;
}) {
  useEffect(() => {
    const form1: HTMLFormElement = document.getElementById(
      "form1"
    ) as unknown as HTMLFormElement;

    setTimeout(() => {
      form1?.submit();
    }, 2000);
  }, []);

  return (
    <form className="hidden" id="form1" action={ascUrl} method="post">
      <input name="JWT" readOnly value={jwt} />
      <input readOnly name="MD" value={md} />
    </form>
  );
}
