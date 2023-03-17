const ProductSkeletonCard = ({ isOtherListing, isBestDeal }) => {
  if (isBestDeal) {
    return (
      <div className="rounded-md shadow p-2 py-10 space-y-3 mx-2 my-2 bg-white">
        <div className="animate-pulse flex flex-row-reverse gap-4 px-3 items-center justify-between">
          <div className="bg-gray-300 h-32 w-20 rounded-lg"></div>
          <div className="justify-start">
            <div className="bg-gray-300 h-4 w-24 rounded-md mb-2"></div>
            <div className="bg-gray-300 h-4 w-16 rounded-md mb-2"></div>
            <div className="bg-gray-300 h-4 w-16 rounded-md mb-4"></div>
            <div className="bg-gray-300 mt-8 h-8 w-20 rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }
  if (isOtherListing) {
    return (
      <div className="rounded-md shadow p-2 pb-6 space-y-3 mx-2 mb-2">
        <div className="flex flex-row justify-center">
          <div className="animate-pulse flex flex-col gap-4 items-center">
            <div className="bg-gray-300 h-16 w-16 rounded-full"></div>
            <div className="justify-start items-start gap-3 space-y-2">
              <div className="bg-gray-300 h-4 w-24 rounded-md"></div>
              <div className="bg-gray-300 h-4 w-16 rounded-md"></div>
              <div className="bg-gray-300 h-4 w-16 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductSkeletonCard;
