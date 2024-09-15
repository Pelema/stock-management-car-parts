import { useEffect, useState } from "react";
import supabase from "../config/supaBaseClient";
import { Session, User } from "@supabase/supabase-js";
import { UserInputs } from "../types";

export default function useAdmin() {

    const [data, setData] = useState<User[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getUsers();
    }, [])

    // useEffect(() => {
    //     (async () => {
    //         const { data, error } = await supabase.auth.getSession();
    //         if (data) {
    //             setSession(data.session);
    //         }
    //     })

    // }, [])

    // const getUser = async () => {
    //     setLoading(true);
    //     const { data } = await supabase.auth.getUser();
    //     setLoading(false);
    //     if (data) {
    //         setData(data.user);
    //     }
    // }

    const getUsers = async () => {
        setLoading(true);
        const { data: { users }, error } = await supabase.auth.admin.listUsers()
        setLoading(false);
        if (data) {
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
            return
        }
        getUsers()
        return data;
    }

    const updateUser = async (id: string, user: UserInputs) => {
        setLoading(true);
        const { error } = await supabase.auth.admin.updateUserById(
            id, { ...user }
        );
        setLoading(false);
        if (error) {
            setError(error.message);
            return
        }
        setData(null);
    }

    const deleteUser = async (id: string) => {
        setLoading(true);
        const { data, error } = await supabase.auth.admin.deleteUser(id);
        if (error) {
            setError(error.message);
            return
        }
        return data;
    }

    return { data, loading, error, createUser, deleteUser, updateUser }
}