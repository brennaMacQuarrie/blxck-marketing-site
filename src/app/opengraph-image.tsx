import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "BLXCK Marketing — Make your business impossible to ignore.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Site-wide sharing image (pages with their own opengraph-image override it). */
export default async function Image() {
  const [milker, wordmark] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/Milker.otf")),
    readFile(join(process.cwd(), "public/logos/blxck-wordmark-full.png")),
  ]);
  const logo = `data:image/png;base64,${wordmark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "radial-gradient(circle at 92% 0%, #16363a 0%, #050506 58%)",
          padding: "84px 84px 72px",
          fontFamily: "Milker",
          color: "#f4f5f7",
        }}
      >
        {/* top accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 6,
            background: "linear-gradient(90deg, #7ebec5, #b794df, #cca95d)",
          }}
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={760} height={80} alt="" />

        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, lineHeight: 1.02, letterSpacing: -1 }}>
          <span>Make your business</span>
          <span style={{ color: "#7ebec5" }}>impossible to ignore.</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 2,
            color: "#9a9ca3",
          }}
        >
          <span>Edmonton, Alberta</span>
          <span style={{ color: "#f4f5f7" }}>blxckmarketing.com</span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Milker", data: milker, style: "normal", weight: 400 }] },
  );
}
