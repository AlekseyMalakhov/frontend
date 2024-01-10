import { useLoading } from "../hooks/useLoading";

export default function Loading() {
    const { loading } = useLoading();

    if (!loading) {
        return null;
    }

    return <div className="loading">Loading...</div>;
}
