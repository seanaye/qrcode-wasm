import { Handlers } from "$fresh/server.ts";
import { renderToString } from "preact-render-to-string";
import { instantiate } from "../../lib/rs_lib.generated.js";


const { encode } = await instantiate();

function template(s: string) {
  return `<?xml version="1.0" encoding="utf-8"?>${s}`
}

type Data = { arr: number[], size: number } | null

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const data = new URL(req.url).searchParams.get("data");
    if (!data) return ctx.render();
    const qr = encode(data);
    const arr = Array.from(qr)
    const size = Math.sqrt(arr.length)
    const vNode = <Home data={{ arr, size }} />
    const s = renderToString(vNode)
    return new Response(template(s), { headers: {
      'Content-Type': 'image/svg+xml'
    }})
  },
};

export default function Home({ data }: { data: Data }) {
  if (!data) return null;

  const viewBox = `0 0 ${data.size} ${data.size}`

  return (
    <svg viewBox={viewBox} width="200" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      {data.arr.map((e, i) =>
        <rect width="1" height="1" x={i % data.size} y={Math.floor(i / data.size)} fill={e ? "black" : "white"} />
      )}
    </svg>
  );
}
