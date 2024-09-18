import Navbar from "../components/Navbar";
import MediaGrid from "../components/MediaGrid";
import { useState, useEffect } from "react";
import { fetchMediaData } from "../lib/firebase";  // Firestoreのデータ取得関数をインポート


export default function Home() {
  // 仮のデータ
  const [mediaItems, setMediaItems] = useState([
    { id: 1, title: "Sample Image 1", secure_url: "https://via.placeholder.com/300" },
    { id: 2, title: "Sample Image 2", secure_url: "https://via.placeholder.com/300" },
    { id: 3, title: "Sample Image 3", secure_url: "https://via.placeholder.com/300" },
  ]);

  useEffect(() => {
    const loadMediaData = async () => {
      const mediaData = await fetchMediaData();
      setMediaItems(mediaData);  // Firestoreから取得したデータを設定
    };

    loadMediaData();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">Uploaded Media</h1>
        <MediaGrid mediaItems={mediaItems} />
      </main>
    </div>
  );
}
