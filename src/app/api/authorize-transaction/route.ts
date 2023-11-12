import { makePurchaseOtpAuthRequest } from "@/utils/http/payments";
import prismasdb from "@/utils/prisma";
import { PaymentStatus, ThreeDSResponse } from "@/utils/types";
import { RedirectType, redirect } from "next/navigation";
import { NextResponse } from "next/server";
import qs from "querystring";
export async function POST(request: Request, response: Response) {
  const rawData = await request.text();
  const threeDSResponse = qs.parse(rawData) as unknown as ThreeDSResponse;
  const oTPauth = await makePurchaseOtpAuthRequest({
    paymentId: threeDSResponse.MD,
    transactionId: threeDSResponse.TransactionId,
  });
  if (!oTPauth) {
    console.log("oTPauth Not Set");
    return NextResponse.redirect(`${request.headers.get("host")}`);
  }
  if (oTPauth?.responseCode == "00") {
    await prismasdb?.payment.update({
      where: {
        transactionRef: oTPauth.transactionRef,
      },
      data: {
        status: PaymentStatus.COMPLETE,
        jsonData: JSON.stringify(oTPauth),
      },
    });
  } else {
    await prismasdb?.payment.update({
      where: {
        transactionRef: oTPauth.transactionRef,
      },
      data: {
        status: PaymentStatus.FAILURE,
        jsonData: JSON.stringify(oTPauth),
      },
    });
    console.log("oTPauth ERROR");
    return NextResponse.redirect(`${request.headers.get("host")}`);
  }
  console.log(
    `${request.headers.get("host")}/check-transaction/${oTPauth.transactionRef}`
  );
  return NextResponse.redirect(
    `${request.headers.get("host")}/check-transaction/${oTPauth.transactionRef}`
  );
}