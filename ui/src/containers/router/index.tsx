import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import Login from '../login';

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navigate replace to="/Login" />} />
                    <Route path='/Login' element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router;