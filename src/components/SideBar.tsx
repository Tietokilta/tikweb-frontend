import { NavigationItem } from "../types/strapi";

export interface SideBarProps {
    items: NavigationItem[];
    children: any;
}

const SubItem: React.FC<NavigationItem> = (props: NavigationItem) => {
    const { title, parentSlug, navigatesTo } = props;
    return (
        <a className="pt-1 px-2" href={`/${parentSlug}/${navigatesTo.slug}`}>{title}</a>
    )
}

const Item: React.FC<NavigationItem> = (props: NavigationItem) => {
    const { navigatesTo, subItems } = props;
    return (
        <>
            <a className="mt-4 font-mono font-semibold" href={`/${navigatesTo.slug}`}>{navigatesTo.title}</a>
            {subItems?.map(x => <SubItem key={x.title} title={x.title} parentSlug={navigatesTo.slug} navigatesTo={x.navigatesTo} />)}
        </>
    )
}

const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
    const { items, children } = props;
    return (
        <div className="flex flex-row">
            <div className="flex flex-col flex-grow bg-gray-darkest text-white pt-5 pl-10 pr-5">
                {items.map(x => <Item key={x.title} title={x.title} navigatesTo={x.navigatesTo} subItems={x.subItems} />)}
            </div>
            <div className="flex flex-col">
                {children}
            </div>
        </div>
    )
}

export default SideBar
