import CardContainer from "./CardContainer";
import SkeletonCard from "./SkeletonCard";

const ShowSkeletons = () => {
    <>
        <CardContainer>
            {Array(18).fill().map((v,i) => (
                <SkeletonCard key={i}/>
            ))}
        </CardContainer>
    </>
}

export default ShowSkeletons;