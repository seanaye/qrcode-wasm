import { qrData } from "../utils/qrData.ts";

export default function QrInput() {
  return (
    <input
      onInput={(e) => {
        const u = e.currentTarget.value;
        console.log({ u });
        qrData.value = u;
      }}
      autoFocus
      value={qrData.value}
      class="border rounded px-2 py-1"
    />
  );
}
