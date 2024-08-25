import { useEffect, useState } from "react";
import supabase from "../config/supaBaseClient";

export default function useQuery<T>(table: string, isSingle: boolean, from: number, to: number, _id?: number, filter?: string, modifier?: string): { loading: boolean, data: T, error?: string, refresh?: () => any } {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        setLoading(true);
        const { data, error } = isSingle ?
            await supabase.from(table).select(filter).limit(1).single()
            : await supabase.from(table).select(filter).range(from, to);
        setLoading(false);
        if (data) {
            setData(data as T);
        }
        if (error) {
            setError(error.message);
        }
    }

    const refresh = () => getData();

    return { data: data as T, loading, error, refresh }
}