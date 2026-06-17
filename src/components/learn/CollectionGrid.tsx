import CollectionCard from './CollectionCard';
import type { LearnCollection } from '../../types/learn';

type CollectionGridProps = {
  collections: LearnCollection[];
};

export default function CollectionGrid({ collections }: CollectionGridProps) {
  if (collections.length === 0) {
    return (
      <p className="py-8 text-center text-body-secondary-color">No collections match your search.</p>
    );
  }

  return (
    <section data-testid="landing-section">
      <div className="flex flex-col gap-12">
        <div className="grid auto-rows-auto gap-x-4 gap-y-4 sm:gap-x-6 sm:gap-y-6 md:grid-cols-1" role="list">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </section>
  );
}
