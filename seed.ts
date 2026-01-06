import { db } from './src/db';
import { users } from './src/db/schema';

async function seed() {
  console.log('Seeding database...');

  // Criar usuário admin
  await db.insert(users).values({
    id: crypto.randomUUID(),
    email: 'admin@example.com',
    password: 'admin123', // EM PRODUÇÃO, USE BCRYPT!
    name: 'Admin',
  });

  console.log('✅ Admin user created: admin@example.com / admin123');
  console.log('Done!');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
