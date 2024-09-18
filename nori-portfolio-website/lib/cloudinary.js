import { saveMediaMetadata } from "../lib/firebase";  // Firebaseからインポート

const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "your_preset");

    try {
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/your_cloud_name/upload",
            formData
        );
        const uploadedUrl = response.data.secure_url;

        // Firestoreにメタデータを保存
        await saveMediaMetadata({
            title: "Sample Title", // 実際にはユーザー入力
            secure_url: uploadedUrl,
            createdAt: new Date(),
        });
    } catch (error) {
        console.error("Error uploading file:", error);
    }
};
