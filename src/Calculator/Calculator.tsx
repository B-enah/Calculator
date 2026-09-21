"use client";
import { useEffect, useState } from "react";

const isOperator = (btn: string) => ["+", "-", "*", "/"].includes(btn);

// Safe arithmetic evaluator (no eval): supports + - * /, decimals, and unary minus.
const evaluateExpression = (input: string): number => {
  const tokens = input.match(/\d+\.?\d*|[+\-*/]/g) ?? [];
  let pos = 0;

  const peek = () => tokens[pos];

  const parsePrimary = (): number => {
    const token = tokens[pos];
    if (token === undefined) throw new Error("unexpected end");
    if (token === "-") {
      pos += 1;
      return -parsePrimary();
    }
    if (token === "+") {
      pos += 1;
      return parsePrimary();
    }
    const num = Number(token);
    if (Number.isNaN(num)) throw new Error("invalid number");
    pos += 1;
    return num;
  };

  const parseTerm = (): number => {
    let value = parsePrimary();
    while (peek() === "*" || peek() === "/") {
      const op = tokens[pos];
      pos += 1;
      const rhs = parsePrimary();
      value = op === "*" ? value * rhs : value / rhs;
    }
    return value;
  };

  let result = parseTerm();
  while (peek() === "+" || peek() === "-") {
    const op = tokens[pos];
    pos += 1;
    const rhs = parseTerm();
    result = op === "+" ? result + rhs : result - rhs;
  }
  if (pos !== tokens.length) throw new Error("unexpected token");
  return result;
};

// Drop trailing operators so "5+" still evaluates to 5.
const trimTrailingOperators = (expr: string) => expr.replace(/[+\-*/]+$/, "");

const getDisplaySize = (length: number) => {
  if (length > 16) return "text-2xl";
  if (length > 12) return "text-3xl";
  return "text-4xl";
};

const Calculator = () => {
  const [expression, setExpression] = useState("0");

  const handleClick = (value: string) => {
    if (expression === "Error") {
      setExpression(value === "." ? "0." : value);
      return;
    }
    if (expression === "0") {
      setExpression(value === "." ? "0." : value);
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
      const result = evaluateExpression(trimTrailingOperators(expression));
      setExpression(Number.isFinite(result) ? String(result) : "Error");
    } catch {
      setExpression("Error");
    }
  };

  // Keyboard support: digits/operators type, Enter evaluates, Backspace deletes, Escape clears.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      if (/^[0-9.]$/.test(key) || isOperator(key)) {
        event.preventDefault();
        handleClick(key);
        return;
      }
      if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
        return;
      }
      if (key === "Backspace") {
        event.preventDefault();
        deleteLast();
        return;
      }
      if (key === "Escape") {
        event.preventDefault();
        clear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

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
    "+",
    "=",
  ];

  const buttonClass = (btn: string) => {
    const base =
      "h-16 rounded-2xl text-xl font-semibold transition-all duration-150 select-none hover:brightness-110 active:scale-95";
    if (btn === "=") {
      return `${base} bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-400`;
    }
    if (isOperator(btn)) {
      return `${base} border border-indigo-400/20 bg-indigo-500/15 text-indigo-300 hover:bg-indigo-500/25`;
    }
    return `${base} bg-zinc-800 text-zinc-100 hover:bg-zinc-700`;
  };

  return (
    <div className="font-sans relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 p-4">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative w-full max-w-sm rounded-[2rem] border border-white/10 bg-zinc-900/80 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between px-1">
          <span className="text-xs font-medium tracking-widest text-zinc-500 uppercase">
            Calculator
          </span>
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        </div>

        {/* Display */}
        <div className="mb-6 rounded-2xl border border-white/5 bg-black/50 px-5 py-6 text-right shadow-[inset_0_2px_12px_rgba(0,0,0,0.6)]">
          <div
            className={`font-mono text-indigo-100 break-all tabular-nums ${getDisplaySize(expression.length)}`}
          >
            {expression}
          </div>
        </div>

        {/* Top controls */}
        <div className="mb-3 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={clear}
            className="h-14 rounded-2xl border border-red-500/20 bg-red-500/10 text-base font-semibold text-red-400 transition-all duration-150 select-none hover:bg-red-500/20 active:scale-95"
          >
            AC
          </button>
          <button
            type="button"
            onClick={deleteLast}
            className="h-14 rounded-2xl border border-amber-500/20 bg-amber-500/10 text-base font-semibold text-amber-400 transition-all duration-150 select-none hover:bg-amber-500/20 active:scale-95"
          >
            DEL
          </button>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn) => (
            <button
              key={btn}
              type="button"
              onClick={() => (btn === "=" ? calculate() : handleClick(btn))}
              className={buttonClass(btn)}
            >
              {btn === "*" ? "×" : btn === "/" ? "÷" : btn === "-" ? "−" : btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
