import Loaders from "./Loaders";

const DashboardLoading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Loaders isLoading={true} />
            <div className="w-10 h-10 ease-linear border-t-2 border-b-2 border-purple-500 rounded-full animate-spin"></div>
            <div className="w-10 h-10 ml-3 ease-linear border-t-2 border-b-2 border-red-500 rounded-full animate-spin"></div>
            <div className="w-10 h-10 ml-3 ease-linear border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>

    );
};

export default DashboardLoading;