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
        setLoading(true);
        (async () => {
            const { data, error } = await supabase.auth.getUser();
            setLoading(false);
            if (data) {
                setData(data.user);
            }
            if (error) {
                setError(error.message);
            }
        })

    }, [])

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase.auth.getSession();
            if (data) {
                setSession(data.session);
            }
            if (error) {
                setError(error.message);
            }
        })

    }, [])

    const signIn = async ({ email, password }: UserInputs) => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        setLoading(false);
        if (error) {
            setError(error.message);
            return
        }
        return data?.user_metadata;
    }

    const signOut = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        setLoading(false);
        if (error) {
            setError(error.message);
        }
        setData(null);
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