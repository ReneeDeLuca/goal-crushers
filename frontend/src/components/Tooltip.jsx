export default function Tooltip({ message, children }) {
    return (
    <span className="group relative">
        {children}
        <span className="absolute top-5 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">{message}</span>
    </span>
    )
}