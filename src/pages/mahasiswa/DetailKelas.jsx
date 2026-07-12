import { useParams } from "react-router-dom";

export default function DetailKelas() {

    const { id } = useParams();

    return (
        <div>
            Detail kelas dengan ID: {id}
        </div>
    );
}