export const Button = ({ title, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        color: "white",
        cursor: "pointer",
        backgroundColor: "#007AFF",
        userSelect: "none",
        borderRadius: 12,
        padding: 8,
      }}
    >
      {title}
    </div>
  );
};

// Props ile kullanım (süslü parantez olmadan)

// export const Button = (props) => {
//   return (
//     <div
//       onClick={props.onClick}
//       style={{
//         color: "white",
//         cursor: "pointer",
//         backgroundColor: "#007AFF",
//         userSelect: "none",
//         borderRadius: 12,
//         padding: 8,
//       }}
//     >
//       {props.title}
//     </div>
//   );
// };
