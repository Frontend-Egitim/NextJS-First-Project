"use client";

import { useState } from "react";

export default function page() {
  const [state, setState] = useState(0);

  // const arttir = () => setState();
  function arttir(x = 1) {
    setState(state + x);
  }

  return (
    <div>
      <div>{state}</div>
      <div>
        <button onClick={() => arttir(1)}>1 Arttır</button>
        <button onClick={() => arttir(5)}>5 Arttır</button>
      </div>
    </div>
  );
}
