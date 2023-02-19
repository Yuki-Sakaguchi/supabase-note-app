import type { NextApiResponse } from 'next';

type Data = {
  revalidated: boolean;
};

export default async function handler(res: NextApiResponse<Data>) {
  console.log('Revalidating notes pages...');
  let revalidated = false;
  try {
    await res.revalidate('/notes');
    revalidated = true;
  } catch (e) {
    console.log(e);
  }
  res.status(200).json({ revalidated });
}
