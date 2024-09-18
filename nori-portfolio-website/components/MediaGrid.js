const MediaGrid = ({ mediaItems }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {mediaItems.map((item) => (
                <div key={item.id} className="border rounded shadow p-4">
                    <img src={item.secure_url} alt={item.title} className="w-full h-auto" />
                    <h3 className="text-lg font-bold mt-2">{item.title}</h3>
                </div>
            ))}
        </div>
    );
};

export default MediaGrid;
