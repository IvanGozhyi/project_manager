"use client";

import { signOut } from "next-auth/react"


function SignOutButton() {
    return (
        <button onClick={()=> signOut({redirectTo: "/"})}>Sign Out</button>
    );
}

export default SignOutButton;