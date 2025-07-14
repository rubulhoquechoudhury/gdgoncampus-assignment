import { ItemForm } from '@/components/items/ItemForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReportItemPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">Report an Item</CardTitle>
                    <CardDescription>
                        Fill out the form below to report a lost or found item. The more details you provide, the better.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ItemForm />
                </CardContent>
            </Card>
        </div>
    );
}
