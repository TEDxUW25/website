'use client';

interface YearProps {
    image: string,
    yr: string
}

export default function Year(props: YearProps) {
    return (
        <div className="w-full">
            <img src={props.image}/>
        </div>
    );
}