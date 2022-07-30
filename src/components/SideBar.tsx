import { NavigationItem } from "../types/strapi";
import { Link } from "gatsby"

export interface SideBarProps {
    items: NavigationItem[];
    children: any;
}

const SubItem: React.FC<NavigationItem> = (props: NavigationItem) => {
    const { title, parentSlug, navigatesTo } = props;
    return (
        <Link className="pt-1 px-2" to={`/${parentSlug}/${navigatesTo.slug}`}>{title}</Link>
    )
}

const Item: React.FC<NavigationItem> = (props: NavigationItem) => {
    const { navigatesTo, subItems } = props;
    return (
        <>
            <Link className="mt-4 font-mono font-semibold" to={`/${navigatesTo.slug}`}>{navigatesTo.title}</Link>
            {subItems?.map(x => <SubItem key={x.title} title={x.title} parentSlug={navigatesTo.slug} navigatesTo={x.navigatesTo} />)}
        </>
    )
}

const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
    const { items, children } = props;
    return (
        <div className="flex flex-row min-h-full">
            <div className="flex flex-col min-h-full bg-gray-darkest text-white pt-5 pl-10 pr-5">
                {items.map(x => <Item key={x.title} title={x.title} navigatesTo={x.navigatesTo} subItems={x.subItems} />)}
            </div>
            <div className="flex flex-col">
                {children}
            </div>
        </div>
    )
}

export default SideBar
