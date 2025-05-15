import { PrismaClient } from "../generated/prisma";
import { NuiValue } from "../generated/prisma";

// lib/getTopics.ts
const prisma = new PrismaClient();

export async function getAllTopicsFromDb() {
  const topics = await prisma.topic.findMany({
    include: {
      nuiValues: true,
    },
  });

  const structured: {
    [key: string]: {
      nui: {
        [key: string]: {
          detail: string;
          uv: number;
          dv: number;
          hc: number;
          c: string[];
        };
      };
    }[];
  } = {};

  for (const topic of topics) {
    const topicItems = topic.nuiValues.map((nuiVal: NuiValue) => ({
      nui: {
        [nuiVal.key]: {
          detail: nuiVal.detail,
          uv: nuiVal.uv,
          dv: nuiVal.dv,
          hc: nuiVal.hc,
          c: nuiVal.c,
        },
      },
    }));

    structured[topic.name] = topicItems;
  }

  return structured;
}
