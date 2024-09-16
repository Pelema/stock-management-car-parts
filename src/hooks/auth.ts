import { useEffect, useState } from "react";
import supabase from "../config/supaBaseClient";
import { Session, User } from "@supabase/supabase-js";
import { UserInputs } from "../types";

export default function useAuth() {

    const [data, setData] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState<Session | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        setLoading(true);
        const { data } = await supabase.auth.getUser();
        setLoading(false);
        if (data) {
            setData(data.user);
        }
    }

    const signIn = async ({ email, password }: UserInputs) => {
        setLoading(true);
        setError("");
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        setLoading(false);
        if (error) {
            setError(error.message);
            return { data: null, error: error }
        }
        return { data, error: null };
    }

    const signOut = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        setLoading(false);
        if (error) {
            setError(error.message);
            return { data: null, error: error }
        }
        return { data: null, error: error }
    }

    const refresh = async () => {
        setLoading(true);
        const { data, error } = await supabase.auth.refreshSession();
        setLoading(false);
        if (error) {
            setError(error.message);
        }
        setData(data.user);
    }

    return { data, loading, error, signIn, signOut, session, refresh }
}