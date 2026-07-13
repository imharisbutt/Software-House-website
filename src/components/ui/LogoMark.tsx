import logo from "../../assets/devsloop-logo.png";

interface LogoMarkProps {
  /** Rendered height in px */
  height?: number;
}

export function LogoMark({ height = 30 }: LogoMarkProps) {
  return (
    <img
      src={logo}
      alt="Devsloop"
      width={Math.round(height * (1060 / 296))}
      height={height}
      className="brandLogo"
      style={{ height, width: "auto", aspectRatio: "1060 / 296", display: "block" }}
    />
  );
}
