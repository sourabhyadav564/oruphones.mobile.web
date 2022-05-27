import { fetchWebLinkByShareId } from "api-call";

function Share(){
     return(<></>);
}

export default Share;


export async function getServerSideProps({query }) {
  try{
    const listingInfo = await fetchWebLinkByShareId(query.lid);
    return {
      redirect: {
        destination: `/product/listings/${listingInfo?.dataObject.make}/${listingInfo?.dataObject.marketingName}/${listingInfo?.dataObject.listingId}?isOtherVendor=N`,
        permanent: false,
      },
      props: {},
    };
  }catch(error){
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }
    
  }
  