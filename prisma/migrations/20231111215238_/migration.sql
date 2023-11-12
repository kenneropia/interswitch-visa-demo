-- CreateTable
CREATE TABLE "Payment" (
    "transactionRef" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "jsonData" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transactionRef_key" ON "Payment"("transactionRef");
