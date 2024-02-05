// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const StoneDetail = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [stone, setStone] = useState(null);
//   console.log('Stone ID from router:', id);
//   useEffect(() => {
//     const fetchStone = async () => {
//       try {
//         const response = await axios.get(`/api/stones/${id}`);
//         setStone(response.data);
//       } catch (error) {
//         console.error(error);
//         console.log('Received stone ID:', id);
//       }
//     };

//     if (id) {
//       fetchStone();
//     }
//   }, [id]);

//   if (!stone) {
//     return <div>Loading...</div>;
    
//   }

//   return (
//     <div>
//       <h1>{stone.name}</h1>
//       <p>Properties: {stone.properties}</p>
//       <p>Latitude: {stone.latitude}</p>
//       <p>Longitude: {stone.longitude}</p>
      
//       {/* Additional details or map integration can be added here */}
//     </div>
//   );
// };

// export default StoneDetail;
// pages/stones/[id].js
import Stone from '../../models/Stone';
import connectDB from '../api/connectDB';

const StoneDetailPage = ({ stone }) => {
  return (
    <div>
      <h1>{stone.name}</h1>
      <p>Properties: {stone.properties}</p>
      <p>Latitude: {stone.latitude}</p>
      <p>Longitude: {stone.longitude}</p>
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
