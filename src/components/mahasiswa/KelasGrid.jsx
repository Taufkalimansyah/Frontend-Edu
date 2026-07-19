import KelasCard from "./KelasCard";
import KelasEmpty from "./KelasEmpty";

export default function KelasGrid({ kelasList, onCardClick }) {
    if (kelasList.length === 0) {
        return <KelasEmpty />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kelasList.map(item => (
                <KelasCard key={item.id} item={item} onClick={onCardClick} />
            ))}
        </div>
    );
}