import Link from "next/link";

function ArticleCard({ title, src, href, viewAll }) {
  if (viewAll) {
    const common = 'https://www.oruphones.com/blog/';
    return (
      <Link href={`${common}`}>
        <a className="w-full h-full rounded p-4 bg-white cardShadow1 flex justify-center items-center" target="_blank">
          <p className="block text-primary">{"Show All"}</p>
        </a>
      </Link>
    );
  }
  return (
    <Link href={`${href}`}>
      <a className="w-full h-full rounded-md flex flex-col items-center bg-white cardShadow1" target="_blank">
        <div className="w-full h-full relative inset-0" style={{}}>
          <img src={src} alt={title} className="h-200 w-200" />
        </div>
        <div className="py-2 px-3 w-full text-m-grey-1">
          <p className="line-clamp-2 text-sm">{title}</p>
        </div>
      </a>
    </Link>
  );
}

export default ArticleCard;
