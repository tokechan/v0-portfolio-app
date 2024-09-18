import { useState, useEffect, useReducer } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, loginWithGoogle, logout } from "../lib/firebase";  // authのインポートを確認

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // authが存在しない場合、nullチェックを追加
    if (!auth) {
        console.error("Firebase auth is not initialized properly.");
        return <div>Error: Firebase auth is not initialized.</div>;
    }
    //フックを使用して認証状態を確認
    const [user, loading, error] = auth ? useAuthState(auth) : [null, false, "Auth not initialized"];

    //authオブジェクトが初期化されているかログを確認する
    useEffect(() => {
        console.log("auth object initialized:", auth);
    }, [auth]);

    //ローディング中はLoading..を表示
    if (loading) {
        return <div>Loading...</div>;
    }
    //useAuthStaeからエラーが返ってきた場合のエラーハンドリング
    if (error) {
        console.error("Error with useAuthState:", error);
        return <div>Error: Failed to retrieve authentication state.</div>;
    }


    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    {/* ハンバーガーメニュー（モバイル用） */}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/*gogle login btn */}
                        <h1 className="text-white text-xl">Video Creator</h1>
                        {!user ? (
                            <button onClick={loginWithGoogle} className="text-white bg-blue-500 px-4 py-2 rounded-md">
                                Login with Google
                            </button>
                        ) : (
                            <div className="flex items-center">
                                <img src={user.photoURL} alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
                                <span className="text-white mr-4">{user.displayName}</span>
                                <button onClick={logout} className="text-white bg-red-500 px-4 py-2 rounded-md">
                                    Logout
                                </button>
                            </div>
                        )}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* デスクトップ用メニュー */}
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0">
                            <h1 className="text-white text-2xl font-bold">Video Creator</h1>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                                <a href="/upload" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Upload</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* モバイル用のメニュー */}
            <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
                    <a href="/upload" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Upload</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
