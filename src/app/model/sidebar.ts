export interface SidebarItem {
    id: string;
    title: string;
    type: 'item' | 'collapse';
    icon?: string;
    url?: string;
    children?: SidebarItem[];
    _featureId?: string;
    hideInBreadcrumb?: boolean;
    showDropdown?: boolean;
}
