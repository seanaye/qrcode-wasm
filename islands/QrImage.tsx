import { qrData } from "../utils/qrData.ts";

export default function QrImage() {
  return <img src={`/api?data=${qrData.value}`} />
}
