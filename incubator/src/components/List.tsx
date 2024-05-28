type ListProps = {
    list: string[];
    title:string,
};

const List = ({
    list,
    title,
}: ListProps): JSX.Element => {
    const initialArray: JSX.Element[] = [];
    const items = list.reduce((p, c) => {
        const temp = <li>{c}</li>;
        p.push(temp);
        return p;
    }, initialArray);

    return <ul title={title}>{items}</ul>;
};

export default List;