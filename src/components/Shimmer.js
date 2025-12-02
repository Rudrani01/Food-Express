// const Shimmer = () => {
//     return ( <div className="shimmer-container">
//         <div className="shimmer-card"></div>
//         <div className="shimmer-card"></div>
//         <div className="shimmer-card"></div>
//     </div>
//     );
// };

// export default Shimmer;

const Shimmer = () => {
  return (
    <div className="shimmer-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {Array(12).fill("").map((_, i) => (
        <div
          key={i}
          className="shimmer-card m-4 p-4 w-[250px] h-[300px] bg-gray-300 rounded-lg animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default Shimmer;
