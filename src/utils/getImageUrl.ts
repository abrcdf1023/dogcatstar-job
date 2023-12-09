export default function getImageUrl(path: string, width: number, height: number) {
  return `${process.env.NEXT_PUBLIC_IMAGE_BASE}/t/p/w${width}_and_h${height}_multi_faces/${path}`
}