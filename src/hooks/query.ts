import { useEffect, useState } from "react";
import supabase from "../config/supaBaseClient";
import { QueryProps } from "../types";

export default function useQuery<T>({
    _id,
    is_single = false,
    table,
    from = 0,
    to = 10,
    filter,
    modifier
}: QueryProps): { loading: boolean, data: T, error?: string, refresh: () => any, search: (text: string) => any } {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        setLoading(true);
        const { data, error } = is_single ?
            await supabase.from(table).select(filter).limit(1).single()
            : await supabase.from(table).select(filter).range(from as number, to as number);
        setLoading(false);
        if (data) {
            setData(data as T);
        }
        if (error) {
            setError(error.message);
        }
    }

    const search = async (searchText: string) => {
        const { data, error } = await supabase
            .from(table)
            .select('*')
            .or(searchText)

        if (error) {
            setError(error.message)
            return
        }
        setData(data as T);
        return data
    }

    const refresh = () => getData();

    return { data: data as T, loading, error, refresh, search }
}