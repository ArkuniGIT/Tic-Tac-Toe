import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { MatchModel } from "shared";
import useSWR from "swr";

export const useApiCreateMatch = (resolved?: (res: MatchModel) => void) =>
{
    const snackbar = useSnackbar();
    const [loading, setLoading] = useState(false);

    const invoke = async () =>
    {
        setLoading(true);

        try 
        {
            const res = await axios.post<MatchModel>("/match/create");

            if (resolved)
                resolved(res.data);
        }
        catch (err: any)
        {
            snackbar.enqueueSnackbar(err, { variant: "error" });
        }
        finally
        {
            setLoading(false);
        }
    }

    return {
        invoke,
        loading,
    }
}