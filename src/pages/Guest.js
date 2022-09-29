import {
    Fragment,
    useContext,
    useEffect,
    useState,
} from 'react';
import { redirect } from 'react-router-dom';
import { GlobalContext } from '../context/global.state';
import Service from '../utils/util.service';

const Guest = () => {

    // Context
    const {
        userInfo,
        globalDispatch,
    } = useContext(GlobalContext);

    // State
    const [logged, setLogged] = useState(false);

    useEffect(() => {

        // console.log('userInfo:', userInfo)

        const loader = async () => {

            const user = await Service.userInfo();

            console.log('user:', user)

            if (!user) {
                return redirect("/login");
            }
        };

        loader();

        // Service.userInfo()
        //     .then((resData) => {

        //         console.log('resData:', resData)
        //         setLogged(!!resData.uid);
        //         globalDispatch({ type: 'user_info', payload: resData });

        //     });

    }, []);

    return (

        <Fragment>
            {/* <h1>index {}</h1> */}
        </Fragment>

    );

};

export default Guest;
