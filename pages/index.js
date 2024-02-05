
import Link from 'next/link';
import Stone from '../models/Stone';
import connectDB from './api/connectDB';

const StonesPage = ({ stones }) => {
  return (
    <div>
      <h1>Stone List</h1>
      <ul>
        {stones.map((stone) => (
          <li key={stone._id}>
            <Link href={`/stones/${stone._id}`}>
              <a>{stone.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  await connectDB();
  const stones = await Stone.find({});
  const stoneData = JSON.parse(JSON.stringify(stones)); // Convert to plain JSON
  return {
    props: {
      stones: stoneData,
    },
  };
}

export default StonesPage;
