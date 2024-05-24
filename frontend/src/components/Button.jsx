export default function Button({label= "Button", onClick, type = "dark", children}) {
    return (
        <>
            {
                type ==='dark' ?(
                    <button onClick={onClick} className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                        {children}
                        {label}
                    </button>
                ): (
                    <button onClick={onClick}
                            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                        {children}
                        {label}
                    </button>
                )
            }
        </>
    )
}