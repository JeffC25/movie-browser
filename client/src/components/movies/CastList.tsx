import { ReactNode, useEffect, useState } from "react";
import { DefaultService, Person } from "../../api";

const personCard = (person: Person) => {
    return (
        <div className="grid grid-cols-3 w-full h-24 bg-[rgba(32,32,32,0.25)] p-2 " >
            <img src={person.picture} alt="" className="col-span-1 aspect-square w-20 h-20 object-cover rounded-sm"/>
            <div className="col-span-2 pl-2 h-20  overflow-clip text-ellipsis">
                <div className=" font-semibold">{person.name}</div>

                {person.character}
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