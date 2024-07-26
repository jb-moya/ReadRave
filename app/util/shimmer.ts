export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="rgba(201, 115, 56, .5)" offset="0%" />
      <stop stop-color="rgba(165, 77, 39, 1)" offset="20%" />
      <stop stop-color="rgba(201, 115, 56, .5)" offset="40%" />
      <stop stop-color="rgba(201, 115, 56, .1)" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="rgba(201, 115, 56, 1)"/>
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str: string) =>
    typeof window === "undefined"
        ? Buffer.from(str).toString("base64")
        : window.btoa(str);


// code taken from: https://coderepository.codewithmarish.com/snippets/shimmer-effect-nextjs