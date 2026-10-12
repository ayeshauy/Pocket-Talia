const Logo = ({ size = 36 }) => (
  <img
    src="/logo.jpg"
    alt="Pocket Talia logo"
    width={size}
    height={size}
    className="rounded-xl ring-1 ring-white/10"
    style={{ width: size, height: size, objectFit: "cover" }}
  />
);

export default Logo;
