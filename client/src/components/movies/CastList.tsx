import { ReactNode, useEffect, useState } from "react";
import { DefaultService, Person } from "../../api";

const personCard = (person: Person) => {
    return (
        <div className="block w-full h-24 border-black border">
            <img src={person.picture} className="block aspect-square w-20 object-contain"/>
            <span className="block">{person.name}</span>
            <span className="block">{person.character}</span>
        </div>
    )
};

const CastList = (id: number) => {
    const [cast, setCast] = useState<ReactNode[]>([]);

    useEffect(() => {
        DefaultService.getMovieCast(id)
        .then((result) => {
            setCast(result.map(personCard));
            console.log(result)
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    }, []);

    return (
        <div className="block overflow-y-scroll">
            {cast}
        </div>
    )
};

export default CastList;