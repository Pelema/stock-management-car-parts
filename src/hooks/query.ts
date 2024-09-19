/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import supabase from "../config/supaBaseClient";
import { QueryProps } from "../types";

export default function useQuery<T>({
    is_single = false,
    table,
    from = 0,
    to = 10,
    filter
}: QueryProps): { loading: boolean, data: T, error?: string, refresh: () => any, search: (text: string) => any, count: number } {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        getData();
    }, [from, to])

    const getData = async () => {
        setLoading(true);
        const { data, error, count } = is_single ?
            await supabase.from(table).select(filter).limit(1).single()
            : await supabase.from(table).select(filter, { count: 'exact' }).range(from as number, to as number);
        setLoading(false);
        if (data) {
            setData(data as T);
            setCount(count as number);
        }
        if (error) {
            setError(error.message);
        }
    }

    const search = async (searchText: string) => {
        setLoading(true);
        const { data, error } = await supabase
            .from(table)
            .select(filter)
            .or(searchText)
            
        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }
        setLoading(false)
        setData(data as T);
        return data
    }

    const refresh = () => getData();

    return { data: data as T, loading, error, refresh, search, count }
}