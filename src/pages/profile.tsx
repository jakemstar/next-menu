import { useTheme } from "next-themes";

export default function Profile() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { theme, setTheme } = useTheme();

    return (
        <div className='flex items-center justify-center'>
            profile
        </div>
    )
}