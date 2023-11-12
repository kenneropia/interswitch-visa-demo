"use server";
import { makePurchaseRequest } from "@/utils/http/payments";
import prismasdb from "@/utils/prisma";
import { PaymentInitiateResponse, PaymentStatus } from "@/utils/types";

export async function initiatePaymentAction(state: any, formData: FormData) {
  const payload: PaymentInitiateResponse = await makePurchaseRequest();
  const res = await prismasdb.payment.create({
    data: {
      transactionRef: payload.transactionRef,
      status: PaymentStatus.PENDING,
      jsonData: JSON.stringify(payload),
    },
  });

  if (state.success) return state;

  return { success: true, data: { transactionRef: payload.transactionRef } };
}
