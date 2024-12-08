import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.reaction.deleteMany({});
  await prisma.collected.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.badge.deleteMany({});
  await prisma.game.deleteMany({});

  // Create some users
  const user1 = await prisma.user.create({
    data: { username: 'admin', password: 'adminpassword', avatar: 'admin-avatar.png', role: 'admin' },
  });

  const user2 = await prisma.user.create({
    data: { username: 'user1', password: 'user1password', avatar: 'user1-avatar.png', role: 'user' },
  });

  const user3 = await prisma.user.create({
    data: { username: 'user2', password: 'user2password', avatar: 'user2-avatar.png', role: 'user' },
  });

  const user4 = await prisma.user.create({
    data: { username: 'user3', password: 'user3password', avatar: 'user3-avatar.png', role: 'user' },
  });

  // Create some badges
  const badge1 = await prisma.badge.create({
    data: { name: 'First Badge', description: 'This is the first badge', image: 'badge1.png' },
  });

  const badge2 = await prisma.badge.create({
    data: { name: 'Second Badge', description: 'This is the second badge', image: 'badge2.png' },
  });

  const badge3 = await prisma.badge.create({
    data: { name: 'Third Badge', description: 'This is the third badge', image: 'badge3.png' },
  });

  const badge4 = await prisma.badge.create({
    data: { name: 'Fourth Badge', description: 'This is the fourth badge', image: 'badge4.png' },
  });

  // Create some games
  const game1 = await prisma.game.create({
    data: { title: 'The Legend of Zelda: Breath of the Wild', genre: 'Action-adventure', description: 'An open-world action-adventure game.', image: 'zelda.jpg', releaseDate: new Date('2017-03-03') },
  });

  const game2 = await prisma.game.create({
    data: { title: 'Super Mario Odyssey', genre: 'Platform', description: 'A 3D platform game.', image: 'mario.png', releaseDate: new Date('2017-10-27') },
  });

  const game3 = await prisma.game.create({
    data: { title: 'Red Dead Redemption 2', genre: 'Action-adventure', description: 'An open-world western action-adventure game.', image: 'rdr2.png', releaseDate: new Date('2018-10-26') },
  });

  const game4 = await prisma.game.create({
    data: { title: 'The Witcher 3: Wild Hunt', genre: 'Action RPG', description: 'An open-world action role-playing game.', image: 'witcher3.avif', releaseDate: new Date('2015-05-19') },
  });

  const game5 = await prisma.game.create({
    data: { title: 'Cyberpunk 2077', genre: 'Action RPG', description: 'An open-world action role-playing game.', image: 'cyberpunk2077.png', releaseDate: new Date('2020-12-10') },
  });

  const game6 = await prisma.game.create({
    data: { title: 'Minecraft', genre: 'Sandbox', description: 'A sandbox game with building and survival elements.', image: 'minecraft.png', releaseDate: new Date('2011-11-18') },
  });

  const game7 = await prisma.game.create({
    data: { title: 'Fortnite', genre: 'Battle Royale', description: 'A battle royale game.', image: 'fortnite.png', releaseDate: new Date('2017-07-25') },
  });

  const game8 = await prisma.game.create({
    data: { title: 'Among Us', genre: 'Party', description: 'A party game of teamwork and betrayal.', image: 'amongus.png', releaseDate: new Date('2018-06-15') },
  });

  const game9 = await prisma.game.create({
    data: { title: 'Animal Crossing: New Horizons', genre: 'Simulation', description: 'A life simulation game.', image: 'animalcrossing.png', releaseDate: new Date('2020-03-20') },
  });

  const game10 = await prisma.game.create({
    data: { title: 'Doom Eternal', genre: 'First-person shooter', description: 'A first-person shooter game.', image: 'doom.png', releaseDate: new Date('2020-03-20') },
  });

  // Create some reactions
  await prisma.reaction.createMany({
    data: [
      { userId: user1.id, gameId: game1.id, content: 'Amazing game!', createdAt: new Date() },
      { userId: user2.id, gameId: game2.id, content: 'Loved it!', createdAt: new Date() },
      { userId: user3.id, gameId: game3.id, content: 'Incredible experience.', createdAt: new Date() },
      { userId: user4.id, gameId: game4.id, content: 'Best RPG ever.', createdAt: new Date() },
      { userId: user1.id, gameId: game5.id, content: 'Great graphics!', createdAt: new Date() },
      { userId: user2.id, gameId: game6.id, content: 'So much fun!', createdAt: new Date() },
      { userId: user3.id, gameId: game7.id, content: 'Addictive gameplay.', createdAt: new Date() },
      { userId: user4.id, gameId: game8.id, content: 'Perfect for parties.', createdAt: new Date() },
      { userId: user1.id, gameId: game9.id, content: 'Relaxing and fun.', createdAt: new Date() },
      { userId: user2.id, gameId: game10.id, content: 'Intense action!', createdAt: new Date() },
    ],
  });

  // Create some collected badges
  await prisma.collected.createMany({
    data: [
      { userId: user1.id, badgeId: badge1.id, gameId: game1.id, collectedAt: new Date() },
      { userId: user2.id, badgeId: badge2.id, gameId: game2.id, collectedAt: new Date() },
      { userId: user3.id, badgeId: badge3.id, gameId: game3.id, collectedAt: new Date() },
      { userId: user4.id, badgeId: badge4.id, gameId: game4.id, collectedAt: new Date() },
      { userId: user1.id, badgeId: badge2.id, gameId: game5.id, collectedAt: new Date() },
      { userId: user2.id, badgeId: badge3.id, gameId: game6.id, collectedAt: new Date() },
      { userId: user3.id, badgeId: badge4.id, gameId: game7.id, collectedAt: new Date() },
      { userId: user4.id, badgeId: badge1.id, gameId: game8.id, collectedAt: new Date() },
      { userId: user1.id, badgeId: badge3.id, gameId: game9.id, collectedAt: new Date() },
      { userId: user2.id, badgeId: badge4.id, gameId: game10.id, collectedAt: new Date() },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });