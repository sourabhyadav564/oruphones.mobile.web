import { fetchWebLinkByShareId } from "api-call";
import Cookies from "js-cookie";

function Share() {
  return <></>;
}

export default Share;

export async function getServerSideProps({ query }) {
  const { cookies } = req.cookies;
  try {
    const listingInfo = await fetchWebLinkByShareId(
      query.lid,
      cookies.sessionId
    );
    return {
      redirect: {
        destination: `/product/buy-old-refurbished-used-mobiles/${listingInfo?.dataObject.make}/${listingInfo?.dataObject.marketingName}/${listingInfo?.dataObject.listingId}?isOtherVendor=N`,
        permanent: false,
      },
      props: {},
    };
  } catch (error) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }
}
