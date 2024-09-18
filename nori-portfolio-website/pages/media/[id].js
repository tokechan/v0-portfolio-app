import { fetchMediaData, fetchMediaDataById } from "../../lib/firebase";  // Firestoreからデータを取得

// 動的パスを生成
export async function getStaticPaths() {
    // Firestoreから全メディアのデータを取得
    const mediaItems = await fetchMediaData();  // 全メディアデータを取得

    // 取得したメディアIDに基づいてパスを生成
    const paths = mediaItems.map((item) => ({
        params: { id: item.id },  // 各メディアのIDをパスに設定
    }));

    return { paths, fallback: false };  // fallback: false で、存在しないIDは404エラーを返す
}

// 静的プロップスを生成
export async function getStaticProps({ params }) {
    // Firestoreから特定のメディアIDに基づいてデータを取得
    const mediaItem = await fetchMediaDataById(params.id);

    return {
        props: {
            mediaItem,  // ページに渡すメディアデータ
        },
    };
}

// メディア詳細ページのコンポーネント
const MediaDetail = ({ mediaItem }) => {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">{mediaItem.title}</h1>
            <img src={mediaItem.secure_url} alt={mediaItem.title} className="w-full h-auto" />
            <p className="mt-4">{mediaItem.description}</p>
        </div>
    );
};

export default MediaDetail;
