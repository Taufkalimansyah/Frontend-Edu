import KelasCard from "./KelasCard";

export default function KelasGrid({ 
    classes, 
    onCardClick,
    onEditClick,
    onDeleteClick
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls) => (
                <KelasCard
                    key={cls.id}
                    kelas={cls}
                    onClick={onCardClick}
                    onEditClick={onEditClick}
                    onDeleteClick={onDeleteClick}
                />
            ))}
        </div>
    );
}