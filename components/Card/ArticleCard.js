import Link from "next/link";
import Image from "next/image";

function ArticleCard({ title, src, href, viewAll }) {
  if (viewAll) {
    return (
      <Link href={`#blogs${href}`}>
        <a className="w-full h-full rounded p-4 bg-white cardShadow1 flex justify-center items-center">
          <p className="block text-primary">{"Show All"}</p>
        </a>
      </Link>
    );
  }
  return (
    <Link href={`#blogs${href}`}>
      <a className="w-full h-full rounded-md flex flex-col items-center bg-white cardShadow1">
        <div className="w-full h-full relative inset-0" style={{}}>
          <Image src={src} alt={title} width={"100%"} height={"100%"} objectFit="contain" layout="responsive" className="rounded-t-md" />
        </div>
        <div className="py-2 px-3 w-full text-m-grey-1">
          <p className="line-clamp-2 text-sm">{title}</p>
        </div>
      </a>
    </Link>
  );
}

export default ArticleCard;
