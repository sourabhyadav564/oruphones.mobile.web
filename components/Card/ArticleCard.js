import Link from "next/link";
import Image from "next/image";

function ArticleCard({ title, src, href, viewAll }) {
  if (viewAll) {
    const common = 'https://www.oruphones.com/blog/';
    return (
      // <Link href={`#blogs${href}`}>
      <Link href={`${common}`}>
        <a className="w-full h-full rounded p-4 bg-white cardShadow1 flex justify-center items-center" target="_blank">
          <p className="block text-primary">{"Show All"}</p>
        </a>
      </Link>
      // </Link>
    );
  }
  return (
    // <Link href={`#blogs${href}`}>
    <Link href={`${href}`}>
      <a className="w-full h-full rounded-md flex flex-col items-center bg-white cardShadow1" target="_blank">
        <div className="w-full h-full relative inset-0" style={{}}>
          {/* <Image src={src} alt={title} width={"100%"} height={"100%"} objectFit="contain" layout="responsive" className="rounded-t-md" /> */}
          <img src={src} alt={title} className="h-200 w-200" />
        </div>
        <div className="py-2 px-3 w-full text-m-grey-1">
          <p className="line-clamp-2 text-sm">{title}</p>
        </div>
      </a>
    </Link>
    // </Link>
  );
}

export default ArticleCard;
