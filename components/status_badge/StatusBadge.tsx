import {Status, statusStyles} from "./Status";

interface StatusBadgeProps {
    status: Status;
    onClick?: () => void;
}

function StatusBadge({ status }: StatusBadgeProps) {
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusStyles[status]}`}>
            {status.replace("_", " ")}
        </span>
    );
}

export default StatusBadge;