import { seed } from '../../drizzle/seed';

async function globalSetup() {
  try {
    await seed();
  } catch (error) {
    console.log(error);
  }
}

export default globalSetup;
