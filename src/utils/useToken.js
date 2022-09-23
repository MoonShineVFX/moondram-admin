import { useState } from 'react';
import Cookie from 'js-cookie';

export default function useToken() {

    const [token, setToken] = useState(Cookie.get('token'));
    return { token, setToken };

}
