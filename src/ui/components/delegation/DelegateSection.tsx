import { useState } from 'react';
import { Delegate, State } from '../../../lifecycle/types.js';
import { useDelegation } from '../../../contexts/Delegation';
import { flattenAllTracks } from '../../../lifecycle';
import SectionTitle from '../SectionTitle.js';
import { Button } from '../../lib';
import { AddIcon } from '../../icons/index.js';
import { DelegateCard } from './DelegateCard.js';
import { AddDelegateModal } from './delegateModal/AddDelegateModal.js';
import { TxnModal } from './delegateModal/TxnModal.js';
import { Network } from 'src/network.js';

const redirectUrl = new URL(
  '~assets/icons/redirect.svg',
  import.meta.url
).toString();

export const DelegateSection = ({
  state,
  delegates,
  network,
}: {
  state: State;
  delegates: Delegate[];
  network: Network;
}) => {
  const [search, setSearch] = useState<string>();
  const [addAddressVisible, setAddAddressVisible] = useState(false);
  const [delegateVisible, setDelegateVisible] = useState(false);
  const [delegate, setDelegate] = useState('');
  const { selectedTrackIndexes } = useDelegation();
  const allTracks = flattenAllTracks(state.tracks);
  const selectedTracks = Array.from(selectedTrackIndexes.entries()).map(
    ([id]) => allTracks.get(id)!
  );

  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <SectionTitle
          title={
            <div className="flex h-6 items-center gap-1">
              <span className="font-unbounded text-2xl">Browse Deleagtes</span>
              <span className="cursor-pointer text-xs text-primary ">
                <a
                  href={`https://${network?.toLowerCase()}.polkassembly.io/delegation`}
                  className="-mb-2 flex gap-1 font-semibold"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Delegates on Polkassembly{' '}
                  <img
                    className="cursor-pointer"
                    src={redirectUrl}
                    height={12}
                    width={12}
                    alt=""
                  />
                </a>
              </span>
            </div>
          }
          description={
            delegates.length > 0 ? (
              <span>
                There are currently <b>{delegates.length}</b> delegates.
              </span>
            ) : (
              <span className="text-fg-disabled">
                Failed to fetch delegates.
              </span>
            )
          }
        ></SectionTitle>
        <div className="flex flex-col gap-12">
          <div className="sticky flex w-full flex-col items-center justify-between gap-4 bg-bg-default/80 px-3 py-3 backdrop-blur-sm md:flex-row lg:top-44 lg:px-8">
            <div className="flex w-full flex-row items-center justify-between gap-4">
              <Button
                variant="ghost"
                className="w-fit"
                onClick={() => setAddAddressVisible(true)}
              >
                <AddIcon />
                <div className="whitespace-nowrap">Add a delegate</div>
              </Button>
              <input
                placeholder="Search"
                className="w-full self-stretch rounded-lg bg-[#ebeaea] px-4 py-2 text-left text-sm text-black opacity-70 lg:w-fit"
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>
          {state.customDelegates?.length > 0 && (
            <div className="flex flex-col gap-4 px-3 lg:px-8">
              <div className="text-sm">Added manually</div>
              <div className="grid grid-cols-1 place-items-center  gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
                {state.customDelegates.map((delegate, idx) => (
                  <DelegateCard
                    key={idx}
                    delegate={delegate}
                    state={state}
                    variant="some"
                  />
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4">
            {state.customDelegates?.length > 0 && (
              <div className="px-3 text-sm lg:px-8">Public Delegates</div>
            )}
            <div className="grid grid-cols-1 place-items-center gap-2 px-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 lg:px-8">
              {delegates
                .filter((delegate) =>
                  search
                    ? delegate.name
                        ?.toLowerCase()
                        .includes(search.toLowerCase())
                    : true
                )
                .map((delegate, idx) => (
                  <DelegateCard
                    key={idx}
                    delegate={delegate}
                    state={state}
                    variant="some"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <AddDelegateModal
        open={addAddressVisible}
        onClose={() => setAddAddressVisible(false)}
        onAddressValidated={(address) => {
          setDelegate(address);
          setAddAddressVisible(false);
          setDelegateVisible(true);
        }}
      />
      {delegateVisible && (
        <TxnModal
          open={delegateVisible}
          onClose={() => setDelegateVisible(false)}
          delegate={delegate}
          selectedTracks={selectedTracks}
        />
      )}
    </>
  );
};
