
// import Link from 'next/link';
// import Stone from '../models/Stone';
// import connectDB from './api/connectDB';

// const StonesPage = ({ stones }) => {
//   return (
//     <div>
//       <h1>Stone List</h1>
//       <ul>
//         {stones.map((stone) => (
//           <li key={stone._id}>
//             <Link href={`/stones/${stone._id}`}>
//               <a>{stone.name}</a>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export async function getStaticProps() {
//   await connectDB();
//   const stones = await Stone.find({});
//   const stoneData = JSON.parse(JSON.stringify(stones)); // Convert to plain JSON
//   return {
//     props: {
//       stones: stoneData,
//     },
//   };
// }

// export default StonesPage;

import Link from 'next/link';
import Stone from '../models/Stone';
import connectDB from './api/connectDB';

const StonesPage = ({ stones }) => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Stone List</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {stones.map((stone) => (
          <li key={stone._id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc' }}>
            <Link href={`/stones/${stone._id}`}>
              <a style={{ textDecoration: 'none', color: '#333', fontSize: '18px' }}>{stone.name}</a>
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







