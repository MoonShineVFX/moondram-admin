import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Account from './pages/Account';

const PageRoute = () => {

    return (

        <Routes>
            <Route index element={<Home />} />
            <Route path="admin_account" element={<Account />} />
        </Routes>

    );

};

export default PageRoute;
