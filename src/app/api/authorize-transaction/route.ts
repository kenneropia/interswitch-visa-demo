import { makePurchaseOtpAuthRequest } from "@/utils/http/payments";
import prismasdb from "@/utils/prisma";
import { PaymentStatus, ThreeDSResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import qs from "querystring";

export async function POST(request: Request, response: Response) {
  const rawData = await request.text();
  const threeDSResponse = qs.parse(rawData) as unknown as ThreeDSResponse;

  console.log("3_3DS_DATA_FROM_CARDINAL", threeDSResponse);

  const oTPauth = await makePurchaseOtpAuthRequest({
    paymentId: threeDSResponse.MD,
    transactionId: threeDSResponse.TransactionId,
  });

  console.log("4_AUTH_OTP", oTPauth);

  if (!oTPauth) {
    console.log("oTPauth Not Set");
    return NextResponse.redirect(process.env.BASE_URL as string);
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
  }
  console.log(
    "5_REDIRECT_TO_CONFIRM_TRANSACTION_PAGE",
    `${process.env.BASE_URL as string}/check-transaction/${
      oTPauth.transactionRef
    }`
  );
  return NextResponse.redirect(
    `${process.env.BASE_URL as string}/check-transaction/${
      oTPauth.transactionRef
    }`,
    302
  );
}
