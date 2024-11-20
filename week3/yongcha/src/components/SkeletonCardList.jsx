import SkeletonCard from "./SkeletonCard";

const SkeletonCardList = () => {
    return (
        <>
            {Array(18).fill().map((v,i) => (
                <SkeletonCard key={i}/>
            ))}
        </>
    )
}

export default SkeletonCardList;