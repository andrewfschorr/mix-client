// import Layout from '../components/MyLayout';
// import Link from 'next/link';
// import fetch from 'isomorphic-unfetch';

// import style from '../components/style.css';
<p>hello world</p>
// const Index = props => (
//   <Layout>
//     <h1 className={style.foo}>Batman TV Shows</h1>
//     <div className="p-4 shadow rounded bg-white">
//       <h1 className="text-purple-500 leading-normal">Next.js</h1>
//       <p className="text-gray-500">with Tailwind CSS</p>
//     </div>
//     <div className="bg-white rounded-lg p-6">
//       <div className="bg-gray-200">
//         <div className="inline-block text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">1</div>
//         <div className="inline-block text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">2</div>
//         <div className="inline-block text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">3</div>
//       </div>
//     </div>
//     <ul>
//       {props.shows.map(show => (
//         <li key={show.id}>
//           <Link href="/p/[id]" as={`/p/${show.id}`}>
//             <a className={style.foo}>{show.name}</a>
//           </Link>
//         </li>
//       ))}
//     </ul>
//     <div className={style.top}>
//       <p className={style.bottom}>HELLO</p>
//     </div>
//   </Layout>
// );

// Index.getInitialProps = async function() {
//   const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
//   const data = await res.json();

//   console.log(`Show data fetched. Count: ${data.length}`);

//   return {
//     shows: data.map(entry => entry.show)
//   };
// };

// export default Index;