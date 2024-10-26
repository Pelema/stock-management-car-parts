type TSkeletal = {
    items?: number;
};

export function CardSkeletalComponent({
    items = 10,
}: TSkeletal) {
    return (
        <div className="flex gap-x-4 gap-y-8 flex-wrap">
            {[...Array(items).keys()].map((_, index) => (
                <div
                    key={index + "rows"}
                    className="w-52 space-y-2"
                >
                    <div className="skeleton h-52 w-full"></div>
                    <div className="skeleton h-4 w-16"></div>
                    <div className="flex item-center justify-between w-full">
                        <div className="skeleton h-4 w-10"></div>
                        <div className="skeleton h-4 w-16"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}