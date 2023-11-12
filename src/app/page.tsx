"use client";

import { initiatePaymentAction } from "@/actions/initiatePayment";
import { permanentRedirect, redirect, useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

function Submit({
  state,
}: {
  state: {
    success: boolean;
    data: any;
  };
}) {
  const status = useFormStatus();

  if (state.success) {
    return (
      <button
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white"
        disabled={true}
      >
        Submit
      </button>
    );
  }

  return (
    <button
      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white"
      disabled={status.pending}
    >
      {status.pending ? "Pending" : "Submit"}
    </button>
  );
}

export default function Home() {
  const [state, formAction] = useFormState(initiatePaymentAction, {
    success: false,
    data: {},
  });

  return (
    <form
      action={formAction}
      className="bg-black text-white p-6 rounded-lg space-y-4 max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-200">
        Payment Information
      </h2>
      <div className="space-y-2">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-400"
          htmlFor="amount"
        >
          Amount
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-800 text-white placeholder-gray-400"
          id="amount"
          name="amount"
          type="number"
          defaultValue={10000}
          placeholder="Enter amount"
        />
      </div>

      <Submit state={state} />
    </form>
  );
}
