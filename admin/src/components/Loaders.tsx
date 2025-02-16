import { BarLoader } from 'react-spinners';

const Loaders = ({ isLoading }: { isLoading: boolean }) => {
    console.log("hello", isLoading);
    return (
        <div className="absolute z-[100] right-0 -bottom-4 w-full">
            {isLoading && <BarLoader width={2200} color="#DC2626" height={5} />}
        </div>
    );
};

export default Loaders;