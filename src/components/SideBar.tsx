import NavPages from "./NavPages"

export type SideBarProps = {
  children: React.ReactNode
}

const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
  const { children } = props

  return (
    <div className="flex flex-row min-h-full">
      <div className="hidden md:inline">
        <NavPages />
      </div>
      <div className="px-5 py-4 w-full">{children}</div>
    </div>
  )
}

export default SideBar
