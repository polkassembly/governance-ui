import { Link } from 'react-router-dom';
import { Network } from 'src/network';

const logoUrl = new URL(
  '../../../assets/icons/pa-logo.svg',
  import.meta.url
).toString();

const PARedirectionCard = ({ network }: { network: Network }) => {
  return (
    <div>
      <Link
        to={`https://${network?.toLowerCase()}.polkassembly.io/delegation`}
        target="_blank"
      >
        <div className="pa-info-board flex h-20 w-full items-center justify-center rounded-b-[20px] text-white">
          <div className="font-poppins flex items-center gap-1 text-base font-medium">
            <span> Try Delegation on </span>

            <img
              className="cursor-pointer"
              src={logoUrl}
              height={120}
              width={120}
              alt=""
            />
            <span> for a seamless experience!</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default PARedirectionCard;
