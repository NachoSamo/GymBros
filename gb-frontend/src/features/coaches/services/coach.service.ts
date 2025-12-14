import {http} from "../../../api/http"
export type Coach = {
    id: number;
    name: string;
    surname: string;
    email: string;
}

export async function getCoaches(name?: string): Promise<Coach[]> {
    const res = await http.get<Coach[]>("/coach",{
        params: name ? {name} : undefined,
        }
    )
    return res.data;
}