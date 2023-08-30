import { ReactNode, useEffect, useState } from "react";
import { DefaultService, Person } from "../../api";

const personCard = (person: Person) => {
    return (
        <div className="block w-full h-24 bg-[rgba(32,32,32,0.25)] p-2">
            <img src={person.picture} alt="" className="inline aspect-square w-20 h-20 object-fill rounded-lg"/>
            <div className="inline-block ml-2 w-2/3  whitespace-nowrap overflow-clip text-ellipsis">
                <span className="block font-semibold">{person.name}</span>
                <span className="block">{person.character}</span>
            </div>
        </div>
    );
};

const CastList = (id: number) => {
    const [cast, setCast] = useState<ReactNode[]>([]);

    useEffect(() => {
        DefaultService.getMovieCast(id)
        .then((result) => {
            setCast(result.map(personCard));
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="overflow-y-scroll w-full h-full space-y-2">
            {cast}
        </div>
    );
};

export default CastList;