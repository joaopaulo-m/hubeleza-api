-- CreateTable
CREATE TABLE "invite_tokens" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" BIGINT NOT NULL,

    CONSTRAINT "invite_tokens_pkey" PRIMARY KEY ("id")
);
