import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import supabase from "../config/supaBaseClient";
import { UserInputs } from "../types";

export default function useAdmin() {

    const [data, setData] = useState<User[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        setLoading(true);
        const { data: { users }, error } = await supabase.auth.admin.listUsers()
        setLoading(false);
        if(error) {
            setError(error.message);
            return
        }
        if (users) {
            setData(users);
        }
    }

    const createUser = async ({ email, password, phone, role, fullname }: UserInputs) => {
        setLoading(true);
        setError("");
        const { error } = await supabase.auth.admin.createUser({
            email,
            password,
            phone,
            user_metadata: { fullname, role },
            email_confirm: true,
            phone_confirm: true
        });
        setLoading(false);
        if (error) {
            setError(error.message);
            return { data: null, error: error }
        }
        getUsers()
        return { data, error: error };
    }

    const updateUser = async (id: string, { email, password, phone, role, fullname }: UserInputs) => {
        setLoading(true);
        const { data, error } = await supabase.auth.admin.updateUserById(
            id, {
            email,
            password,
            phone,
            user_metadata: { fullname, role },
            email_confirm: true,
            phone_confirm: true
        }
        );
        setLoading(false);
        if (error) {
            setError(error.message);
            return { data: null, error: error }
        }
        getUsers();
        return { data, error: null }
    }

    const deleteUser = async (id: string) => {
        setLoading(true);
        const { data, error } = await supabase.auth.admin.deleteUser(id);
        setLoading(false);
        if (error) {
            setError(error.message);
            return { data: null, error: error }
        }
        return { data, error: null }
    }

    const refresh = () => getUsers();

    return { data, loading, error, createUser, deleteUser, updateUser, refresh }
}