import { PrismaClient } from '../app/generated/prisma';
const prisma = new PrismaClient();

async function main() {
  await prisma.topic.createMany({
    data: [
      { name: 'Health' },
      { name: 'Wellness' },
      { name: 'Fitness' },
      { name: 'Nutrition' },
      { name: 'Mental Health' },
    ],
  });

  const topics = await prisma.topic.findMany();

  // Generate many nuiValues per topic
  for (const topic of topics) {
    const nuiValuesData = [];
    for (let i = 1; i <= 50; i++) {
      nuiValuesData.push({
        key: `Value${i}`,
        detail: `${topic.name} detail description for Value detail description for Valuedetail
        detail description for Value${i}.`,
        uv: Math.floor(Math.random() * 5),
        dv: Math.floor(Math.random() * 5),
        hc: Math.floor(Math.random() * 2), // 0 or 1
        c: ['Confidence ' + (Math.floor(Math.random() * 3) + 1)], // 1 to 3 confidence
        topicId: topic.id,
      });
    }
    // Insert nuiValues in bulk
    await prisma.nuiValue.createMany({
      data: nuiValuesData,
    });
  }

  console.log('Seeded multiple topics with 50 nuiValues each!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
