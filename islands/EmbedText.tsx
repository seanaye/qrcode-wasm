import { qrData } from "../utils/qrData.ts";

export default function EmbedText(props: { thisUrl: URL }) {
  const url = new URL(props.thisUrl);
  const data = qrData.value;
  url.pathname = "/api";
  url.search = new URLSearchParams({ data }).toString();
  return <textarea readOnly class="w-96 h-20 border">{`<img src="${url.toString()}" />`}</textarea>;
}
