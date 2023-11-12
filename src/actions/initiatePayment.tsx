"use server";
import { makePurchaseRequest } from "@/utils/http/payments";
import prismasdb from "@/utils/prisma";
import { PaymentInitiateResponse, PaymentStatus } from "@/utils/types";
import { redirect } from "next/navigation";

export async function initiatePaymentAction(state: any, formData: FormData) {
  const amount = +(formData.get("amount") || 300) as number;

  const payload: PaymentInitiateResponse = await makePurchaseRequest(amount);
  await prismasdb.payment.create({
    data: {
      transactionRef: payload.transactionRef,
      status: PaymentStatus.PENDING,
      jsonData: JSON.stringify(payload),
    },
  });

  if (state.success) return state;

  return redirect(`/3ds/${payload.transactionRef}`);
}
