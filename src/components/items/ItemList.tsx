import { ItemReport } from '@/types';
import { ItemCard } from './ItemCard';

interface ItemListProps {
  items: ItemReport[];
}

export function ItemList({ items }: ItemListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
