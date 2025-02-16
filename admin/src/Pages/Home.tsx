
import { HomeLayout } from '../Layout/HomeLayout'
import Banner from '../components/Forms/Banner'
import Register from './Auth/Register'
import ProfileCard from './Auth/ProfileCard'

const Home = () => {
    return (
        <HomeLayout>
            <div className='w-[97vw] my-2 mx-auto max-w-5xl border rounded'>
                <h3 className='p-2 text-center text-white bg-neutral-900'>Banner images</h3>
                <Banner />
            </div>

            <div className='flex flex-col mt-10 md:flex-row max-w-[97vw] mx-auto md:pl-16 items-center md:items-start justify-center   gap-6 '>
                <ProfileCard />
                <Register />
            </div>
        </HomeLayout>
    )
}

export default Home
