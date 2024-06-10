
export type DateRangeProps = {
    startYear: string,
    endYear: string,
    id: string
}

export default function DateRange(props: DateRangeProps){
    const start = new Date(props.startYear);
    const end = new Date(props.endYear);
    return (
        <p id={props.id} className="sub-content">
            {start.toLocaleString('default', { month: 'short' })}, {start.getFullYear()} - {end != "Invalid Date" ? end.toLocaleString('default', { month: 'short' }) + ', ' + end.getFullYear() : 'Present'}
        </p>
    );
};
