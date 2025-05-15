-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NuiValue" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "uv" INTEGER NOT NULL,
    "dv" INTEGER NOT NULL,
    "hc" INTEGER NOT NULL,
    "c" TEXT[],
    "topicId" TEXT NOT NULL,

    CONSTRAINT "NuiValue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NuiValue" ADD CONSTRAINT "NuiValue_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
