import { PrismaClient } from '../app/generated/prisma';
const prisma = new PrismaClient();

async function main() {
  // Create basic topics without categories
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
  
  // Generate questions for each topic
  for (const topic of topics) {
    const questionsData = [];
    
    for (let i = 1; i <= 10; i++) {
      // Generate a small set of comments
      const comments = [
        `Useful information about ${topic.name}`,
        `I learned something new about ${topic.name}`
      ];
      
      questionsData.push({
        key: `Question${i}`,
        question: `What's important to know about ${topic.name}?`,
        detail: `Details about ${topic.name} question ${i}`,
        uv: Math.floor(Math.random() * 100), // upvotes
        dv: Math.floor(Math.random() * 50),  // downvotes
        hc: Math.floor(Math.random() * 10),  // helpful count (0-9)
        c: comments, // Fixed sample comments
        topicId: topic.id,
      });
    }
    
    // Insert questions in bulk
    await prisma.nuiValue.createMany({
      data: questionsData,
    });
  }
  
  console.log('Seeded topics with questions successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });