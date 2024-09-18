import axios from "axios";
import { useState } from "react";
import { saveMediaMetadata } from "../lib/firebase";  // Firestoreの関数をインポート

const UploadForm = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadUrl, setUploadUrl] = useState("");
    const [title, setTitle] = useState(""); //ユーザが入力するタイトル

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "your_preset");

        try {
            // Cloudinaryにファイルをアップロード
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/jqqnwyz2/upload",
                formData
            );
            const uploadedUrl = response.data.secure_url;
            setUploadUrl(uploadedUrl);  // アップロードされたURLを保存

            // Firestoreにメタデータを保存
            await saveMediaMetadata({
                title: "Sample Title", // 実際にはユーザーが入力する
                secure_url: uploadedUrl,
                createdAt: new Date(),
            });
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div className="p-4">
            <input type="file" onChange={handleFileChange} className="mb-4" />
            <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded-md">Upload</button>
            {uploadUrl && <div className="mt-4">
                <p>Uploaded file:</p>
                <img src={uploadUrl} alt="Uploaded file" className="mt-2 max-w-sm" />
            </div>}
        </div>
    );
};

export default UploadForm;
