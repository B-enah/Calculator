"use client";
import React, { useState } from "react";

const Calculator = () => {
  const [expression, setExpression] = useState("0");

  const handleClick = (value: string) => {
    if (expression === "0") {
      setExpression(value);
    } else {
      setExpression((prev) => prev + value);
    }
  };

  const clear = () => {
    setExpression("0");
  };

  const deleteLast = () => {
    if (expression.length === 1) {
      setExpression("0");
    } else {
      setExpression((prev) => prev.slice(0, -1));
    }
  };

  const calculate = () => {
    try {
      const result = eval(expression);
      setExpression(String(result));
    } catch {
      setExpression("Error");
    }
  };

  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 p-4">
      <div className="w-full max-w-sm backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6">
        {/* Display */}
        <div className="bg-black/30 rounded-2xl p-5 mb-6 text-right overflow-hidden">
          <div className="text-white text-4xl font-mono break-all">
            {expression}
          </div>
        </div>

        {/* Top Controls */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <button
            onClick={clear}
            className="py-4 rounded-xl bg-red-500 text-white font-bold text-lg hover:scale-105 transition"
          >
            AC
          </button>

          <button
            onClick={deleteLast}
            className="py-4 rounded-xl bg-amber-500 text-white font-bold text-lg hover:scale-105 transition"
          >
            DEL
          </button>
        </div>

        {/* Calculator Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() =>
                btn === "=" ? calculate() : handleClick(btn)
              }
              className={`h-16 rounded-2xl text-xl font-bold transition-all duration-200 hover:scale-105 active:scale-95
                ${
                  ["+", "-", "*", "/", "="].includes(btn)
                    ? "bg-pink-500 text-white"
                    : "bg-white/20 text-white backdrop-blur-sm"
                }`}
            >
              {btn === "*" ? "×" : btn === "/" ? "÷" : btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;




// import React, { useState } from "react";

// const Calculator = () => {
//   // State stores everything shown on the calculator screen.
//   // Starts with "0" when the app loads.
//   const [expression, setExpression] = useState("0");

//   // Handles clicks for numbers and operators.
//   const handleClick = (value: string) => {
//     // Replace the initial 0 with the first value entered.
//     if (expression === "0") {
//       setExpression(value);
//     } else {
//       // Otherwise append the clicked value.
//       setExpression((prev) => prev + value);
//     }
//   };

//   // Clears the calculator display.
//   const clear = () => {
//     setExpression("0");
//   };

//   // Deletes the last character entered.
//   const deleteLast = () => {
//     if (expression.length === 1) {
//       // If only one character remains, reset to 0.
//       setExpression("0");
//     } else {
//       // Remove the last character.
//       setExpression((prev) => prev.slice(0, -1));
//     }
//   };

//   // Calculates the result when "=" is clicked.
//   const calculate = () => {
//     try {
//       // Evaluate the mathematical expression.
//       const result = eval(expression);

//       // Display the result.
//       setExpression(String(result));
//     } catch {
//       // Show Error if expression is invalid.
//       setExpression("Error");
//     }
//   };

//   // Buttons to render on the calculator.
//   const buttons = [
//     "7",
//     "8",
//     "9",
//     "/",
//     "4",
//     "5",
//     "6",
//     "*",
//     "1",
//     "2",
//     "3",
//     "-",
//     "0",
//     ".",
//     "=",
//     "+",
//   ];

//   return (
//     // Full-screen gradient background.
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 p-4">
//       {/* Calculator card */}
//       <div className="w-full max-w-sm backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6">

//         {/* Display Screen */}
//         <div className="bg-black/30 rounded-2xl p-5 mb-6 text-right overflow-hidden">
//           <div className="text-white text-4xl font-mono break-all">
//             {expression}
//           </div>
//         </div>

//         {/* Top Control Buttons */}
//         <div className="grid grid-cols-2 gap-3 mb-3">
//           <button
//             onClick={clear}
//             className="py-4 rounded-xl bg-red-500 text-white font-bold text-lg hover:scale-105 transition"
//           >
//             AC
//           </button>

//           <button
//             onClick={deleteLast}
//             className="py-4 rounded-xl bg-amber-500 text-white font-bold text-lg hover:scale-105 transition"
//           >
//             DEL
//           </button>
//         </div>

//         {/* Calculator Buttons */}
//         <div className="grid grid-cols-4 gap-3">
//           {buttons.map((btn) => (
//             <button
//               key={btn}
//               onClick={() =>
//                 btn === "="
//                   ? calculate()
//                   : handleClick(btn)
//               }
//               className={`h-16 rounded-2xl text-xl font-bold transition-all duration-200 hover:scale-105 active:scale-95 ${
//                 ["+", "-", "*", "/", "="].includes(btn)
//                   ? "bg-pink-500 text-white"
//                   : "bg-white/20 text-white backdrop-blur-sm"
//               }`}
//             >
//               {/* Display prettier operator symbols */}
//               {btn === "*"
//                 ? "×"
//                 : btn === "/"
//                 ? "÷"
//                 : btn}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Calculator;