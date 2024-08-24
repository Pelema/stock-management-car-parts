import { useEffect, useState } from "react";
import supabase from "../config/supaBaseClient";

export default function useQuery<T>(table: string, isSingle: boolean, from: number, to: number, _id?: number, filter?: string, modifier?: string): { loading: boolean, data: T, error?: string, refresh?: () => void } {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        (async () => {
            const { data, error } = isSingle ?
                await supabase.from(table).select(filter).limit(1).single()
                : await supabase.from(table).select(filter).range(from, to);
            setLoading(false);
            if (data) {
                console.log('Data ', data);

                setData(data as T);
            }
            if (error) {
                setError(error.message);
            }
        })
    }, [])

    const refresh = async () => {
        setLoading(true);
        const { data, error } = await supabase.from(table).select(filter || modifier);
        setLoading(false);
        if (error) {
            setError(error.message);
        }
        setData(data as T);
    }

    return { data: data as T, loading, error, refresh }
}