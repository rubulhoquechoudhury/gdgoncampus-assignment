"use client";

import { useState, useEffect, useMemo } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { ItemReport, ItemCategory } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ItemList } from './ItemList';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, PackageOpen } from 'lucide-react';

export function ItemsDashboard() {
  const { user } = useAuth();
  const [lostItems, setLostItems] = useState<ItemReport[]>([]);
  const [foundItems, setFoundItems] = useState<ItemReport[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'lost' | 'found'>('all');
  const [filterCategory, setFilterCategory] = useState<ItemCategory | 'all'>('all');

  useEffect(() => {
    setLoading(true);
    const lostQuery = query(collection(db, 'lostItems'), orderBy('createdAt', 'desc'));
    const foundQuery = query(collection(db, 'foundItems'), orderBy('createdAt', 'desc'));

    const unsubLost = onSnapshot(lostQuery, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ItemReport));
      setLostItems(items);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching lost items:", error);
        setLoading(false);
    });

    const unsubFound = onSnapshot(foundQuery, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ItemReport));
      setFoundItems(items);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching found items:", error);
        setLoading(false);
    });

    return () => {
      unsubLost();
      unsubFound();
    };
  }, []);

  const allItems = useMemo(() => [...lostItems, ...foundItems].sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()), [lostItems, foundItems]);

  const filteredItems = useMemo(() => {
    let itemsToFilter = activeTab === 'my-reports' 
      ? allItems.filter(item => item.userId === user?.uid)
      : allItems;

    if (filterType !== 'all') {
      itemsToFilter = itemsToFilter.filter(item => item.type === filterType);
    }
    if (filterCategory !== 'all') {
      itemsToFilter = itemsToFilter.filter(item => item.category === filterCategory);
    }
    if (searchTerm) {
      itemsToFilter = itemsToFilter.filter(item =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return itemsToFilter;
  }, [activeTab, allItems, filterType, filterCategory, searchTerm, user]);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 w-full rounded-lg" />)}
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-16">
        <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No items found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
            {activeTab === 'my-reports' ? "You haven't reported any items yet." : "Try adjusting your filters or check back later."}
        </p>
    </div>
  );

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <TabsList>
          <TabsTrigger value="all">All Items</TabsTrigger>
          {user && <TabsTrigger value="my-reports">My Reports</TabsTrigger>}
        </TabsList>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
            <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search items..." className="pl-9 w-full sm:w-64" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex gap-2">
                <Select value={filterType} onValueChange={(value) => setFilterType(value as any)}>
                    <SelectTrigger className="w-full sm:w-[120px]">
                        <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="lost">Lost</SelectItem>
                        <SelectItem value="found">Found</SelectItem>
                    </SelectContent>
                </Select>
                 <Select value={filterCategory} onValueChange={(value) => setFilterCategory(value as any)}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="ID Card">ID Card</SelectItem>
                        <SelectItem value="Book">Book</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
      </div>
      <TabsContent value="all">
        {loading ? <LoadingSkeleton /> : filteredItems.length > 0 ? <ItemList items={filteredItems} /> : <EmptyState />}
      </TabsContent>
      <TabsContent value="my-reports">
        {loading ? <LoadingSkeleton /> : filteredItems.length > 0 ? <ItemList items={filteredItems} /> : <EmptyState />}
      </TabsContent>
    </Tabs>
  );
}
