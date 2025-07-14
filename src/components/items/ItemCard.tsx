"use client";

import Image from 'next/image';
import { ItemReport } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { doc, deleteDoc } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { deleteObject, ref } from 'firebase/storage';

interface ItemCardProps {
  item: ItemReport;
}

export function ItemCard({ item }: ItemCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const isOwner = user?.uid === item.userId;

  const handleDelete = async () => {
    try {
      const collectionName = item.type === 'lost' ? 'lostItems' : 'foundItems';
      await deleteDoc(doc(db, collectionName, item.id));

      if (item.imageUrl) {
        const imageRef = ref(storage, item.imageUrl);
        await deleteObject(imageRef);
      }
      
      toast({
        title: "Success",
        description: "Your report has been deleted.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete the report. Please try again.",
      });
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="relative">
            <Badge className={`absolute top-2 right-2 ${item.type === 'lost' ? 'bg-destructive' : 'bg-green-500'} text-white`}>
                {item.type.toUpperCase()}
            </Badge>
            {isOwner && (
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                         <Button variant="destructive" size="icon" className="absolute top-2 left-2 h-7 w-7 opacity-80 hover:opacity-100">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your item report.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
            <div className="aspect-video w-full relative bg-muted rounded-md overflow-hidden">
                <Image
                    src={item.imageUrl || `https://placehold.co/600x400.png?text=${item.itemName}`}
                    alt={item.itemName}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint="item image"
                />
            </div>
        </div>
        <CardTitle className="mt-4 font-headline">{item.itemName}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-sm text-muted-foreground space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{item.date.toDate().toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Badge variant="secondary">{item.category}</Badge>
      </CardFooter>
    </Card>
  );
}
