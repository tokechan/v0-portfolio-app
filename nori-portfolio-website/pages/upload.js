import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { auth } from "../lib/firebase";  // Firebaseの認証をインポート
import Navbar from "../components/Navbar";
import UploadForm from "../components/UploadForm";

export default function Upload() {
    const router = useRouter();
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (!loading && !user) {
            // ユーザーがログインしていない場合、ログインページにリダイレクト
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return <div>Loading...</div>;  // 認証状態がロード中の場合に表示
    }

    if (!user) {
        return null;  // ログインしていない場合は何も表示しない（リダイレクト処理が行われるため）
    }

    return (
        <div>
            <Navbar />
            <main className="p-8">
                <h1 className="text-2xl font-bold mb-4">Upload Your Media</h1>
                <UploadForm />
            </main>
        </div>
    );
}
