import { useState } from 'react';
import Cookie from 'js-cookie';

export default function useToken() {

    const [token, setToken] = useState(Cookie.get('mdra-session'));
    return { token, setToken };

}
