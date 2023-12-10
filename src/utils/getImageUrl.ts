export type Source = "face" | "multi_faces" | "bestv2";

export default function getImageUrl(path: string, width: number, height: number, source: Source) {
  return `${process.env.NEXT_PUBLIC_IMAGE_BASE}/t/p/w${width}_and_h${height}_${source}${path}`;
}
