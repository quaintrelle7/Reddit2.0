import { authModalState } from '@/atoms/authModalAtom';
import { Button } from '@chakra-ui/react';
import React from 'react';
import { useSetRecoilState } from 'recoil';



const AuthButtons = () => {

    //in useRecoilState we use when we care about the values and when they change
    //we use useSetRecoilState when we don't care about the values

    const setAuthModalState = useSetRecoilState(authModalState);

    
    return(
        <>
        <Button variant="outline" height="28px"
         display={{base:"none", sm:"flex"}}
         width={{base:"70px", md:"110px"}}
         mr={2}
         onClick={()=>setAuthModalState({open: true, view: "login"})}

         >Log In</Button>
        <Button
         height="28px"
         display={{base:"none", sm:"flex"}}
         width={{base:"70px", md:"110px"}}
         mr={2}
         onClick={()=>setAuthModalState({open:true, view: "signup"})}
         >Sign Up</Button>
        </>
    )
}
export default AuthButtons;