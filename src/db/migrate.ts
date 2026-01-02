import 'dotenv/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from './connector';
import path from 'path';

async function main() {
  await migrate(db, {
    migrationsFolder: path.resolve('src/db/out'),
  });

  console.log('✅ Migration applied');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Migration failed', err);
  process.exit(1);
});
