import { redirect } from "next/navigation";

import {
  GetTransactionResponse,
  PaymentInitiateResponse,
  PaymentStatus,
} from "@/utils/types";
import prismasdb from "@/utils/prisma";
import { getTransaction } from "@/utils/http/payments";

export default async function RedirectPage({
  params,
}: {
  params: { transactionRef: string };
}) {
  const transaction = await prismasdb.payment.findFirst({
    where: {
      transactionRef: params.transactionRef,
      status: PaymentStatus.COMPLETE,
    },
  });

  if (!transaction) return redirect("/");
  const transactionDetails = JSON.parse(
    transaction.jsonData
  ) as GetTransactionResponse;
  console.log(transactionDetails);
  const transactionFromInterswitch = await getTransaction({
    amount: transactionDetails.Amount,
    merchantCode: process.env.INTERSWITCH_MERCHANT_CODE as string,
    transactionReference: transaction.transactionRef,
  });
  console.log("transaction", transactionFromInterswitch);

  return (
    <div className="grid place-items-center h-screen">
      <pre>{JSON.stringify(transactionFromInterswitch, null, 2)}</pre>{" "}
    </div>
  );
}
