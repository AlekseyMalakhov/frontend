import { setLoading as setShowLoading } from "../store/manage";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

export const useLoading = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.manage.loading);

    const setLoading = (bool: boolean) => {
        dispatch(setShowLoading(bool));
    };

    return {
        setLoading,
        loading,
    };
};
