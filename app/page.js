"use client";

import { Button } from "@/components/Button";

export default function page() {
  function butonaBas() {
    console.log("Ana ekrandaki butona basıldı");
  }

  function baskaBirFonksiyon() {
    console.log("ne yazcam bilmiyorum");
  }

  return (
    <div>
      Ana Ekran
      <Button title={"hrhangi bir başlık"} onClick={butonaBas} />
      <Button title="ikinci buton" onClick={baskaBirFonksiyon} />
    </div>
  );
}
