import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "BLXCK Marketing — Medical Marketing Solutions: built for the health categories that are hard to market.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const milker = await readFile(
    join(process.cwd(), "public/fonts/Milker.otf"),
  );

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
          background: "#050506",
          padding: "68px 76px",
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

        {/* header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 34, letterSpacing: 10 }}>BLXCK</div>
          <div
            style={{
              display: "flex",
              fontSize: 17,
              letterSpacing: 5,
              color: "#7ebec5",
            }}
          >
            MEDICAL MARKETING SOLUTIONS
          </div>
        </div>

        {/* headline */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 72,
            lineHeight: 1.04,
            letterSpacing: -1,
            maxWidth: 1000,
          }}
        >
          <span>Built for the health categories&nbsp;</span>
          <span style={{ color: "#7ebec5" }}>that are hard to market.</span>
        </div>

        {/* footer row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 19,
            color: "#bcbebe",
          }}
        >
          <div style={{ display: "flex" }}>
            Psychedelics • Cannabis • Aesthetics • Optometry • Clinic Networks
          </div>
          <div style={{ display: "flex", color: "#f4f5f7" }}>
            blxckmarketing.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Milker", data: milker, style: "normal", weight: 400 }],
    },
  );
}
