import { RiBook3Fill } from "react-icons/ri"
import { IoIosMoon, IoIosSunny } from "react-icons/io"
import { useEffect } from "react"
import { themeChange } from "theme-change"

const Header = () => {
    useEffect(() => themeChange(false), [])
    return (
        <>
            <header className="container h-[10vh] flex justify-between items-center">
                <RiBook3Fill size={36} />
                <label className="swap swap-rotate">
                    <input type="checkbox" className="theme-controller" value="dark" />
                    <IoIosSunny className="swap-on" size={36} />
                    <IoIosMoon className="swap-off" size={36} />
                </label>
            </header>
        </>
    )
}

export default Header