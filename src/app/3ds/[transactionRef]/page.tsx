import { redirect } from "next/navigation";
import RedirectForm from "./redirectForm";
import { PaymentInitiateResponse } from "@/utils/types";
import prismasdb from "@/utils/prisma";

export default async function RedirectPage({
  params,
}: {
  params: { transactionRef: string };
}) {
  const pendingTransaction = await prismasdb.payment.findUnique({
    where: {
      transactionRef: params.transactionRef,
    },
  });

  if (!pendingTransaction) return redirect("/");
  const transactionDetails = JSON.parse(
    pendingTransaction.jsonData
  ) as PaymentInitiateResponse;

  return (
    <div className="grid place-items-center h-screen">
      <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-gray-900" />
      <RedirectForm
        ascUrl={transactionDetails.ACSUrl}
        jwt={transactionDetails.jwt}
        md={transactionDetails.MD}
      />
    </div>
  );
}
