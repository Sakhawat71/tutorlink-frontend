import HomeComponents from '@/components/modules/home';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import React from 'react';

const HomePage = async () => {

    // const session = await getServerSession(authOptions);
    // console.log(session);


    return (
        <div>
            <HomeComponents />
        </div>
    );
};

export default HomePage;