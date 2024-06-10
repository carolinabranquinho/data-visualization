import { useMemo } from 'react';
import { BookType } from '../components/Table';

type filtersType = 'author' | 'genre' | 'publication' | 'rating' | 'price' | 'title' | 'url' | 'Rank';

function useGroupBy(data: BookType[], key: filtersType) {
    return useMemo(() => {
        const groupedObject = data.reduce<{ [key: string]: BookType[] }>((acc, item) => {
            const keyValue = item[key] as unknown as string;
            if (!acc[keyValue]) {
                acc[keyValue] = [];
            }
            acc[keyValue].push(item);
            return acc;
        }, {});

        return Object.entries(groupedObject).map(([groupKey, items]) => ({
            key: groupKey,
            items: items
        }));
    }, [data, key]);
}

export default useGroupBy;
