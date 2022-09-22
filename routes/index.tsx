import EmbedText from "../islands/EmbedText.tsx";
import QrImage from "../islands/QrImage.tsx";
import QrInput from "../islands/QrInput.tsx";
import { PageProps } from "$fresh/server.ts"

export default function Home(props: PageProps) {
  return (
    <div class="absolute inset-0 flex justify-center items-center flex-col gap-2">
      <QrInput />
      <QrImage />
      <div>Embed this QR code in your html</div>
      <EmbedText thisUrl={new URL(props.url)}/>
    </div>
  );
}
