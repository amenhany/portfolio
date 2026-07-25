import SlidingIcon from './SlidingIcon';

export default function DistributedMarketplaceTitle() {
   return (
      <SlidingIcon
         text={
            <>
               Distributed
               <br className="block sm:hidden" />
               <span className="hidden sm:inline"> </span>
               Marketplace
            </>
         }
         icon="/images/marketplace.png"
      />
   );
}
