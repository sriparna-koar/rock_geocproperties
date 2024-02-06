
// import Stone from '../../models/Stone';
// import connectDB from '../api/connectDB';

// const StoneDetailPage = ({ stone }) => {
//   return (
//     <div>
//       <h1>{stone.name}</h1>
//       <p>Properties: {stone.properties}</p>
//       <p>Location:{stone.locationDescription}</p>
//       <img src={stone.pictureUrl} alt={stone.name} />
//     </div>
//   );
// };

// export async function getStaticPaths() {
//   await connectDB();
//   const stones = await Stone.find({});
//   const paths = stones.map((stone) => ({
//     params: { id: stone._id.toString() },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   await connectDB();
//   const stone = await Stone.findById(params.id);
//   const stoneData = JSON.parse(JSON.stringify(stone)); // Convert to plain JSON
//   return {
//     props: {
//       stone: stoneData,
//     },
//   };
// }

// export default StoneDetailPage;

import Stone from '../../models/Stone';
import connectDB from '../api/connectDB';

const StoneDetailPage = ({ stone }) => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1>{stone.name}</h1>
      <p>Properties: {stone.properties}</p>
      <p>Location: {stone.locationDescription}</p>
      <img src={stone.pictureUrl} alt={stone.name} style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );
};

export async function getStaticPaths() {
  await connectDB();
  const stones = await Stone.find({});
  const paths = stones.map((stone) => ({
    params: { id: stone._id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  await connectDB();
  const stone = await Stone.findById(params.id);
  const stoneData = JSON.parse(JSON.stringify(stone)); // Convert to plain JSON
  return {
    props: {
      stone: stoneData,
    },
  };
}

export default StoneDetailPage;
